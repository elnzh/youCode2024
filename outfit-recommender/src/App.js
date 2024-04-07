import { React, useState } from 'react';
import MoodJournal from './moodJournal';

const App = () => {
  
  const [moodTag, setMoodTag] = useState('');
  const [generatedQuote, setGeneratedQuote] = useState('');

  return (
    <div>
      <h1>Mood Journal App</h1>
      <MoodJournal onDescriptionChange={setGeneratedQuote} onMoodTagChange={setMoodTag} />
      {console.log(generatedQuote,"dfkgfk", moodTag, "grgrrgr")}
    </div>
  );
};

export default App;

