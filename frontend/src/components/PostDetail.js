import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/PostDetail.css";

const PostDetail = ({ item, toggleDetails }) => {
  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const removePost = (postId) => {
    if (window.confirm("Do you really want to delete the post?")) {
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
    }
  };

  return (
    <div className="showComment">
      <div className="container">
        <div className="post-pic">
          <img src={item.photo} />
        </div>

        <div className="details">
          <div
            className="card-header"
            style={{ borderBottom: "1px solid #00000029",justifyContent:"space-between" }}
          >
          <div className="self-menu">
            <div className="card-pic">
              <img src={item.postedBy.Photo} alt="pic" />
            </div>
            <h5 className="mx-3" >{item.postedBy.name}</h5>
            </div>

            <div onClick={() => removePost(item._id)}>
              <span class="material-symbols-outlined">delete</span>
            </div>
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
              <span class="material-symbols-outlined material-symbols-outlined-red">
                favorite
              </span>
            ) : (
              <span class="material-symbols-outlined">favorite</span>
            )}
            <p>{item.likes.length} Likes</p>
          </div>

          <div className="add-comment">
            <span class="material-symbols-outlined">mood</span>
            <input
              placeholder="Add a Comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="btn-comment"
              // onClick={() => {
              //   makeComment(comment, item._id);
              //   toggleComment();
              // }}
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
          onClick={() => toggleDetails()}
        >
          close
        </span>
      </div>
    </div>
  );
};

export default PostDetail;
