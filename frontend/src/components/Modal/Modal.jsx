import style from "./style.module.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className={style.ModalOverlay}>
      <div className={style.Modal}>
        <span className={style.ModalCloser} onClick={onClose}>
          X
        </span>

        {children}
      </div>
    </div>
  );
};

export default Modal;
