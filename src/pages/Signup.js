import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import "./Signup.css";

export default function Signup(props) {
  const [newEmail, set_newEmail] = useState("");
  const [newPassword, set_newPassword] = useState("");
  // const [createNewUser, { email,password }] = useMutation(CREATE_NEW_USER);
  const history = useHistory();
  async function createNewUser(email, password) {
    const response = await axios.post(`${BACKEND_URL}/signup`, {
      email,
      password,
    });
    localStorage.setItem("jwt", response.data.token);
    history.push("/");
    props.setLoginStatus(true);
  }

  return (
    <div className="form-container">
      <h2>Create new account</h2>
      <form
        className="signup-form"
        action="/"
        onSubmit={(e) => {
          e.preventDefault();
          createNewUser(newEmail, newPassword);
        }}
      >
        <input
          className="auth-input"
          type="email"
          placeholder="email"
          value={newEmail}
          onChange={(e) => {
            set_newEmail(e.target.value);
          }}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="password"
          value={newPassword}
          onChange={(e) => {
            set_newPassword(e.target.value);
          }}
        />
        <input className="submit" type="submit" value="sign up" />
      </form>
    </div>
  );
}
