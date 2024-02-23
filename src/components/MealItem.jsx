import React, { useContext } from "react";
import Button from "./Button";
import { CartContext } from "../store/cartContext";

export default function MealItem({ meal }) {
  const ctx = useContext(CartContext);
  function handleAddItemToCart() {
    ctx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{meal.price}$</p>
          <p className="meal-item-decsription">{meal.decsription}</p>
        </div>
        <p>
          <Button onClick={handleAddItemToCart}>Add to Cart </Button>
        </p>
      </article>
    </li>
  );
}
