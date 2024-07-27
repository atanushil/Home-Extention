import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = React.memo(() => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      const weatherUrl = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=${lat}&lon=${lon}`;
      const weatherOptions = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "399e3ef61cmshfb9b26c31bd8b00p105d3ajsn639dc3a8023c",
          "x-rapidapi-host": "weather-by-api-ninjas.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.get(weatherUrl, weatherOptions);
        setWeatherData(response.data);
        localStorage.setItem('weatherData', JSON.stringify(response.data));
      } catch (error) {
        setError("Failed to fetch weather data");
        console.error(error);
      }
    };

    const fetchLocationName = async (lat, lon) => {
      const locationUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

      try {
        const response = await axios.get(locationUrl);
        setLocation(response.data.address);
        localStorage.setItem('location', JSON.stringify(response.data.address));
      } catch (error) {
        setError("Failed to fetch location name");
        console.error(error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Check if weather data is already cached
            const cachedWeather = localStorage.getItem('weatherData');
            const cachedLocation = localStorage.getItem('location');

            if (cachedWeather && cachedLocation) {
              setWeatherData(JSON.parse(cachedWeather));
              setLocation(JSON.parse(cachedLocation));
            } else {
              fetchWeather(latitude, longitude);
              fetchLocationName(latitude, longitude);
            }
          },
          (error) => {
            setError("Failed to get location");
            console.error(error);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  return (
    <div className="bg-gray-400 p-2 rounded-md ">
      {error && <div>{error}</div>}
      {weatherData && location ? (
        <div>
          <h3>Weather in {location.city || location.town || location.village}</h3>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Condition: {weatherData.description}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.wind_speed} m/s</p>
        </div>
      ) : (
        !error && <div>Loading weather data...</div>
      )}
    </div>
  );
});

export default Weather;
