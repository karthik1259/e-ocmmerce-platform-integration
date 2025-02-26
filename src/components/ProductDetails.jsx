import React from 'react';

function ProductDetails({ product, onAddToCart }) {
  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
