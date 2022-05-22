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
}) {
  return (
    <section className={`popup popup_${name} ${isOpen && "popup_enable"}`}>
      <div className={`popup__container ${container}`}>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className={`popup__save ${styleConfirmDelete}`} type="submit">
            {button}
          </button>
        </form>
        <button
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
