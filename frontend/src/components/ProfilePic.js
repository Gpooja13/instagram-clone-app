import React, { useState, useEffect, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import "../css/ProfilePic.css";

const ProfilePic = ({ changeProfile }) => {
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

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

  const postProfile = () => {
    fetch("/uploadProfilePic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ pic: url }),
    })
      .then((res) => res.json())
      .then((data) => {
     
        changeProfile();
        window.location.reload();
        //   if (res.error) {
        //     notifyA(res.error);
        //   } else {
        //     notifyB("Successfully posted");
        //     navigate("/")
        //   }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      postProfile();
    }
  }, [url]);

  return (
    <div className="dark-bg">
      <div className="centered">
        <div className="profilePic-modal">
          <div className="modal-heading ">
            <h5>Change Profile Photo</h5>
          </div>
          {/* <button className="profilePic-close-btn" onClick={changeProfile}>
            <RiCloseLine />
          </button> */}
          <div className="profilePic-menu">
            <div>
              <button className="profile-btn" style={{color:"#00b5fd;"}} onClick={handleClick}>
                Upload Photo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={hiddenFileInput}
                style={{ display: "none" }}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <div>
              <button
                className="profile-btn"
                style={{color:"#dd2929"}}
                onClick={() => {
                  setUrl(null);
                  postProfile();
                }}
              >
                Remove Current Photo
              </button>
            </div>
            <div>
              <button className="profile-btn" style={{color:"#6a6969;"}} onClick={changeProfile}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePic;
