import React from "react";
import { Link } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

const List = ({ toggleList, followData }) => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  console.log(followData)
  return (
    <div className="dark-bg">
      <div className="centered">
        <div className="logout-modal" style={{height:"270px"}}>
          <div className="modal-heading ">
            <h5>Followers</h5>
          </div>
          <button className="close-btn" onClick={() => toggleList()}>
            <RiCloseLine />
          </button>
          {followData.map((val) => {
            return (
              <ul>
              <li className="sidebar-item">
                  <div className="side-card">
                    <img
                      className="side-profile-pic"
                      src={val.Photo ? val.Photo : picLink}
                      alt="picture"
                    />
                    <div className="side-card-details">
                      <Link to={`/profile/${val._id}`}>
                        <span
                          className="menu-text"
                          style={{ fontSize: "medium" }}
                        >
                          {val.username}
                        </span>
                      </Link>
                      {/* <button
                        className="side-btn-follow"
                        onClick={() => {
                          followUser(val._id);
                        }}
                      >
                        Follow
                      </button> */}
                    </div>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
