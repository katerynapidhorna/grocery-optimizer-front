import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Loginpage.css";

export default function Loginpage() {
  const [userEmail, set_userEmail] = useState("");
  const [userPassword, set_userPassword] = useState("");
  const history = useHistory();

  async function postUserData(email, password) {
    const response = await axios.post("http://localhost:4000/login", {
      email,
      password,
    });

    console.log("response.data.token", response.data.token);
    localStorage.setItem("jwt", response.data.token);
    history.push("/homepage");
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form
        action="/homepage"
        onSubmit={(e) => {
          e.preventDefault();
          postUserData(userEmail, userPassword);
        }}
      >
        <input
          type="email"
          placeholder="email"
          value={userEmail}
          onChange={(e) => {
            set_userEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={userPassword}
          onChange={(e) => {
            set_userPassword(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
      <Link to="/signup">create new accaunt</Link>
    </div>
  );
}
