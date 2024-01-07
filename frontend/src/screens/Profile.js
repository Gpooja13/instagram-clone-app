import React, { useState, useEffect } from "react";
import PostDetail from "../components/PostDetail";
import ProfilePic from "../components/ProfilePic";
import "../css/Profile.css";

const Profile = () => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

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

  const changeProfile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  const fetchUserDetail = () => {
    fetch(
      `/user/${
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
  }, []);

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
            <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          </div>
          <div className="profile-info">
            <p>{pic ? pic.length : "0"} Posts</p>
            <p>{user.followers ? user.followers.length : "0"} Followers</p>
            <p>{user.following ? user.following.length : "0"} Following</p>
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
    </div>
  );
};

export default Profile;
