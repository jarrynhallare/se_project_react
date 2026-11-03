import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = {
  email: "",
  password: "",
};

function LoginModal({ isOpen, onClose, onLogin }) {
  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) setValues(defaultValues);
  }, [isOpen, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(values);
  }

  return (
    <ModalWithForm
      name="login"
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          id="login-email"
          className="modal__input"
          type="email"
          name="email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
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

export default LoginModal;