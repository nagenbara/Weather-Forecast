import React, { useState } from 'react';
import "./App.css";

require("dotenv").config();

function App() {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&&timestamp=${Date.now()}&query=${query}`;

  const fetchData = async () => {
    const response = await fetch(API_URL);
    const result = await response.json();
    setWeather(result);
    setLoading(false);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setWeather({});
    setLoading(true);
    fetchData();
  };

  return (
    <div className="container">
      <h1 className="text-center">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {weather.current ? (
        <div className="weather-container">
          <h2>Weather in {weather.location.name}, {weather.location.country}</h2>
          <p>Temperature: {weather.current.temperature}°C</p>
          <p>Feels like: {weather.current.feelslike}°C</p>
          <p>Weather conditions: {weather.current.weather_descriptions[0]}</p>
        </div>
      ) : ( !loading ? 
        <p>Masukkan Nama Kota Yang Valid</p> : <p> Loading... </p>
      )}
    </div>
  );
}

export default App;
