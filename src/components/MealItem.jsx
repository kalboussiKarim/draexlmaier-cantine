import React, { useContext } from "react";
import Button from "./Button";
import { CartContext } from "../store/cartContext";
import pizza from "../assets/images/margherita-pizza.webp"; // Adjust the path if needed
import st from "../../appWrite/storage";

export default function MealItem({ meal }) {
  const ctx = useContext(CartContext);

  const cartItem = ctx.items.find((item) => item.$id === meal.$id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddItemToCart = () => {
    ctx.addItem(meal);
  };

  const handleRemoveItemFromCart = () => {
    ctx.removeItem(meal.$id);
  };

  const handleAddMore = () => {
    ctx.addItem(meal);
  };

  return (
    <div className="meal-item">
      <article>
        <img
          src={meal.imageURL ? st.images.getFileView(meal.imageURL) : pizza}
          alt={meal.name}
          className="meal-item-image"
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-decsription">
            {meal.description + " : " + meal.ingredients}
          </p>
          <p className="meal-item-price">{meal.price} TND</p>
        </div>

        {/*quantity === 0 ? (
          <Button onClick={handleAddItemToCart}>Ajouter au panier</Button>
        ) : (
          <div className="meal-item-controls-wrapper">
            <div className="meal-item-controls">
              
              <button
                type="button"
                className="qty-btn"
                onClick={handleRemoveItemFromCart}
              >
                –
              </button>
              <span className="meal-item-quantity">{quantity}</span>
              <button type="button" className="qty-btn" onClick={handleAddMore}>
                +
              </button>
            </div>
            <Button className="added-button" disabled>
              Ajoutée
            </Button>
          </div>
        )*/}
        {quantity === 0 ? (
          <Button onClick={handleAddItemToCart}>Ajouter au panier</Button>
        ) : (
          <div className="meal-item-controls-wrapper">
            <div className="meal-item-controls">
              <button
                type="button"
                className="qty-btn"
                onClick={handleRemoveItemFromCart}
              >
                –
              </button>
              <span className="meal-item-quantity">{quantity}</span>
              <button type="button" className="qty-btn" onClick={handleAddMore}>
                +
              </button>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
