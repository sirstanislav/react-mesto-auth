import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function Login({ isOpen }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      // onClose={onClose}
      // onSubmit={handleSubmit}
      title="Вход"
      button="Войти"
      container="popup__container_auth"
      title_auth="popup__title_auth"
      popup__close_none={{ display: "none" }}
      popup_auth="popup_auth"
    >
      <input
        className="popup__input popup__input_auth"
        // value={name}
        // onChange={inputName}
        name="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error"></span>
      <input
        className="popup__input popup__input_auth"
        // value={description}
        // onChange={inputDescription}
        name="about"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error"></span>
      <button className={"popup__save popup__save_auth"} type="submit">
        Войти
      </button>
    </PopupWithForm>
  );
}
