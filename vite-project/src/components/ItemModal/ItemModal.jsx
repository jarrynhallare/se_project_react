import './ItemModal.css';

function ItemModal({ activeModal, onClose, selectedCard }) {
  if (!selectedCard || !selectedCard.link) {
    return null;
  }

  return (
    <div className={`modal ${activeModal === 'preview' ? 'modal__opened' : ''}`}>
      <div className="modal__content_type_image">
        <button 
          className="modal__close-button" 
          type="button"
          onClick={onClose}
        >
          X
        </button>
        <img src={selectedCard.link} alt={selectedCard.name} className="modal__image" />
        <div className="modal__footer">
          <h3 className="modal__caption">{selectedCard.name}</h3>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;