import React from "react";
import { RiCloseLine } from "react-icons/ri";
import "../css/Modal.css";
import { toast } from "react-toastify";

const Modal = ({setDeleteModal,id,toggleDetails}) => {
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

  const removePost = (postId) => {
    try {
     
      fetch(`http://localhost:5000/deletePost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => {
          res.json();
        })
        .then(() => {
          toggleDetails();
          notifyB("Post Deleted Succesfully");
        });
    
    } catch (error) {
       notifyA(error);
    }
    
  };

  return (
    <div className="dark-bg" >
      <div className="centered" >
        <div className="logout-modal">
          <div className="modal-heading ">
            <h5>Confirm</h5>
          </div>
          <button className="close-btn" onClick={() => setDeleteModal(false)}>
            <RiCloseLine title="Close" />
          </button>
          <div className="statement">`Do you really want to delete?`</div>
          <div className="buttons">
            <button
            className="logout-btn"
            
            onClick={() => removePost(id)}
            >
             Delete
            </button>
            <button className="cancel-btn" onClick={() => setDeleteModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
