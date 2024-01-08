import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";
import logo_word from "../img/logo_word.png";
import "../css/SignIn.css";

const SignIn = () => {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postSignIn = async (e) => {
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    e.preventDefault();
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }
    const fetchSignIn = await fetch("http://localhost:5000/signIn", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const signUpData = await fetchSignIn.json();
    if (signUpData.error) {
      await notifyA(signUpData.error);
    } else {
      localStorage.setItem("jwt", signUpData.token);
      localStorage.setItem("user", JSON.stringify(signUpData.user));
      setUserLogin(true);
      navigate("/");
      await notifyB("Successfully Login");
    }
  };

  return (
    <div className="signIn">
      <div className="container main-content">
        <form onSubmit={postSignIn}>
          <div className="center">
            <img className="signIn-logo" src={logo_word} alt="Instagram" />
            {/* <p style={{ color: "black" }}>
              Sign in to see photos and videos from your friends
            </p> */}
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
          <div className="form-floating" >
            <input
              type="password"
              className="form-control input-details"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="off"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button type="submit" className="btn btn-primary btn-signIn my-2">
            Sign In
          </button>
        </form>
      </div>
      <div className="sec-content my-2">
        <div style={{ color: "black" }}>Don't have an account?</div>
        <span>
          <Link style={{ textDecoration: "none" }} to="/signUp">
            Sign Up
          </Link>
        </span>
      </div>
    </div>

  );
};

export default SignIn;
