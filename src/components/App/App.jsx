import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";

import { apiKey, coordinates, defaultClothingItems } from "../../utils/constants";
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

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

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



  const onAddItem = (data) => {
    const newCardData = {
      id: Date.now(),
      name: data.name,
      link: data.imageUrl,
      weather: data.weather,
    };
    setClothingItems([...clothingItems, newCardData]);
    setActiveModal("");
  };

  const closeActiveModal = () => {
  setActiveModal("");
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
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTempUnit, handleToggleSwitchChange }}>
    <div className="page">
      <div className="page__wrapper">
        <Header setActiveModal={setActiveModal} weatherData={weatherData} />
        <Routes>
          <Route path="/" 
          element={
            <Main 
            weatherData={weatherData} 
            clothingItems={clothingItems} 
            handleCardClick={handleCardClick} 
            />
            } 
          />
           <Route path="/profile" element={
            <Profile 
            clothingItems={clothingItems} 
            handleCardClick={handleCardClick} />} />
        </Routes>
        <Footer />
      </div>
        <AddItemModal
         isOpen={activeModal === 'add-garment'}
         onClose={closeActiveModal}
          onAddItem={onAddItem}
        />
      <ItemModal
        isOpen={activeModal === "preview"}
        selectedCard={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
