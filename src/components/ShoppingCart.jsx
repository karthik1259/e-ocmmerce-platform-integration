import React from 'react';

function ShoppingCart({ cart, onRemoveFromCart }) {
  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div className="cart-item" key={item.id}>
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <button onClick={() => onRemoveFromCart(item)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ShoppingCart;
