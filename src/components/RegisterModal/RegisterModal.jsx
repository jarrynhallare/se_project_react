import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

function RegisterModal({ isOpen, onClose, onRegister }) {
  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) setValues(defaultValues);
  }, [isOpen, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          id="register-name"
          className="modal__input"
          type="text"
          name="name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          id="register-avatar"
          className="modal__input"
          type="url"
          name="avatar"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          id="register-email"
          className="modal__input"
          type="email"
          name="email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          id="register-password"
          className="modal__input"
          type="password"
          name="password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;