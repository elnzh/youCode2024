import React, {useState} from 'react';
import Weather from './Weather'; 
import Avatar from './Avatar';

const App = () => {
  const [description, setDescription] = useState('');

  return (
    <div className="App">
      <Weather city="Vancouver" onDescriptionChange={setDescription} /> 
      <Avatar description={description}/>
    </div>
  );
};

export default App;
