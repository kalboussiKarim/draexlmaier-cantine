import Modal from "./Modal";
import { useContext } from "react";
import { UserProgressContext } from "../store/UserProgressContext";
import Button from "./Button";
import { XCircle } from "lucide-react";

export default function OrderErrorModal() {
  const userProgressCtx = useContext(UserProgressContext);

  if (!userProgressCtx.isOrderError) return null;

  return (
    <Modal
      open
      onClose={userProgressCtx.hideOrderModals}
      className="confirmation-modal"
    >
      <div className="modal-content">
        <XCircle color="red" size={60} />
        <h2>Commande échouée</h2>
        <p>Vérifiez votre connexion et réessayez.</p>
        <div className="modal-actions">
          <Button onClick={userProgressCtx.hideOrderModals}>Fermer</Button>
        </div>
      </div>
    </Modal>
  );
}
