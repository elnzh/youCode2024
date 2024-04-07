import React from 'react';
import goodWeather from './images/goodWeather.png';
import rainy from './images/rainy.png';
import snowy from './images/snowy.png';
import windy from './images/windy.png';

import './Avatar.css';

const Avatar = ({ description, quote }) => {
    let weatherImage;
    let placeholder = "Try to generate an inspirational quote!";
    if (quote){
        placeholder = quote;
    }
  
    if (description.includes('Rain')) {
      weatherImage = rainy;
    } else if (description.includes('Snow')) {
      weatherImage = snowy;
    } else if (description.includes('Wind')) {
      weatherImage = windy;
    } else {
      weatherImage = goodWeather;
    }
  
    return (
      <div className="avatar-container">
        <img src={weatherImage} alt={description} className="image" />
        <div className="text-bubble">
          <p>{placeholder}</p>
        </div>
      </div>
    );
  };
  

export default Avatar;