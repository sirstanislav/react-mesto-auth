function PopupWithForm({
  name,
  isOpen,
  container,
  title,
  onClose,
  children,
  onSubmit,
  title_auth,
  popup__close_none,
  popup__subtitle,
}) {
  return (
    <section className={`popup ${isOpen && "popup_enable"}`}>
      <div className={`popup__container ${container}`}>
        <h2 className={`popup__title ${title_auth}`}>{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          {popup__subtitle}
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
