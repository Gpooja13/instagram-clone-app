import React, { useContext } from "react";
import { RiCloseLine } from "react-icons/ri";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import "../css/Modal.css";

const Modal = () => {
  const { setModalOpen} = useContext(LoginContext);
  const navigate = useNavigate();
  const logout=() => {
    setModalOpen(false);
    localStorage.clear();
    navigate("/signIn");
    window.location.reload();
  }

  return (
    <div className="dark-bg" >
      <div className="centered" >
        <div className="logout-modal">
          <div className="modal-heading ">
            <h5>Confirm</h5>
          </div>
          <button className="close-btn" onClick={() => setModalOpen(false)}>
            <RiCloseLine />
          </button>
          <div className="statement">`Do you really want to logout?`</div>
          <div className="buttons">
            <button
            className="logout-btn"
              onClick={()=>{logout()}}
            >
              Logout
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
