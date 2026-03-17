import "./DeleteConfirmationModal.css";
import closeIconBlack from "../../assets/Union.svg";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, cardName }) {
  const handleConfirm = () => {
    onConfirm();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content_type_confirmation">
        <button className="modal__close-button" type="button" onClick={onClose}>
          <img src={closeIconBlack} alt="Close" />
        </button>
        <p className="modal__message">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__button-container">
          <button
            className="modal__button modal__button_type_confirm"
            type="button"
            onClick={handleConfirm}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button modal__button_type_cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
