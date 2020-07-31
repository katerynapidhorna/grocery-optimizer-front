import React from "react";
import { Link } from "react-router-dom";

export default function Navigation(props) {
  const { isLoggedIn, setLoginStatus } = props;

  return (
    <div className="navigation">
      <span className="logo">Grocery Optimizer</span>
      <div className="manu">
        <div></div>
        <div></div>
        <div></div>
        <ul className="nav-manu">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("jwt");
                  setLoginStatus(false);
                }}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
