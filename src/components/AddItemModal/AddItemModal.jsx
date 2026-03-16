
import { useForm } from "../../hooks/UseForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";


const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm 
    name={'add-garment'}
    title="New garment" 
    buttonText="Add garment"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    >

     <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            id="name"
            name="name"
            className="modal__input"
            placeholder="Name"
            required
            minLength="1"
            maxLength="30"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="modal__input"
            placeholder="Image URL"
            required
            value={values.imageUrl}
            onChange={handleChange}
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather"
              value="hot"
              id="hot"
              className="modal__radio-input"
              checked={values.weather === "hot"}
              onChange={handleChange}
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              name="weather"
              value="warm"
              id="warm"
              className="modal__radio-input"
              checked={values.weather === "warm"}
              onChange={handleChange}
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              name="weather"
              value="cold"
              id="cold"
              className="modal__radio-input"
              checked={values.weather === "cold"}
              onChange={handleChange}
            />
            Cold
          </label>
        </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;