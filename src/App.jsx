import { useState, useEffect, useCallback } from "react";

// Funzione debounce generica
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3333/products?search=${query}`
      );
      const data = await response.json();
      setSuggestions(data);
      console.log(`API ${query}`);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), []);

  useEffect(() => {
    debouncedFetchProducts(query);
  }, [query]);

  const fetchProductDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:3333/products/${id}`);
      const data = await res.json();
      setSelectedProduct(data);
      setQuery("");
      setSuggestions([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h1>Autocomplete</h1>
        <input
          type="text"
          placeholder="Cerca il prodotto"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {suggestions.length > 0 && (
          <div className="suggestions-container">
            <div className="suggestions-list">
              {suggestions.map((product) => (
                <p
                  key={product.id}
                  onClick={() => fetchProductDetails(product.id)}
                  className="suggestion-item"
                >
                  {product.name}
                </p>
              ))}
            </div>
          </div>
        )}
        {selectedProduct && (
          <div className="product-card">
            <h2>Prodotto selezionato:</h2>
            <p>{selectedProduct.name}</p>
            <img src={selectedProduct.img} alt={selectedProduct.name} />
            <p>{selectedProduct.description}</p>
            <p>Prezzo: {selectedProduct.price} €</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
