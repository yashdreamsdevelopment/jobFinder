import Modal from "../Modal/Modal";

const DeleteModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div>
        <h1>Are You sure want to delete?</h1>
        <p>This process is irreversable</p>
      </div>
      <div>
        <button className="button" onClick={onClose}>
          NO
        </button>
        <button className="button button__secondary">YES</button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
