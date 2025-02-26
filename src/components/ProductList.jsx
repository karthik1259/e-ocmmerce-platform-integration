import React from 'react';

function ProductList({ products, onProductClick }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <div className="product-item" key={product.id} onClick={() => onProductClick(product)}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
