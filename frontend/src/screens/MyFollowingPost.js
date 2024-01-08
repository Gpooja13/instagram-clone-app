import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import("../css/Home.css");

const MyFollowingPost = () => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signIn");
    }
    // Fetching all posts
    fetch("http://localhost:5000/myfollowingpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  const toggleComment = (posts) => {
    setItem(posts);
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
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
        console.log(result);
      });
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
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
        console.log(result);
      });
  };

  const makeComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
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
                <h5>
                  <Link to={`/profile/${posts.postedBy._id}`}>
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
                    class="material-symbols-outlined material-symbols-outlined-red"
                    onClick={() => {
                      unlikePost(posts._id);
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    class="material-symbols-outlined"
                    onClick={() => {
                      likePost(posts._id);
                    }}
                  >
                    favorite
                  </span>
                )}

                <p>{posts.likes.length} Likes</p>
                <p>{posts.body}</p>
                <p
                  style={{ fontWeight: "500", cursor: "pointer" }}
                  onClick={() => {
                    toggleComment(posts);
                  }}
                >
                  View all comments
                </p>
              </div>
              {/* commment */}
              <div className="add-comment">
                <span class="material-symbols-outlined">mood</span>
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
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="post-pic">
              <img src={item.photo} />
            </div>

            <div className="details">
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="card-pic">
                  <img src={item.postedBy.Photo} alt="pic" />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>

              <div className="card-caption">
                <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                  {item.postedBy.name}
                </span>
                <span>{item.body}</span>
              </div>

              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((com) => {
                  return (
                    <p>
                      <span style={{ fontWeight: "bolder" }}>
                        {com.postedBy.name}{" "}
                      </span>
                      <span>{com.comment}</span>
                    </p>
                  );
                })}
              </div>

              <div className="card-like-content">
                {item.likes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                ) ? (
                  <span
                    class="material-symbols-outlined material-symbols-outlined-red"
                    onClick={() => {
                      unlikePost(item._id);
                      toggleComment();
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    class="material-symbols-outlined"
                    onClick={() => {
                      likePost(item._id);
                      toggleComment();
                    }}
                  >
                    favorite
                  </span>
                )}
                <p>{item.likes.length} Likes</p>
              </div>

              <div className="add-comment">
                <span class="material-symbols-outlined">mood</span>
                <input
                  placeholder="Add a Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="btn-comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className="close-comment">
            <span
              class="material-symbols-outlined"
              style={{ fontSize: "xx-large" }}
              onClick={() => toggleComment()}
            >
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFollowingPost;
