import "./ItemModal.css";
import closeIconWhite from "../../assets/Union.white.svg";

function ItemModal({ isOpen, onClose, selectedCard, onDelete }) {
  if (!selectedCard || !selectedCard.imageUrl) {
    return null;
  }

  const handleDeleteClick = () => {
    onDelete(selectedCard);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content_type_image">
        <button
          className="modal__item_close-button"
          type="button"
          onClick={onClose}
        >
          <img src={closeIconWhite} alt="Close" />
        </button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__info">
            <h3 className="modal__caption">{selectedCard.name}</h3>
            <p className="modal__weather">Weather: {selectedCard.weather}</p>
          </div>
          <button
            className="modal__delete-button"
            type="button"
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
