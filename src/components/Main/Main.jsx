import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTempuratureUnitContext";
import { useContext } from "react";

function Main({ weatherData, clothingItems, handleCardClick }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {currentTempUnit === 'F' ? `${weatherData.temp.F}°F` : `${weatherData.temp.C}°C`} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => handleCardClick(item)}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
