
import { useState } from 'react';

import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function App() {
const [WeatherData, setWeatherData] = useState({type:"hot"});
const [activeModal, setActiveModal] = useState("");
  return <div className="page">
    <div className="page__wrapper">
    <Header />
    <Main  WeatherData={WeatherData}/>
    </div>
    <ModalWithForm
    title="New garment"
    buttonText="Add garment"
    activeModal={activeModal} 
     />

    <label htmlFor="name" className="modal__label">Name{}
        <input type="text" id="name" className="modal__input" placeholder="Name" />
      </label>
       <label htmlFor="imageUrl"className="modal__label">Image{}
        <input type="url" id="imageUrl" className="modal__input" placeholder="Image URL" />
      </label>
      <feildset className="modal__radio-buttons">
        <legend className="modal__legend">Select weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input type="radio" name="weather" value="hot" id="hot" className="modal__radio-input" />
          Hot
        </label>
         <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input type="radio" name="weather" value="warm" id="warm" className="modal__radio-input" />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input type="radio" name="weather" value="cold" id="cold" className="modal__radio-input" />
          Cold
        </label>
      </feildset>
         <button type="submit" className="modal__submit-button">Add garment</button>
  </div>;
}

export default App
