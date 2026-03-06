import './WeatherCard.css';
import '../../vendor/fonts.css';
import { weatherOptions } from '../../utils/constants';

function WeatherCard({ weatherData }) {
  

  if (!weatherData || !weatherData.condition) {
    return <section className="weather-card">Loading...</section>;
  }

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.isDayTime === weatherData.isDayTime && 
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = weatherOptions.find(opt => opt.isDayTime === weatherData.isDayTime);
  } else {
    weatherOption = filteredOptions[0];
  }

  if (!weatherOption) {
    return <section className="weather-card">No image found</section>;
  }

  const svgUrl = weatherOption.url.href;

  const backgroundStyle = {
    backgroundImage: `url(${svgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <section className="weather-card" style={backgroundStyle}>
      <p className="weather-card__temp">{weatherData.temp.F}°F</p>
      <img 
        src={svgUrl} 
        alt={`Card showing ${weatherOption.isDayTime ? "day" : "night"} time ${weatherOption.condition} weather`}
        className="weather-card__image" 
      />
    </section>
  );
}

export default WeatherCard;