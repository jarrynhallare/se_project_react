import "./ModalWithForm.css";
import '../../vendor/fonts.css';
import closeIcon from '../../assets/Union.svg';

function ModalWithForm({ activeModal, onClose, buttonText, title, children }) {
  return (
    <div className={`modal ${activeModal === 'add-garment' ? 'modal__opened' : ''}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button 
          className="modal__close-button" 
          type="button"
          onClick={onClose}
        >
          <img src={closeIcon} alt="close-btn" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-button">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;