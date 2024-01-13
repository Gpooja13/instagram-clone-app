import React, { useContext } from "react";
import { RiCloseLine } from "react-icons/ri";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import "../css/Modal.css";

const Modal = () => {
  const navigate = useNavigate();
  const { setModalOpen } = useContext(LoginContext);

  return (
    <div className="dark-bg" >
      <div className="centered" >
        <div className="logout-modal">
          <div className="modal-heading ">
            <h5>Confirm</h5>
          </div>
          {/* <button className="close-btn" onClick={() => setModalOpen(false)}>
            <RiCloseLine />
          </button> */}
          <div className="statement">Do you really want to log out?</div>
          <div className="buttons">
            <button
            className="logout-btn"
              onClick={() => {
                setModalOpen(false);
                localStorage.clear();
                navigate("/signIn");
                window.location.reload();
              }}
            >
              Log Out
            </button>
            <button className="cancel-btn" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
