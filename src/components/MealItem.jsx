import React from "react";

export default function MealItem({ meal }) {
  return (
    <li className="meal-item">
      <article>
        <img  src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{meal.price}$</p>
          <p className="meal-item-decsription">{meal.decsription}</p>
        </div>
        <p>
            <button>Add to Cart </button>
        </p>
      </article>
    </li>
  );
}
