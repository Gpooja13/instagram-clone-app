import React, { useState, useEffect } from "react";
import PostDetail from "../components/PostDetail";
import List from "../components/List";
import { useParams } from "react-router-dom";
import "../css/UserProfile.css";

const UserProfile = () => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [listHeading, setlistHeading] = useState("");
  const [showList, setShowList] = useState(false);
  const [followData, setfollowData] = useState([]);
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);

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
        setRefresh(false);
      });
  };

  const unfollowUser = (userId) => {
   
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
       
        setIsFollow(false);
        setRefresh(true);
      });
  };

  const fetchUserDetail=()=>{
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPic(result.posts);
       
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
    }

  useEffect(() => {
   fetchUserDetail();
  }, [refresh,show]);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img src={user.Photo ? user.Photo : picLink} alt="pic" />
        </div>
        {/* details */}
        <div className="profile-data">
          <div className="user-header">
            <h1 className="username-heading">{user.name}</h1>
            <button
              className="follow-btn "
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
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                setfollowData(user.followers);
                setlistHeading("Followers");
                toggleList();
              }}
            >
              {user.followers ? user.followers.length : "0"} Followers
            </p>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                setfollowData(user.following);
                setlistHeading("Following");
                toggleList();
              }}
            >
              {user.following ? user.following.length : "0"} Following
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
                alt="pic"
                onClick={() => {
                  toggleDetails(pics);
                }}
              />
            );
          })}
        </div>
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {showList && (
        <List
          toggleList={toggleList}
          followData={followData}
          listHeading={listHeading}
        />
      )}
    </div>
  );
};

export default UserProfile;
