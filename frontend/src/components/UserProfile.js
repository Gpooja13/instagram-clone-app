import React, { useState, useEffect } from "react";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";
import "../css/UserProfile.css";

const UserProfile = () => {
  var picLink="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  //   const [pic, setpic] = useState([]);
  //   const [show, setShow] = useState(false);
  //   const [posts, setPosts] = useState([]);

  //   const toggleDetails = (posts) => {
  //     if (show) {
  //       setShow(false);
  //     } else {
  //       setShow(true);
  //       setPosts(posts);
  //     }
  //   };

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
        console.log(data);
        setIsFollow(true);
      });
  };

  const unfollowUser = (userId) => {
    console.log(userId);
    fetch("/unfollow", {
      method: "put",
      body: JSON.stringify({ followId: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPosts(result.posts);
        console.log(
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        );
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (

    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            src={user.Photo ? user.Photo : picLink}
            alt="pic"
          />
        </div>
        {/* details */}
        <div className="profile-data">
          <div className="user-header">
            <h1>{user.name}</h1>
            <button className="follow-btn "
            onClick={() => {
              if (isFollow) {
                unfollowUser(user._id);
              } else {
                followUser(user._id);
              }
            }}
          >
            {isFollow ? "Unfollow" : "Follow"}
          </button>
          </div>
          <div className="profile-info">
            <p>{posts ? posts.length : "0"} Posts</p>
            <p>{user.followers ? user.followers.length : "0"} Followers</p>
            <p>{user.following ? user.following.length : "0"} Following</p>
          </div>
        </div>
      </div>
      {/* gallery */}
      <hr />
      <div className="gallery">
        <div>
          {posts.map((pics) => {
            return (
              <img
                key={pics._id}
                src={pics.photo}
                onClick={() => {
                  // toggleDetails(pics);
                }}
              />
            );
          })}
        </div>
      </div>
      {/* {show && <PostDetail item={posts} toggleDetails={toggleDetails} />} */}
    </div>
  );
};

export default UserProfile;
