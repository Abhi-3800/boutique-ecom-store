import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ----------------------------
  // Fetch logged in user
  // ----------------------------
  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      await fetchWishlist(user.id);
    } else {
      setWishlist([]);
      setLoading(false);
    }
  };

  // ----------------------------
  // Fetch wishlist
  // ----------------------------
  const fetchWishlist = async (userId) => {
    const { data, error } = await supabase
      .from("wishlists")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Wishlist fetch error:", error);
      setWishlist([]);
    } else {
      setWishlist(data || []);
    }

    setLoading(false);
  };

  // ----------------------------
  // Initial Load
  // ----------------------------
  useEffect(() => {
    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await fetchWishlist(currentUser.id);
      } else {
        setWishlist([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ----------------------------
  // Toggle Wishlist
  // ----------------------------
  const toggleWishlist = async (productId) => {
    if (!user) return false;

    const existing = wishlist.find(
      (item) => item.product_id === Number(productId)
    );

    // Remove
    if (existing) {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", existing.id);

      if (!error) {
        setWishlist((prev) =>
          prev.filter((item) => item.id !== existing.id)
        );
      }

      return !error;
    }

    // Add
    const { data, error } = await supabase
      .from("wishlists")
      .insert({
        user_id: user.id,
        product_id: Number(productId),
      })
      .select()
      .single();

    if (!error && data) {
      setWishlist((prev) => [...prev, data]);
    }

    return !error;
  };

  // ----------------------------
  // Remove by wishlist row id
  // ----------------------------
  const removeWishlist = async (wishlistId) => {
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("id", wishlistId);

    if (!error) {
      setWishlist((prev) =>
        prev.filter((item) => item.id !== wishlistId)
      );
    }

    return !error;
  };

  // ----------------------------
  // Helpers
  // ----------------------------
  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) => item.product_id === Number(productId)
    );
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        loading,
        user,
        toggleWishlist,
        removeWishlist,
        isWishlisted,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}