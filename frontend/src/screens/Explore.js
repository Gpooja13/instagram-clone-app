import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Suggestion from "../components/Suggestion";
import PostDetail from "../components/PostDetail";
import("../css/Home.css");

const Explore = () => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  let limit = 10;
  let skip = 0;

  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("long-lime-penguin-wear.cyclic.app/signIn");
    }
    // Fetching all posts
    fetchPosts();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchPosts = () => {
    fetch(`/allPosts?limit=${limit}&skip=${skip}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData((data) => [...data, ...result]))
      .catch((err) => console.log(err));
  };

  const handleScroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      skip = skip + 10;
      fetchPosts();
    }
  };

  const toggleComment = (posts) => {
    setItem(posts);
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
       
      });
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        
      });
  };

  const makeComment = (text, id) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        notifyB("Comment posted");
      });
  };

  return (
    <div>
      <Suggestion />
      <div className="card">
        {data.map((posts) => {
          return (
            <>
              {/* card header */}
              <div className="card-header">
                <div className="card-pic">
                  <img
                    src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink}
                    alt="pic"
                  />
                </div>
                <h5 className="user-name-heading">
                  <Link
                    to={
                      posts.postedBy._id ===
                      JSON.parse(localStorage.getItem("user"))._id
                        ? "/profile"
                        : `/profile/${posts.postedBy._id}`
                    }
                  >
                    {posts.postedBy.name}
                  </Link>
                </h5>
              </div>
              {/* post */}
              <div className="card-image">
                <img src={posts.photo} alt="pic" />
              </div>
              {/* card content */}
              <div className="card-content">
                {posts.likes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                ) ? (
                  <span
                    class="material-symbols-outlined material-symbols-outlined-red btn-margin"
                    onClick={() => {
                      unlikePost(posts._id);
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    class="material-symbols-outlined btn-margin "
                    onClick={() => {
                      likePost(posts._id);
                    }}
                  >
                    favorite
                  </span>
                )}
                <span
                  class="material-symbols-outlined mx-2 btn-margin"
                  onClick={() => {
                    toggleComment(posts);
                  }}
                >
                  mode_comment
                </span>

                <p className="text-bolder">{posts.likes.length} Likes</p>
                <p>
                  <span className="text-bolder">{posts.postedBy.name}</span>
                  <span style={{ marginLeft: "8px" }}>{posts.body}</span>
                </p>
                <p
                  style={{
                    fontWeight: "500",
                    cursor: "pointer",
                    marginBottom: "0px",
                    color: "#817b7b",
                  }}
                  onClick={() => {
                    toggleComment(posts);
                  }}
                >
                  View all comments
                </p>
              </div>
              {/* commment */}
              <div className="add-comment">
                <span
                  class="material-symbols-outlined"
                  style={{ color: "#8d8d99", fontSize: "larger" }}
                >
                  mood
                </span>
                <input
                  placeholder="Add a Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="btn-comment"
                  onClick={() => {
                    makeComment(comment, posts._id);
                  }}
                >
                  Post
                </button>
              </div>
            </>
          );
        })}
      </div>

      {/* show comment */}
      {show && <PostDetail item={item} toggleDetails={toggleComment} />}
    </div>
  );
};

export default Explore;
