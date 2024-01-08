import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import logo_word from "../img/logo_word.png";
import "../css/Navbar.css";

const Navbar = (props) => {
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (token || props.login) {
      return [
        <>
          <nav className="main-menu">
            <ul className="menu-container">
              <li>
                <Link className="" to="/">
                  <img className="logo" src={logo_word} alt="Instagram" />
                </Link>
              </li>
              <li className="">
                <Link to="/myfollowingpost">
                  <span class="material-symbols-outlined menu-icon">home</span>
                  <span className="menu-text"> Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/">
                  <span class="material-symbols-outlined menu-icon">
                    explore
                  </span>
                  <span className="menu-text">Explore</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/createPost">
                  <span class="material-symbols-outlined menu-icon">
                    add_box
                  </span>
                  <span className="menu-text"> Create</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile">
                  <span class="material-symbols-outlined menu-icon">
                    account_circle
                  </span>
                  <span className="menu-text">Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={() => {
                      setModalOpen(true);
                    }}>
                  <span
                    class="material-symbols-outlined menu-icon"
                  >
                    logout
                  </span>
                  <span className="menu-text">Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </>,
      ];
    } else {
      return [<></>];
    }
  };

  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt");
    if (token || props.login) {
      return [
        <>
          <nav className="mob-main-menu">
            <ul className="mob-menu-container">
              <li className="">
                <Link className="" to="/myfollowingpost">
                  <span class="material-symbols-outlined menu-icon">home</span>
                </Link>
              </li>
              <li className="">
                <Link className="" aria-current="page" to="/">
                  <span class="material-symbols-outlined menu-icon">explore</span>
                </Link>
              </li>
              <li className="">
                <Link className="" to="/createPost">
                  <span class="material-symbols-outlined menu-icon">add_box</span>
                </Link>
              </li>
              <li className="">
                <Link className="" to="/profile">
                  <span class="material-symbols-outlined menu-icon">account_circle</span>
                </Link>
              </li>
              <li className="">
                <Link className="">
                  <span
                    class="material-symbols-outlined menu-icon"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    logout
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </>,
      ];
    } else {
      return [<></>];
    }
  };

  return (
    <div className="main-navbar">
      <ul className="nav-lap">{loginStatus()}</ul>
      <ul className="nav-mobile">{loginStatusMobile()}</ul>
    </div>
  );
};

export default Navbar;
