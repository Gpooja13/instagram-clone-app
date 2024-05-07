import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import logo_word from "../img/logo_word.png";
import "../css/Navbar.css";

const Navbar = (props) => {
  const { setModalOpen,setSearchOpen} = useContext(LoginContext);
  const [modal, setModal] = useState(false);
  const [sModal, setSModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  const toggleScroll = () => {
    
    setModal(props.modalOpen);
    setSModal(props.searchOpen);
    if (modal || sModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const loginStatus = () => {
  
    if (token || props.login) {
      return [
        <>
          <nav className="main-menu">
            <ul className="menu-container">
              <li>
                <NavLink to="/">
                  <img className="logo" src={logo_word} alt="Instagram" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "selectedTab" : "")}
                >
                  <span class="material-symbols-outlined menu-icon">home</span>
                  <span className="menu-text"> Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/explore"
                  className={({ isActive }) => (isActive ? "selectedTab" : "")}
                >
                  <span class="material-symbols-outlined menu-icon">
                    explore
                  </span>
                  <span className="menu-text">Explore</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  onClick={() => {
                    setSearchOpen(true);
                  }}
                >
                  <span class="material-symbols-outlined menu-icon">
                    search
                  </span>
                  <span className="menu-text"> Search</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/createPost"
                  className={({ isActive }) => (isActive ? "selectedTab" : "")}
                >
                  <span class="material-symbols-outlined menu-icon">
                    add_box
                  </span>
                  <span className="menu-text"> Create</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? "selectedTab" : "")}
                >
                  <span class="material-symbols-outlined menu-icon">
                    account_circle
                  </span>
                  <span className="menu-text">Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <span class="material-symbols-outlined menu-icon">
                    logout
                  </span>
                  <span className="menu-text">Logout</span>
                </NavLink>
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
   
    if (token || props.login) {
      return [
        <>
          <nav className="mob-main-menu">
            <ul className="mob-menu-container">
              <li className="">
                <NavLink className=""  to="/">
                  <span class="material-symbols-outlined menu-icon" >home</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink  onClick={() => {
                    setSearchOpen(true);
                  }} >
                  <span class="material-symbols-outlined menu-icon">
                    search
                  </span>
                </NavLink>
              </li>
              <li className="">
                <NavLink className="" aria-current="page"  to="/explore">
                  <span class="material-symbols-outlined menu-icon">
                    explore
                  </span>
                </NavLink>
              </li>
             
              <li className="">
                <NavLink className="" to="/createPost">
                  <span class="material-symbols-outlined menu-icon">
                    add_box
                  </span>
                </NavLink>
              </li>
              <li className="">
                <NavLink className="" to="/profile">
                  <span class="material-symbols-outlined menu-icon">
                    account_circle
                  </span>
                </NavLink>
              </li>
              <li className="">
                <NavLink className="">
                  <span
                    class="material-symbols-outlined menu-icon"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    logout
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </>,
      ];
    } else {
      return [<></>];
    }
  };

  useEffect(() => {
    toggleScroll();
  });

  useEffect(() => {
    const verifyToken= async (e) => {
      const fetchSignIn = await fetch("/verifyToken", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token:localStorage.getItem("jwt"),
        }),
      });
      const response = await fetchSignIn.json();
      if (!response.res) {
        localStorage.removeItem("jwt");
        navigate("/signIn");
      }
    };
    verifyToken();
  }, [token]);
  
  return (
    <div className="main-navbar">
      <ul className="nav-lap">{loginStatus()}</ul>
      <ul className="nav-mobile">{loginStatusMobile()}</ul>
    </div>
  );
};

export default Navbar;
