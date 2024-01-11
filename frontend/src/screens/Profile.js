import React, { useState, useEffect } from "react";
import PostDetail from "../components/PostDetail";
import ProfilePic from "../components/ProfilePic";
import List from "../components/List";
import "../css/Profile.css";

const Profile = () => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
const [showList, setShowList] = useState(false)
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const toggleList = () => {
    if (showList) {
      setShowList(false);
    } else {
      setShowList(true);
    }
  };

  const changeProfile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  const fetchUserDetail = () => {
    fetch(
      `http://localhost:5000/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setPic(result.posts);
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // fetchUserDetail();
  useEffect(() => {
    fetchUserDetail();
    console.log(show);
  }, [show]);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            src={user.Photo ? user.Photo : picLink}
            alt="pic"
            onClick={changeProfile}
          />
        </div>
        {/* details */}
        <div className="profile-data">
          <div>
            <h1
              className="username-heading"
              style={{
                fontWeight: "500",
                fontSize: "xx-large",
                marginBottom: "20px",
              }}
            >
              {JSON.parse(localStorage.getItem("user")).username}
            </h1>
          </div>
          <div className="profile-info">
            <p>
              <span className="text-bolder">{pic ? pic.length : "0"}</span>{" "}
              Posts
            </p>
            <p style={{cursor:"pointer"}} onClick={()=>toggleList()} >
              <span className="text-bolder">
                {user.followers ? user.followers.length : "0"}
              </span>{" "}
              Followers
            </p>
            <p style={{cursor:"pointer"}} onClick={()=>toggleList()}>
              <span className="text-bolder">
                {user.following ? user.following.length : "0"}
              </span>{" "}
              Following
            </p>
          </div>
          <div>
            <p className="text-bolder">
              {JSON.parse(localStorage.getItem("user")).name}
            </p>
          </div>
        </div>
      </div>
      {/* gallery */}
      <hr />
      <div className="gallery">
        <div>
          {pic.map((pics) => {
            return (
              <img
                key={pics._id}
                src={pics.photo}
                onClick={() => {
                  toggleDetails(pics);
                }}
              />
            );
          })}
        </div>
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic changeProfile={changeProfile} />}
      {showList && <List toggleList={toggleList}/>}
    </div>
  );
};

export default Profile;
