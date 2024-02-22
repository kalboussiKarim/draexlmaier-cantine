import Modal from "./Modal";
import { CartContext } from "../store/cartContext";
import { useContext } from "react";
import Button from "./Button";
import { UserProgressContext } from "../store/UserProgressContext";
export default function Cart() {
  const ctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = ctx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>your card </h2>
      <ul>
        {ctx.items.map((item) => {
          <li key={item.key}>
            {item.name} - {item.quantity}
          </li>;
        })}
      </ul>
      <p className="cart-total">{cartTotal} $</p>
      <p className="modal-actions">
        <Button textOnly> close </Button>
        <Button> go To checkout </Button>
      </p>
    </Modal>
  );
}
