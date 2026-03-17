export const weatherOptions = [
  {
    isDayTime: true,
    condition: "clear",
    url: new URL("../assets/Day/clear.svg", import.meta.url),
  },
  {
    isDayTime: true,
    condition: "cloudy",
    url: new URL("../assets/Day/cloudy.svg", import.meta.url),
  },
  {
    isDayTime: true,
    condition: "rain",
    url: new URL("../assets/Day/rain.svg", import.meta.url),
  },
  {
    isDayTime: true,
    condition: "storm",
    url: new URL("../assets/Day/storm.svg", import.meta.url),
  },
  {
    isDayTime: true,
    condition: "snow",
    url: new URL("../assets/Day/snow.svg", import.meta.url),
  },
  {
    isDayTime: false,
    condition: "clear",
    url: new URL("../assets/Night/clear.svg", import.meta.url),
  },
  {
    isDayTime: false,
    condition: "cloudy",
    url: new URL("../assets/Night/cloudy.svg", import.meta.url),
  },
  {
    isDayTime: false,
    condition: "rain",
    url: new URL("../assets/Night/rain.svg", import.meta.url),
  },
  {
    isDayTime: false,
    condition: "storm",
    url: new URL("../assets/Night/storm.svg", import.meta.url),
  },
  {
    isDayTime: false,
    condition: "snow",
    url: new URL("../assets/Night/snow.svg", import.meta.url),
  },
];

export const coordinates = {
  latitude: 29.4252,
  longitude: -98.4946,
};

export const apiKey = "68f328d782ab11fd65426596c1bb1575";
