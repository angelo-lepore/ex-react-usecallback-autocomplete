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

  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`//localhost:3333/products?search=${query}`);
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
                <div key={product.id} className="suggestion-item">
                  {product.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
