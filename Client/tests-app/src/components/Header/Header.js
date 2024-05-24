import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import "bootstrap/dist/css/bootstrap.min.css";

import "./header.css";

const GetHeader = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <Link className="navbar-brand" to="/">
          MyTests
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/tests">
                Tests
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto" style={{ marginLeft: "auto" }}>
            {auth.accessToken ? (
              <li className="nav-item ml-auto">
                <button className="layout-link-button" onClick={signOut}>
                  Выход
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item ml-auto">
                  <Link className="nav-link" to="/login">
                    Вход/Регистрация
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default GetHeader;
