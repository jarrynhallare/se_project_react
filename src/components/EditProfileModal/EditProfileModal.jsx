import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onUpdateUser, currentUser }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(values);
  }

  return (
    <ModalWithForm
      name="edit-profile"
      title="Edit profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-profile-name" className="modal__label">
        Name
        <input
          id="edit-profile-name"
          className="modal__input"
          type="text"
          name="name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="edit-profile-avatar" className="modal__label">
        Avatar URL
        <input
          id="edit-profile-avatar"
          className="modal__input"
          type="url"
          name="avatar"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;