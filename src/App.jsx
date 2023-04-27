import React, { useState } from "react";
import "./App.css";

const App = () => {
  const apiKey = "e9f69911cbcd7292187ca26f04706b65";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if(event.key == "Enter") {
      console.log(event.key)
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setWeatherData(data);
          setCity("");
        });
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter city..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p>Welcome to weather app! Enter the city to get.</p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{weatherData.name}</p>
          <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
          <p className="weather">{weatherData.weather[0].main}</p>
          <p className="weather">{weatherData.wind.speed}-meters per second</p>
        </div>
      )}

      {weatherData.cod === "404" ? <p>city not found.</p> : <></>}
    </div>
  );
};

export default App;
