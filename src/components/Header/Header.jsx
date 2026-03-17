import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ setActiveModal, weatherData }) {
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
      <button
        className="header__add-clothes-btn"
        onClick={() => setActiveModal("add-garment")}
      >
        + Add Clothes
      </button>
      <NavLink to="/profile" className="header__profile-link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
