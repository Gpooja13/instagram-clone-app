import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo_word from "../img/logo_word.png";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const { token } = useParams();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const resetPassword = async (e) => {
    try {
      e.preventDefault();

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{6,15}$/;

      if (password !== cnfPassword) {
        notifyA("Password does not match");
        return;
      } 
      
      if (!passwordRegex.test(password)) {
        notifyA(
          "Password must container at least 6 characters including at least 1 number, 1 lowercase letter, 1 uppercase letter and 1 special characters"
        );
        return;
      }

      if (!token) {
        notifyA("Not authorized");
        return;
      }

      const response = await fetch("http://localhost:5000/changePassword", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.error) {
        notifyA(data.error);
      } else {
        notifyB(data.success);
      }
    } catch (error) {
      console.error(error);
      notifyA("An error occurred");
    }
  };

  return (
    <div className="signIn">
      <div className="container main-content">
        <form onSubmit={resetPassword}>
          <div className="center">
            <img className="signIn-logo" src={logo_word} alt="Instagram" />
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

          <div className="form-floating" style={{ marginTop: "7px" }}>
            <input
              type="password"
              className="form-control input-details"
              name="cnfPassword"
              id="cnfPassword"
              value={cnfPassword}
              onChange={(e) => {
                setCnfPassword(e.target.value);
              }}
              autoComplete="off"
              placeholder="Confirm Password"
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>

          <button className="btn btn-primary btn-signIn my-3">Update</button>
        </form>
      </div>
      <div className="sec-content my-2">
        <span>
          <Link
            style={{ textDecoration: "none", fontWeight: "500" }}
            to="/signIn"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ChangePassword;
