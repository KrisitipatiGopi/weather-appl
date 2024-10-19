import React, { useEffect, useState } from 'react';
import './Weather.css';
import clear_img from '../Assets/clear.png';
import cloud_img from '../Assets/cloud.png';
import drizzle_img from '../Assets/drizzle.png';
import humidity_img from '../Assets/humidity.png';
import rain_img from '../Assets/rain.png';
import search_img from '../Assets/search.png';
import snow_img from '../Assets/snow.png';
import wind_img from '../Assets/wind.png';


const Weather = () => {
    
    const [city, setCity] = useState("London");
    const [weatherData, setWeatherData] = useState([])

    const allIcons = {
        "01d": clear_img,
        "01n": clear_img,
        "02d": cloud_img,
        "02n": cloud_img,
        "03d": cloud_img,
        "03n": cloud_img,
        "04d": drizzle_img,
        "04n": drizzle_img,
        "09d": rain_img,
        "09n": rain_img,
        "10d": rain_img,
        "10n": rain_img,
        "13d": snow_img,
        "13n": snow_img
    }

    const fetchWeather = async() => {
        if (city === ""){
            alert("Please Enter a city");
            return
        }
        const api = "b4a15061617b1e30c88b7858822e4646";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (response.ok){
            setWeatherData({
                temp:data.main.temp,
                humidity:Math.floor(data.main.humidity),
                city:data.name,
                wind_speed: data.wind.speed,
                icon: data.weather[0].icon
            })
        }

        else{
            alert("City Not Found");
        }

        
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter"){
            fetchWeather()
        }
    }
    
    useEffect(() => {
        fetchWeather()
    },[])

  return (
    <div className="mainContainer">
      <div className="mainCont">
        <div className="inputContainer">
          <input 
          type="text" 
          placeholder="Enter City" 
          className="inputBox" 
          onChange={(e) =>setCity(e.target.value)} 
          onKeyDown={handleKeyPress}
          value={city}
          />
          <img 
          src={search_img} 
          alt="search" 
          className="search_styles"
          onClick={fetchWeather}
           />
        </div>
        <div className="dataContainer">
          <img src={allIcons[weatherData.icon] || clear_img} alt="clear" className="def_img" />
          <h1>
            {weatherData.temp} &deg;C<br />
            <span>{weatherData.city}</span>
          </h1>
        </div>
        <div className="FinalContainer">
          <div className="leftContainer">
            <img src={humidity_img} alt="humidity" className="humid_style" />
            <p>{weatherData.humidity}%<br />Humidity</p>
          </div>
          <div className="rightContainer">
            <img src={wind_img} alt="wind" className="humid_style" />
            <p>{weatherData.wind_speed} Km/h<br />Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
