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
          <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm bg-body-tertiary rounded">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <img className="logo" src={logo_word} alt="Instagram" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/myfollowingpost"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Explore
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/createPost"
                    >
                      Create
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      // to={""}
                    >
                      <button
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      >
                        Logout
                      </button>
                    </Link>
                  </li>
                </ul>
                {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
              </div>
            </div>
          </nav>
        </>,
      ];
    } else {
      return [
        <>
        </>,
      ];
    }
  };

  return (
    <div>
     {loginStatus()}
    </div>
  );
};

export default Navbar;
