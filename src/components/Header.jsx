import React, { useContext } from "react";
import logo from "../assets/pizza.png";
import Button from "./Button";
import { CartContext } from "../store/cartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import { FaShoppingCart } from "react-icons/fa";
export default function Header() {
  const ctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalQuantity = ctx.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A Restaurant " />
        <div>
          <h1>Pajoo</h1>
          <a className="phone-number" href="tel:+21656422544">
            +216 56 422 544
          </a>
        </div>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          <FaShoppingCart style={{ marginRight: "0.1rem" }} />
          <span style={{ fontSize: "1rem" }}>Panier</span>

          {/*<span style={{ fontSize: "1rem" }}>({ctx.items.length})</span>*/}
          <span style={{ fontSize: "1rem" }}>({totalQuantity})</span>
        </Button>
      </nav>
    </header>
  );
}
