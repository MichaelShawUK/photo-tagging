const Modal = ({ time = null }) => {
  return (
    <div className={`backdrop ${time ? "" : "hidden"}`}>
      <div className="modal">
        <div>{time} seconds</div>
        <input type="text" placeholder="Enter Name" maxLength={15}></input>
        <button>Submit Score</button>
      </div>
    </div>
  );
};

export default Modal;
