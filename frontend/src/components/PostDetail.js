import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/PostDetail.css";
import DelModal from "../components/DelModal";
import Emoji from "./Emoji";

const PostDetail = ({ item, toggleDetails }) => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

  const [numofComment, setnumofComment] = useState([])
  const [myProfile, setMyProfile] = useState(false);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const userDetail = JSON.parse(localStorage.getItem("user"));

  const checkUser = () => {
    setnumofComment(item.comments)
    if (userDetail._id === item.postedBy._id) {
      setMyProfile(true);
    } else {
      setMyProfile(false);
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
      });
  };

  const makeComment = (text, id) => {
    if (comment !== "") {
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
    } else {
      notifyA("Enter comment first");
    }
  };

  const delComment = async (id, cid, postedById) => {
    if (userDetail._id === postedById) {
      const delcom = await fetch("http://localhost:5000/uncomment", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ id: id, cid: cid }),
      });
      const result = await delcom.json();
      const newData = data.map((posts) => {
        if (posts._id === result._id) {
          return result;
        } else {
          return posts;
        }
      });
      setData(newData);
      notifyB("Comment deleted");
    }
  };

  useEffect(() => {
    checkUser();
  }, [numofComment]);

  return (
    <div className="showComment">
   { deleteModal && <DelModal setDeleteModal={setDeleteModal}  id={item._id} toggleDetails={toggleDetails}/>}
      <div className="post-container">
        <div className="post-pic">
          <img src={item.photo} />
        </div>

        <div className="details">
          <div
            className="card-header"
            style={{
              borderBottom: "1px solid #00000029",
              justifyContent: "space-between",
            }}
          >
            <div className="self-menu">
              <div className="card-pic">
                <img src={item.postedBy.Photo?item.postedBy.Photo:picLink} alt="pic" />
              </div>
              
              <h5 className="mx-3"><Link className="name-link" to={`/profile/${item.postedBy._id}`}>
                    {item.postedBy.name}
                  </Link></h5>
            </div>

            {myProfile && (
              <div 
               onClick={()=>setDeleteModal(true)}
              
              >
                <span class="material-symbols-outlined">delete</span>
              </div>
            )}
          </div>

          <div className="card-caption">
            <div className="card-pic">
              <img src={item.postedBy.Photo?item.postedBy.Photo:picLink} alt="pic" />
              <span className=" userPost-name">
              <Link className="name-link" to={`/profile/${item.postedBy._id}`}>
                    {item.postedBy.name}
                  </Link>
              </span>
              <span>{item.body}</span>
            </div>
          </div>

          <div
            className="comment-section"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {numofComment.map((com) => {
              return (
                <div>
                <p className="card-pic" style={{marginBottom:"10px"}}>
              <img src={com.postedBy.Photo?com.postedBy.Photo:picLink} alt="pic" />
                  <span className="userPost-name" >
                  <Link className="name-link" to={`/profile/${com.postedBy._id}`}>
                    {com.postedBy.name}
                  </Link>
                  </span>
                  <span>{com.comment}</span>
                  <span style={{display:(com.postedBy._id===(JSON.parse(localStorage.getItem("user")))._id?"block":"none")}}
                    class="material-symbols-outlined delcomment-btn"
                   
                    onClick={() => {
                      delComment(item._id, com._id, com.postedBy._id);
                      toggleDetails();
                    }}
                  >
                    delete_forever
                  </span>
                  </p>
                </div>
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
                  toggleDetails();
                }}
              >
                favorite
              </span>
            ) : (
              <span
                class="material-symbols-outlined"
                onClick={() => {
                  likePost(item._id);
                  toggleDetails();
                }}
              >
                favorite
              </span>
            )}
            <p>{item.likes.length} Likes</p>
          </div>

          <div className="add-comment" style={{marginBottom:"0",padding:"0"}}>
            {/* <span class="material-symbols-outlined">mood</span> */}
            <Emoji setComment={setComment}/>
            <input
              placeholder="Add a Comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              className="btn-comment"
              onClick={() => {
                toggleDetails();
                makeComment(comment, item._id);
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
          onClick={() => toggleDetails()}
        >
          close
        </span>
      </div>
    </div>
  );
};

export default PostDetail;
