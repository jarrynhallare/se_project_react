import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

import { getItems, addItem, removeItem } from "../../utils/api";
import { apiKey, coordinates } from "../../utils/constants";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTempuratureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    isDayTime: true,
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItem = (newItem) => {
    addItem(newItem).then((item) => {
      setClothingItems([...clothingItems, item]);
      setActiveModal("");
    });
  };

  const openConfirmationModal = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-confirmation");
  };

  const handleCardDelete = () => {
    if (cardToDelete && cardToDelete._id) {
      removeItem(cardToDelete._id).then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== cardToDelete._id),
        );
        setCardToDelete(null);
        setSelectedCard({});
        setActiveModal("");
      });
    }
  };

  const handleRemoveItem = (id) => {
    removeItem(id).then(() => {
      setClothingItems(clothingItems.filter((item) => item._id !== id));
      setActiveModal("");
    });
  };

  const closeActiveModal = () => {
    setActiveModal("");
    if (activeModal === "delete-confirmation") {
      setCardToDelete(null);
    }
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeatherData(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems().then((data) => {
      setClothingItems(data);
    });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__wrapper">
          <Header setActiveModal={setActiveModal} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
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
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
