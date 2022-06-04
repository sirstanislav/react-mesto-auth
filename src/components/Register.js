import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopupWithForm from "./PopupWithForm";
import * as Auth from "./Auth.js";

export default function Register({ isOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  function inputEmail(event) {
    setEmail(event.target.value);
  }

  function inputPassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    Auth.register(password, email).then((res) => {
      if (res) {
        // setMessage('')
        history("/sing-up"); //Если форма отправлена успешна, перенаправим пользователя на страницу авторизации.
      }
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      // onClose={onClose}
      onSubmit={handleSubmit}
      // name="edit-profile"
      title="Регистрация"
      container="popup__container_auth"
      title_auth="popup__title_auth"
      popup__close_none={{ display: "none" }}
      popup__subtitle={
        <Link to="/sign-up" className="popup__subtitle">
          Уже зарегистрированы? Войти
        </Link>
      }
      popup_auth="popup_auth"
    >
      <input
        className="popup__input popup__input_auth"
        // value={name}
        onChange={inputEmail}
        name="name"
        type="text"
        placeholder="Email"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error"></span>
      <input
        className="popup__input popup__input_auth"
        // value={description}
        onChange={inputPassword}
        name="about"
        type="text"
        placeholder="Пароль"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error"></span>
      <button className={"popup__save popup__save_auth"} type="submit">
        Зарегистрироваться
      </button>
    </PopupWithForm>
  );
}
