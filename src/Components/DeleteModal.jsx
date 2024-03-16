const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal p-4 bg-primary rounded-lg shadow-2xl">
      <div className="flex justify-between">
        <button
          className="w-2/5 px-4 py-2 font-semibold bg-forth text-white rounded-xl hover:bg-forthHover focus:outline-none"
          onClick={onConfirm}
        >
          Sim
        </button>
        <button
          className="px-4 py-2 font-semibold bg-cancel text-tertiary rounded-xl hover:bg-cancelHover hover:focus:bg-cancelHover"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
