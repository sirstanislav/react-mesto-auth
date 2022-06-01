import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(true);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(true);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopup, setConfirmDeletePopupOpen] = useState(false);
  const [isConfirmDelete, setConfirmDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  useEffect(() => {
    api
      .getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`Ошибка загрузки карточек: ${err}`));

    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCloseAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setConfirmDeletePopupOpen(false);
  }

  function handleCardClick(data) {
    setSelectedCard({
      isOpen: true,
      ...data,
    });
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(`Ошибка....: ${err}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(`Ошибка добавления карточки: ${err}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(`Ошибка загрузки аватара: ${err}`));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <>
              {isUserLoggedIn ? <Navigate to="/"/> : <Navigate to="/sign-up"/>}
                <Header>
                  <div className="header__container-auth">
                    <p className="header__email">email@mail.com</p>
                    <p className="header__title">Выйти</p>
                  </div>
                </Header>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            }
          >
          </Route>
          <Route
            path="/sign-up"
            element={
              <>
                <Login isOpen={isLoginPopupOpen} />
                <Header>
                  <div className="header__container-auth">
                    <p className="header__title">Регистрация</p>
                  </div>
                </Header>
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Register isOpen={isRegisterPopupOpen} />
                <Header>
                  <div className="header__container-auth">
                    <Link to="/" className="header__title">
                      Войти
                    </Link>
                  </div>
                </Header>
              </>
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopup}
          onClose={handleCloseAllPopups}
          onDelete={setConfirmDelete}
        />

        <InfoTooltip isOpen={isInfoTooltip} />
      </CurrentUserContext.Provider>

      <ImagePopup card={selectedCard} onClose={handleCloseAllPopups} />
    </div>
  );
}

export default App;
