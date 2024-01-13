import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";
import logo_word from "../img/logo_word.png";
import "../css/SignIn.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const postSignIn = async (e) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    e.preventDefault();
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }
    const fetchSignIn = await fetch("/signIn", {
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

  const contiWithGoogle = async (credentialResponse) => {
   
    const jwtDetail = jwtDecode(credentialResponse.credential);

    const fetchSignUp = await fetch("/googleLogin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: jwtDetail.name,
        username: jwtDetail.email,
        email: jwtDetail.email,
        email_verified: jwtDetail.email_verified,
        clientId: credentialResponse.clientId,
        Photo: jwtDetail.picture,
      }),
    });
    const signUpData = await fetchSignUp.json();
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
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                contiWithGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            <p className="choice-line">
              <span className="line"></span>
              <span>or</span>
              <span className="line"></span>
            </p>
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
          <div className="form-floating">
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
          <button type="submit" className="btn btn-primary btn-signIn my-3">
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
