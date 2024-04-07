import logo from './logo.svg';
import './App.css';
import MoodJournal from './moodJournal';
import History from './History';
import React, { useState } from 'react';
import Weather from './Weather';
import Avatar from './Avatar';
import Clothes from './Clothes';

const App = () => {
  const [description, setDescription] = useState('');
  const [moodTag, setMoodTag] = useState('');
  const [generatedQuote, setGeneratedQuote] = useState('');

  return (
    <div className="App">
      <Weather city="Vancouver" onDescriptionChange={setDescription} />
      <Avatar description={description} quote={generatedQuote}/>
      <Clothes description={description} />
      <MoodJournal onDescriptionChange={setGeneratedQuote} onMoodTagChange={setMoodTag} />
      {/* {console.log("Just for Testing: ", generatedQuote, "dfkgfk", moodTag, "grgrrgr")} */}
    </div>
  );
};

export default App;