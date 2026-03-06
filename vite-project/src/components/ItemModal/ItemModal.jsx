import './ItemModal.css';
import closeIconWhite from '../../assets/Union.white.svg';

function ItemModal({ activeModal, onClose, selectedCard }) {
  if (!selectedCard || !selectedCard.link) {
    return null;
  }

  return (
    <div className={`modal ${activeModal === 'preview' ? 'modal__opened' : ''}`}>
      <div className="modal__content_type_image">
        <button 
          className="modal__item_close-button" 
          type="button"
          onClick={onClose}
        >
          <img src={closeIconWhite} alt="Close" />
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