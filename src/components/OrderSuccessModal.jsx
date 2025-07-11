import Modal from "./Modal";
import { useContext } from "react";
import { UserProgressContext } from "../store/UserProgressContext";
import Button from "./Button";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessModal() {
  const userProgressCtx = useContext(UserProgressContext);

  if (!userProgressCtx.isOrderSuccess) return null;

  return (
    <Modal
      open
      onClose={userProgressCtx.hideOrderModals}
      className="confirmation-modal"
    >
      <div className="modal-content">
        <CheckCircle color="green" size={60} />
        <h2>Commande passée avec succès !</h2>
        <p>Merci pour votre commande.</p>
        <div className="modal-actions">
          <Button onClick={userProgressCtx.hideOrderModals}>Fermer</Button>
        </div>
      </div>
    </Modal>
  );
}
