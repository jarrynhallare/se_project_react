import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function Header({ setActiveModal, weatherData }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img src={logo} className="header__logo" alt="WTWR logo" />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {currentUser ? (
        <>
          <button
            className="header__add-clothes-btn"
            type="button"
            onClick={() => setActiveModal("add-garment")}
          >
            + Add Clothes
          </button>

          <NavLink to="/profile" className="header__profile-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={`${currentUser.name}'s avatar`}
                  className="header__avatar"
                />
              ) : (
                <span className="header__avatar header__avatar_placeholder">
                  {currentUser.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <div className="header__auth-actions">
          <button
            type="button"
            className="header__auth-button"
            onClick={() => setActiveModal("register")}
          >
            Sign up
          </button>
          <button
            type="button"
            className="header__auth-button"
            onClick={() => setActiveModal("login")}
          >
            Log in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;