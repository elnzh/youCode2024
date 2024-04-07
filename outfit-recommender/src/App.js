
import logo from './logo.svg';
import './App.css';
import History from './History';
import React, {useState} from 'react';
import Weather from './Weather'; 
import Avatar from './Avatar';
import Clothes from './Clothes';

const App = () => {
  const [description, setDescription] = useState('');

  return (
    <div className="App">
      <Weather city="Vancouver" onDescriptionChange={setDescription} /> 
      <Avatar description={description}/>
      <Clothes description={description}/>
    </div>
  );
};

export default App;
