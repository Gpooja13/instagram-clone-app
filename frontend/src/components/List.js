import React from 'react';
import { RiCloseLine } from "react-icons/ri";

const List = ({toggleList}) => {
  return (
    <div className="dark-bg" >
    <div className="centered" >
      <div className="logout-modal">
        <div className="modal-heading ">
          <h5>Confirm</h5>
        </div>
        <button className="close-btn" onClick={() => toggleList()}>
          <RiCloseLine />
        </button>
        <div className="statement">Do you really want to log out?</div>
       
      </div>
    </div>
  </div>
  )
}

export default List