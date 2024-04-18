import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_word from "../img/logo_word.png";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const verifyUser = () => {};

  return (
    <div className="signIn">
      <div className="container main-content">
        <form onSubmit={verifyUser}>
          <div className="center">
            <img className="signIn-logo" src={logo_word} alt="Instagram" />
          </div>
          <div className="form-floating mb-2">
            <input
              type="email"
              className="form-control input-details"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="off"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email</label>
          </div>

          <button type="submit" className="btn btn-primary btn-signIn my-3">
            Send Email
          </button>
        </form>
      </div>
      <div className="sec-content my-2">
        <div style={{ color: "black" }}>Don't have an account?</div>
        <span>
          <Link
            style={{ textDecoration: "none", fontWeight: "500" }}
            to="/signUp"
          >
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Forgot;
