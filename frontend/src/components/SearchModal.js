import React, { useContext, useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { LoginContext } from "../context/LoginContext";
import { Link } from "react-router-dom";
import "../css/Search.css";

const SearchModal = () => {
  const { setSearchOpen } = useContext(LoginContext);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

  const fetchSearchDetail = () => {
    fetch(`/getSearch/${search}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setSearchResult(result);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (search) {
      fetchSearchDetail();
    }
  }, [search]);
  

  return (
    <div className="dark-bg">
      <div className="centered">
        <div className="searchModal">
          <div className="modal-heading " style={{ marginTop: "7px" }}>
            <h5>Search</h5>
          </div>
          <div className="searchBar">
            <input
              type="text"
              className="searchInput"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <span
              class="material-symbols-outlined clearSymbol"
              title="Clear"
              onClick={() => setSearch("")}
            >
              cancel
            </span>
          </div>

          <button
            className="close-btn"
            title="Close"
            onClick={() => setSearchOpen(false)}
          >
            <RiCloseLine title="Close" />
          </button>
          {searchResult?.length !== 0 && search ? (
            searchResult?.map((val) => {
              return (
                <ul key={val._id} style={{ marginTop: "20px" }}>
                  <li className="sidebar-item">
                    <div className="side-card">
                      <img
                        className="side-profile-pic"
                        src={val.Photo ? val.Photo : picLink}
                        alt="picture"
                      />
                      <div className="side-card-details">
                        <Link to={`/profile/${val._id}`}>
                          <span
                            className="menu-text"
                            style={{ fontSize: "medium" }}
                          >
                            {val.username}
                          </span>
                        </Link>
                        {/* <button
                        className="side-btn-follow"
                        onClick={() => {
                          followUser(val._id);
                        }}
                      >
                        Follow
                      </button> */}
                      </div>
                    </div>
                  </li>
                </ul>
              );
            })
          ) : (
            <p className="emptyLine">No search found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
