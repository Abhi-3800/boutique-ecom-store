// src/pages/CategoryCollection.jsx
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CategoryCollection() {
  const { id } = useParams();
  const categories = [
    { id: 'baby-memory-blankets', name: 'Baby Memory Blankets' },
    { id: 'dupattas', name: 'Phulkari Dupatta' },
    { id: 'customized-handkerchief', name: 'Signature Handkerchief' },
    {id: 'customized-parandis', name: 'Punjabi Parandi'},
    {id: 'women-palazzo', name: 'Women Palazzo'},
  ]
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

  const category = categories.find(c => c.id === id);
  const filteredProducts = products.filter(p => p.category === id);

  if (!category) {
    return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="bg-beige text-brand-black px-14 py-12 rounded-2xl shadow-lg border border-brand-black/20 text-center w-[600px] max-w-[90%]">
        <h2 className="text-3xl font-bold mb-4">Category Not Found</h2>
        <p className="text-gray-700 text-lg">
          The category you’re looking for doesn’t exist or has no products yet.
        </p>
        <button
          onClick={() => window.location.href = "/collection"}
          className="mt-8 bg-brand-black text-white px-8 py-3 rounded-lg hover:bg-black transition"
        >
          Back to Collection
        </button>
      </div>
    </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-brand-black">
        {category.name}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products available in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`} 
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
            >
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="h-52 w-full object-cover group-hover:scale-105 transition"
              />
              <div className="p-3">
                <h3 className="font-semibold text-lg text-brand-black">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.description.slice(0,50)}...</p>
                <p className="font-bold mt-2">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
