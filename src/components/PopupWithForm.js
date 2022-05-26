function PopupWithForm({
  name,
  isOpen,
  container,
  title,
  button,
  onClose,
  children,
  onSubmit,
  styleConfirmDelete,
  title_auth,
  popup__save_auth,
  popup__close_none,
}) {
  return (
    <section className={`popup ${isOpen && "popup_enable"}`}>
      <div className={`popup__container ${container}`}>
        <h2 className={`popup__title ${title_auth}`}>{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button
            className={`popup__save ${styleConfirmDelete} ${popup__save_auth}`}
            type="submit"
          >
            {button}
          </button>
        </form>
        <button
          style={popup__close_none}
          className="popup__close"
          onClick={onClose}
          type="reset"
          aria-label="Закрыть"
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
