import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function InfoTooltip({ isOpen }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      // onClose={onClose}
      // onSubmit={handleSubmit}
      popup__save_auth="popup__save_auth"
      container=""
      title_auth=""
    >
      <div className="popup__fail"></div>
      <p
        className="popup__title"
        style={{ width: 358, textAlign: "center", marginTop: 32 }}
      >
        Что-то пошло не так! Попробуйте ещё раз.
      </p>
    </PopupWithForm>
  );
}
