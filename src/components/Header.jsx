import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./Button";
import { CartContext } from "../store/cartContext";
import { UserProgressContext } from "../store/UserProgressContext";
export default function Header() {
  const ctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A Restaurant "></img>
        <h1>FoodY</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart({ctx.items.length})
        </Button>
      </nav>
    </header>
  );
}
