import React from 'react';
import goodWeather from './images/goodWeather.png';
import rainy from './images/rainy.png';
import snowy from './images/snowy.png';
import windy from './images/windy.png';

import './Avatar.css';

const Avatar = ({ description }) => {
    let weatherImage;
  
    if (description.includes('rain')) {
      weatherImage = rainy;
    } else if (description.includes('snow')) {
      weatherImage = snowy;
    } else if (description.includes('wind')) {
      weatherImage = windy;
    } else {
      weatherImage = goodWeather;
    }
  
    return (
      <div className="avatar-container">
        <img src={weatherImage} alt={description} className="image" />
        <div className="text-bubble">
          <p>{description}</p>
        </div>
      </div>
    );
  };
  

export default Avatar;
