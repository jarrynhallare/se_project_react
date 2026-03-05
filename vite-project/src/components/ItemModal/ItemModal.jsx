import './ItemModal.css';

function ItemModal({ activeModal, onClose, card }) {
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
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h3 className="modal__caption">{card.name}</h3>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
    </div>
    </div>
  )
}

export default ItemModal;