import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = ({ city, onDescriptionChange }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  // State
  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch geocoding data to get latitude and longitude
  useEffect(() => {
    fetch(geocodingUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
          return fetch(weatherUrl);
        } else {
          throw new Error('Geocoding data not found.');
        }
      })
      .then((res) => res.json())
      .then((weatherData) => {
        setApiData(weatherData);
        setLoading(false);
        const description = weatherData.weather ? weatherData.weather[0].main : '';
        onDescriptionChange(description);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [geocodingUrl, apiKey, onDescriptionChange]);

  return (
    <div className="weather-container">
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        <>
          <h1>Weather in {city}</h1>
          <p className="description">{apiData.weather ? apiData.weather[0].description : ''}</p>
          <p className="temperature">Temperature: {apiData.main?.temp}°C</p>
          <p className="feels-like">Feels like: {apiData.main?.feels_like}°C</p>
          <p className="humidity">Humidity: {apiData.main?.humidity}%</p>
        </>
      )}
    </div>
  );
};

export default Weather;
