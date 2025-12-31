import { useMemo, useState } from "react"
import { categories } from "../utils/fakeData"
import ProductCard from "../components/ProductCard"
import { motion } from "framer-motion"
import { supabase } from "../services/supabase"
import React from "react"

export default function Collection() {
  const [query, setQuery] = useState("")
  const [cat, setCat] = useState("all")

  // Split categories for hybrid
  const visibleCategories = categories.slice(0, 6)
  const moreCategories = categories.slice(2)

  const [products, setProducts] = React.useState([]);
  
  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      console.log(data)
      if (error) {
        console.error("Error fetching products:", error);

      } else {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (query.trim())
      list = list.filter((p) =>
        (p.title || p.name || "").toLowerCase().includes(query.toLowerCase())
      );
    return list;
  }, [products, query, cat]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif text-brand-black">
          Our Collection
        </h1>
        <p className="text-brand-black/60 mt-2 text-sm md:text-base">
          Browse through our curated selection of boutique pieces
        </p>
      </div>
      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <input
          className="border border-beige-dark/40 rounded-xl px-4 py-2 w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-beige-dark/40 transition"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Categories */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* All button */}
          <button
            className={`px-4 py-2 rounded-full border text-sm transition ${
              cat === "all"
                ? "bg-beige-dark text-white border-beige-dark shadow-md"
                : "bg-white text-brand-black hover:bg-beige-light/50"
            }`}
            onClick={() => setCat("all")}
          >
            All
          </button>

          {/* Visible categories */}
          {visibleCategories.map((c) => (
            <button
              key={c.id}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                cat === c.id
                  ? "bg-beige-dark text-white border-beige-dark shadow-md"
                  : "bg-white text-brand-black hover:bg-beige-light/50"
              }`}
              onClick={() => setCat(c.id)}
            >
              {c.name}
            </button>
          ))}

          {/* More dropdown if extra categories */}
          {moreCategories.length > 0 && (
            <div className="relative">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 rounded-full border bg-white text-sm shadow-sm focus:ring-2 focus:ring-beige-dark/40 transition"
              >
                <option value="more" disabled>
                  More…
                </option>
                {moreCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No products found.
          </p>
        )}
      </motion.div>
    </div>
  )
}
