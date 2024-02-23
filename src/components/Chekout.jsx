import Modal from "./Modal";
import { UserProgressContext } from "../store/UserProgressContext";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/cartContext";
import Input from "./Input";
import Button from "./Button";
import { fetchOrder } from "../services/http";
import { useFetch } from "../hooks/useFetch";
export default function Checkout() {
  const userProgressCtx = useContext(UserProgressContext);
  const ctx = useContext(CartContext);
  const cartTotal = ctx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }
  async function handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    const form = new FormData(event.target);
    const customerData = Object.fromEntries(form.entries());

    try {
      const response = await fetchOrder({
        items: ctx.items,
        customer: customerData,
      });

      handleCloseCheckout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal className="checkout" open={userProgressCtx.progress === "checkout"}>
      <form id="form" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount : {cartTotal} $</p>
        <Input label={"Full Name"} type="text" id={"name"} />
        <Input label={"Email Adress"} type="email" id={"email"} />
        <Input label={"street"} type="text" id={"street"} />
        <div className="control-row">
          <Input label={"Postal Code"} type="text" id={"postal-code"} />
          <Input label={"City"} type="text" id={"city"} />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly={true} onClick={handleCloseCheckout}>
            close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
