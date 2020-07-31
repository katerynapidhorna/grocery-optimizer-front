import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Loginpage.css";

export default function Loginpage(props) {
  const [userEmail, set_userEmail] = useState("");
  const [userPassword, set_userPassword] = useState("");
  const history = useHistory();

  async function postUserData(email, password) {
    const response = await axios.post("http://localhost:4000/login", {
      email,
      password,
    });

    localStorage.setItem("jwt", response.data.token);
    history.push("/");
    props.setLoginStatus(true);
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form
        className="login-form"
        action="/"
        onSubmit={(e) => {
          e.preventDefault();
          postUserData(userEmail, userPassword);
        }}
      >
        <input
          className="auth-input"
          type="email"
          placeholder="email"
          value={userEmail}
          onChange={(e) => {
            set_userEmail(e.target.value);
          }}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="password"
          value={userPassword}
          onChange={(e) => {
            set_userPassword(e.target.value);
          }}
        />
        <input className="submit" type="submit" />
      </form>
      <Link className="sign-up" to="/signup">
        create new accaunt
      </Link>
    </div>
  );
}
