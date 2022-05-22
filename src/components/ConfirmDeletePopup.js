import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup({ isOpen, onClose, onDelete }) {
  function handleSubmit(e) {
    e.preventDefault();

    onDelete();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="confirm-delete"
      title="Вы уверены?"
      button="Да"
      container="popup__container_confirm-delete"
      styleConfirmDelete="popup__save_confirm-delete"
    />
  );
}
