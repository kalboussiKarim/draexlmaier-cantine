import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../store/cartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import "./FloatingCartButton.css";

export default function FloatingCartButton() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalQuantity = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (totalQuantity === 0) return null;

  const handleClick = () => {
    userProgressCtx.showCart();
  };

  return (
    <div className="floating-cart-button" onClick={handleClick}>
      <FaShoppingCart
        style={{ color: "#d68b00", backgroundColor: "transparent" }}
        size={26}
      />
      <span className="cart-count">{totalQuantity}</span>
    </div>
  );
}
