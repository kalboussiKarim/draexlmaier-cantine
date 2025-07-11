import Modal from "./Modal";
import { useContext } from "react";
import { UserProgressContext } from "../store/UserProgressContext";
import { CheckCircle } from "lucide-react"; // ou tout autre icône

export default function OrderConfirmationModal() {
  const userProgressCtx = useContext(UserProgressContext);

  const handleClose = () => {
    userProgressCtx.hideConfirmation();
  };

  return (
    <Modal
      className="confirmation"
      open={userProgressCtx.progress === "confirmation"}
      onClose={handleClose}
    >
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <CheckCircle size={64} color="green" />
        <h2>Votre commande a été passée avec succès !</h2>
        <p>Merci pour votre confiance.</p>
        <button
          onClick={handleClose}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          OK
        </button>
      </div>
    </Modal>
  );
}
