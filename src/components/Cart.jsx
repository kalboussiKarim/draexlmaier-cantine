import Modal from "./Modal";
import { CartContext } from "../store/cartContext";
import { useContext } from "react";
import Button from "./Button";
import { UserProgressContext } from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const ctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = ctx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  const handlecloseCart = () => {
    userProgressCtx.hideCart();
  };

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={handlecloseCart}
    >
      <h2>Votre panier</h2>
      <ul>
        {ctx.items.length === 0 ? (
          <p className="center">Votre panier est vide.</p>
        ) : (
          <ul>
            {ctx.items.map((item) => (
              <CartItem
                key={item.$id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onPlus={() => ctx.addItem(item)}
                onMinus={() => ctx.removeItem(item.$id)}
              />
            ))}
          </ul>
        )}
      </ul>
      {ctx.items.length > 0 && (
        <p className="cart-total">Total : {cartTotal.toFixed(2)} TND</p>
      )}
      <div className="modal-actions">
        <Button textOnly onClick={handlecloseCart}>
          fermer
        </Button>
        {ctx.items.length > 0 && (
          <Button onClick={() => userProgressCtx.showCheckout()}>
            Continuer
          </Button>
        )}
      </div>
    </Modal>
  );
}
