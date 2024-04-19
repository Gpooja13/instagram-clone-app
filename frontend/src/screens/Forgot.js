import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_word from "../img/logo_word.png";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const verifyUser = async (e) => {
    try {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      e.preventDefault();
      if (!emailRegex.test(email)) {
        notifyA("Invalid email");
        return;
      }

      const postVerifyEmail = await fetch("http://localhost:5000/forgot", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const verifyData = await postVerifyEmail.json();

      if (verifyData.error) {
        await notifyA(verifyData.error);
      } else {
        await notifyB(verifyData.res);
      }
    } catch (error) {
      notifyB(error);
    }
  };

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
