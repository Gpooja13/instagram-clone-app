import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/CreatePost.css";

const CreatePost = () => {
  const hiddenFileInput = useRef(null);
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  // posting data to cloudinary
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud-name", "cloudtrial");
    fetch("https://api.cloudinary.com/v1_1/cloudtrial/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));

    //saving url to mongodb
  };

  var loadFile = function (event) {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    };
  };

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ body: body, photo: url }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            notifyA(res.error);
          } else {
            notifyB("Successfully posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  return (
    <div className="createPost">
      <div className="create-header">
        <h4 style={{ margin: "3px auto" }}>Create new post</h4>
        <button id="btn-createPost" onClick={postDetails}>
          Share
        </button>
      </div>
      <hr style={{ margin: "5px auto" }} />
      <div>
        <img
          className="preview"
          id="output"
          onClick={handleClick}
          src="img.png"
          alt="pic"
        />
        <input
          style={{ display: "none" }}
          ref={hiddenFileInput}
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadFile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      <div>
        <div className="create-details">
          <div>
            <img src="RM.jfif" alt="pic" />
          </div>
          <h5>Ramesh</h5>
        </div>
        <div className="center">
          <textarea
            className="post-caption"
            type="text"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            placeholder="Write caption..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
