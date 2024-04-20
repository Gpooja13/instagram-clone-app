import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo_word from "../img/logo_word.png";
import "../css/SignUp.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LoginContext } from "../context/LoginContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUserLogin } = useContext(LoginContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Toast function
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{6,15}$/;

  const postData = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    } else if (!passwordRegex.test(password)) {
      notifyA(
        "Password must container at least 6 characters including at least 1 number, 1 lowercase letter, 1 uppercase letter and 1 special characters"
      );
      return;
    }

    const fetchSignUp = await fetch("http://localhost:5000/signUp", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
      }),
    });
    const signUpData = await fetchSignUp.json();
    if (signUpData.error) {
      await notifyA(signUpData.error);
    } else {
      await notifyB(signUpData.message);
      navigate("/signIn");
    }
  };

  const contiWithGoogle = async (credentialResponse) => {
    const jwtDetail = jwtDecode(credentialResponse.credential);

    const fetchSignUp = await fetch("http://localhost:5000/googleLogin", {
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
    <div className="signUp">
      <div>
        <div className="container main-content">
          <form onSubmit={postData}>
            <div className="center">
              <img className="signUp-logo" src={logo_word} alt="Instagram" />
              <p style={{ color: "black" }}>
                Sign up to see photos and videos from your friends
              </p>
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

              <div className="form-floating mb-2 inputDetail">
                <input
                  type="text"
                  className="form-control input-signUp"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  autoComplete="off"
                  placeholder="John Watson"
                />
                <label htmlFor="name">Full name</label>
              </div>

              <div className="form-floating mb-2 inputDetail">
                <input
                  type="text"
                  className="form-control input-signUp"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  autoComplete="off"
                  placeholder="johnWatson"
                />
                <label htmlFor="username">Username</label>
              </div>

              <div className="form-floating mb-2 inputDetail">
                <input
                  type="email"
                  className="form-control input-signUp"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="off"
                  placeholder="name@example.com"
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="form-floating mb-2 inputDetail">
                <input
                  type="password"
                  className="form-control input-signUp"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="off"
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-signUp my-2 "
              >
                Sign Up
              </button>
            </div>
            <div>
              <p style={{ fontSize: "12px", margin: "5px 0" }}>
                By signing up, you agree to out Terms, privacy policy and
                cookies policy.
              </p>
            </div>
          </form>
        </div>
        <div className="sec-content my-2">
          <div style={{ color: "black" }}>Already have an account?</div>
          <span>
            <Link style={{ textDecoration: "none" }} to="/signIn">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
