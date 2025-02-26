import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>E-commerce Store</h1>
      </header>
      <main className="app-main">
        <ProductList products={products} onProductClick={handleProductClick} />
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>
      <aside className="app-sidebar">
        <ShoppingCart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
      </aside>
      <footer className="app-footer">
        <p>&copy; 2024 E-commerce Store</p>
      </footer>
    </div>
  );
}

export default App;
