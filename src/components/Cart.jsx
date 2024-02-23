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
      // onClose={handlecloseCart}
    >
      <h2>your card </h2>
      <ul>
        {ctx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onPlus={() => {
                ctx.addItem(item);
              }}
              onMinus={() => {
                ctx.removeItem(item.id);
              }}
            ></CartItem>
          );
        })}
      </ul>
      <p className="cart-total">{cartTotal} $</p>
      <p className="modal-actions">
        <Button textOnly onClick={handlecloseCart}>
          close
        </Button>
        {ctx.items.length > 0 && (
          <Button
            onClick={() => {
              userProgressCtx.showCheckout();
            }}
          >
            go To checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}
