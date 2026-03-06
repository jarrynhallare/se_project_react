import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { apiKey, coordinates, defaultClothingItems } from "../../utils/constants";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeatherData(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header setActiveModal={setActiveModal} weatherData={weatherData} />
        <Main weatherData={weatherData} clothingItems={clothingItems} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        name={'add-garment'}
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === 'add-garment'}
        onClose={() => setActiveModal("")}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            id="name"
            className="modal__input"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            id="imageUrl"
            className="modal__input"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather"
              value="hot"
              id="hot"
              className="modal__radio-input"
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              name="weather"
              value="warm"
              id="warm"
              className="modal__radio-input"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              name="weather"
              value="cold"
              id="cold"
              className="modal__radio-input"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        isOpen={activeModal === "preview"}
        selectedCard={selectedCard}
        onClose={() => setActiveModal("")}
      />
    </div>
  );
}

export default App;
