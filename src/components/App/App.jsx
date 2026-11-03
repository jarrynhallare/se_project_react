import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import { getItems, addItem, removeItem, addCardLike, removeCardLike, editUser } from "../../utils/api";
import { signup, signin, getUserInfo } from "../../utils/auth";
import { apiKey, coordinates } from "../../utils/constants";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    isDayTime: true,
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Hooks must be called inside the component.
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    getUserInfo(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Could not validate saved token:", error);
        localStorage.removeItem("jwt");
      });
  }, []);

  useEffect(() => {
    getWeatherData(coordinates, apiKey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);

    getItems()
      .then(setClothingItems)
      .catch((error) => {
        console.error("Failed to fetch items:", error);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return undefined;

    function handleEscClose(event) {
      if (event.key === "Escape") {
        setActiveModal("");
        setCardToDelete(null);
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  function handleLogin({ email, password }) {
    signin({ email, password })
      .then((response) => {
        if (!response.token) {
          throw new Error("Sign-in response did not include a token.");
        }

        localStorage.setItem("jwt", response.token);
        return getUserInfo(response.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((error) => console.error("Sign-in failed:", error));
  }

  function handleRegister({ name, avatar, email, password }) {
    signup({ name, avatar, email, password })
      .then(() => {
        setActiveModal("");
        handleLogin({ email, password });
      })
      .catch((error) => console.error("Registration failed:", error));
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleAddItem(newItem) {
    if (!isLoggedIn) return;

    const token = localStorage.getItem("jwt");

    addItem(newItem, token)
      .then((item) => {
        setClothingItems((items) => [item, ...items]);
        setActiveModal("");
      })
      .catch((error) => console.error("Failed to add item:", error));
  }

  function openConfirmationModal(card) {
    setSelectedCard(card);
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  }
  function handleCardLike({ id, isLiked }) {
  const token = localStorage.getItem("jwt");
  if (!token || !isLoggedIn) return;

  const request = isLiked
    ? removeCardLike(id, token)
    : addCardLike(id, token);

  request
    .then((updatedCard) => {
      setClothingItems((cards) =>
        cards.map((item) => (item._id === id ? updatedCard : item))
      );
    })
    .catch((error) => console.error("Failed to update like:", error));
}

function handleUpdateUser({ name, avatar }) {
  const token = localStorage.getItem("jwt");
  if (!token || !isLoggedIn) return;

  editUser(token, { name, avatar })
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      setActiveModal("");
    })
    .catch((error) => console.error("Failed to update profile:", error));
}

  function handleCardDelete() {
    if (!cardToDelete || !isLoggedIn) return;

    const token = localStorage.getItem("jwt");

    removeItem(cardToDelete._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== cardToDelete._id)
        );
        setActiveModal("");
        setCardToDelete(null);
      })
      .catch((error) => console.error("Failed to delete item:", error));
  }

  function closeActiveModal() {
    setActiveModal("");
    setCardToDelete(null);
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveModal("");
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__wrapper">
          <Header
            setActiveModal={setActiveModal}
            weatherData={weatherData}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <Profile
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    setActiveModal={setActiveModal}
                    onSignOut={handleSignOut}
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                    onEditProfile={() => setActiveModal("edit-profile")}
                  />
                ) : null
              }
            />
          </Routes>

          <Footer />
        </div>

        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onRegister={handleRegister}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={handleLogin}
        />

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={handleAddItem}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          selectedCard={selectedCard}
          onClose={closeActiveModal}
          onDelete={openConfirmationModal}
        />

        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={closeActiveModal}
          onConfirm={handleCardDelete}
          cardName={cardToDelete?.name || ""}
        />

        <EditProfileModal
  isOpen={activeModal === "edit-profile"}
  onClose={closeActiveModal}
  onUpdateUser={handleUpdateUser}
  currentUser={currentUser}
/>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  </CurrentUserContext.Provider>
);
}
export default App;