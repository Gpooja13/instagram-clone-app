import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import "../css/Suggestion.css";

const Suggestion = () => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const { setModalOpen } = useContext(LoginContext);
  const [suggestedData, setSuggestedData] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));

  const getSuggestion = async () => {
    const fetchData = await fetch("/getsuggestion", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    const data = await fetchData.json();
    setSuggestedData(data);
  };

  const followUser = (userId) => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ followId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
       
        setIsFollow(true);
      });
  };

  useEffect(() => {
    getSuggestion();
  }, [isFollow]);

  return (
    <div>
      <div className="main-sidebar">
        <ul className="sidebar-container">
          <li className="sidebar-item" style={{marginBottom: "15px" }}>
            <div className="side-card">
              <img
                className="side-profile-pic"
                src={userData?.Photo ? userData?.Photo : picLink}
                alt="pic"
              />
              <div className="side-card-details">
                <Link to="/profile">
                  <span className="menu-text" style={{ fontSize: "medium" , fontWeight:"500"}}>
                    {userData?.username}
                  </span>
                </Link>
                <button
                  className="side-btn-follow"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </li>
          <p className="suggestion-heading">Suggested for you</p>
          {suggestedData.map((val) => {
            return (
              <>
                <li className="sidebar-item" key={val._id}>
                  <div className="side-card">
                    <img
                      className="side-profile-pic"
                      src={val.Photo ? val.Photo : picLink}
                      alt="pic"
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
                      <button
                        className="side-btn-follow"
                        onClick={() => {
                          followUser(val._id);
                        }}
                      >
                        Follow
                      </button>
                    </div>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Suggestion;
