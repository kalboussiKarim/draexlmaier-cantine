import Modal from "./Modal";
import { UserProgressContext } from "../store/UserProgressContext";
import { useContext, useState } from "react";
import { CartContext } from "../store/cartContext";
import Input from "./Input";
import Button from "./Button";
import { fetchOrder } from "../services/http";

export default function Checkout() {
  const userProgressCtx = useContext(UserProgressContext);
  const [isChecked, setIsChecked] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const ctx = useContext(CartContext);
  const cartTotal = ctx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const customerData = Object.fromEntries(form.entries());

    const phone = customerData.phone?.toString().trim() || "";
    const phoneRegex = /^\d{8}$/;

    if (!phoneRegex.test(phone)) {
      setPhoneError("Le numéro doit contenir exactement 8 chiffres.");
      return; // stop submit
    } else {
      setPhoneError(""); // clear error
    }

    try {
      const response = await fetchOrder({
        items: ctx.items,
        customer: customerData,
        totalPrice: cartTotal.toFixed(2),
      });

      if (response && response.message) {
        userProgressCtx.hideCheckout();
        userProgressCtx.showOrderError();
      } else {
        ctx.clearCart();
        userProgressCtx.hideCheckout();
        userProgressCtx.showOrderSuccess();
      }
    } catch (error) {
      console.log(error);
      userProgressCtx.hideCheckout();
      userProgressCtx.showOrderError();
    }
  }

  return (
    <Modal className="checkout" open={userProgressCtx.progress === "checkout"}>
      <form id="form" onSubmit={handleSubmit} style={{ width: "100%" }}>
        <h2>Votre Commande</h2>
        <p>Total : {cartTotal.toFixed(2)} TND</p>
        <Input label={"Nom et Prénom"} type="text" id={"name"} />
        <Input label={"Numéro téléphone"} type="number" id={"phone"} />
        {phoneError && (
          <p style={{ color: "red", fontSize: "0.8rem", marginTop: "0.25rem" }}>
            {phoneError}
          </p>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            margin: "1rem 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <label htmlFor="notes" style={{ fontWeight: "bold" }}>
              Notes supplémentaires :
            </label>
            {/*<p
              style={{
                fontSize: "0.85rem",
                color: "#46443c",
                marginTop: "-0.3rem",
              }}
            >
              * Toutes les pizzas avec olives et persillade !
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#46443c",
                marginTop: "-1rem",
                marginBottom: "-0.3rem",
              }}
            >
              * Suppléments: Viande hachée, Thon et Fromage à 4 TND.
            </p>*/}
            <textarea
              id="notes"
              name="notes"
              rows="2"
              placeholder="Ajoutez des instructions ou des remarques ici..."
              style={{
                width: "100%",
                maxWidth: "40rem",
                padding: "0.3rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                font: "inherit",
              }}
            ></textarea>
          </div>
        </div>
        <p className="modal-actions">
          <Button
            type="button"
            textOnly={true}
            className="close-button"
            onClick={handleCloseCheckout}
          >
            fermer
          </Button>
          <Button type="submit">Confirmer la commande</Button>
        </p>
      </form>
    </Modal>
  );
}
