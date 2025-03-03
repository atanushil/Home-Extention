import React, { useState, useEffect } from "react";
import axios from "axios";
import config from '../../config.js';

const Weather = React.memo(({ bgColor  }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      const weatherUrl = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=${lat}&lon=${lon}`;
      const weatherOptions = {
        method: "GET",
        headers: {
          "x-rapidapi-key": config.WEATHER_API_KEY, // Replace with your RapidAPI key
          "x-rapidapi-host": "weather-by-api-ninjas.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.get(weatherUrl, weatherOptions);
        setWeatherData(response.data);
        localStorage.setItem('weatherData', JSON.stringify(response.data));
      } catch (error) {
        setError("Failed to fetch weather data");
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
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
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
          () => setError("Failed to get location")
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);


  const getWeatherIcon = (temp) => {
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 6 && currentHour < 18; 

    if (temp < 0) {
      return "❄️"; 
    } else if (temp < 20) {
      return isDayTime ? "🌤️" : "🌑"; 
    } else if (temp < 30) {
      return isDayTime ? "🌞" : "🌗"; 
    } else {
      return isDayTime ? "🔥" : "🌝"; 
    }
  };

  return (
    <div
      className={`relative p-6 rounded-lg max-w-md shadow-md shadow-black caret-transparent hidden lg:block xl:block 2xl:block ${bgColor}`}
    >
      {error && <div className="text-red-400 text-center mb-4">{error}</div>}
      {weatherData && location ? (
        <div className="text-center text-white">
          <h3 className="text-2xl font-bold mb-2">
            Weather in {location.city || location.town || location.village}
          </h3>
          <div className="flex justify-center items-center mb-4">
            <div className="text-6xl">
              {getWeatherIcon(weatherData.temp)}
            </div>
            <div className="ml-4">
              <p className="text-4xl font-semibold">{weatherData.temp}°C</p>
              <p className="text-lg">Temperature</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-lg">Humidity: {weatherData.humidity}%</p>
            <p className="text-lg">Wind Speed: {weatherData.wind_speed} m/s</p>
          </div>
        </div>
      ) : (
        !error && <div className="text-center text-white">Loading weather data...</div>
      )}
    </div>
  );
});

export default Weather;
