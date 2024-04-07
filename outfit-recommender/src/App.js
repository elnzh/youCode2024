import logo from './logo.svg';
import './App.css';
import MoodJournal from './moodJournal';
import History from './History';
import React, { useState } from 'react';
import Weather from './Weather';
import Avatar from './Avatar';
import Clothes from './Clothes';
import axios from 'axios';

const App = () => {
  const [description, setDescription] = useState('');
  const [moodTag, setMoodTag] = useState('');
  const [generatedQuote, setGeneratedQuote] = useState('');
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const generateAdvice = async () => {
    const postData = moodTag ? { moodTag, description } : { description };
    try {
      // Assuming your backend expects a POST request with JSON body
      const response = await axios.post('/api/chat', postData);
      setMessages([{ text: response.data.message, sender: 'AI' }]);
    } catch (error) {
      console.error('Error fetching the initial welcome message:', error);
    }
  };

  return (
    <div>
      <h1 class="center">Arc'teryx Weatherwise</h1>
      <div class="row">
      <div class="block">
        <div class="weather-container">  
          <Avatar description={description} quote={generatedQuote}/>
          {/* {console.log("Just for Testing: ", generatedQuote, "dfkgfk", moodTag, "grgrrgr")} */}
          <Clothes description={description} />
        </div>
       
        
        <div class="weather-container">
        <div className="chat-container">
        <h2>Personalized Wellness Chatbot</h2>
        
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>

        <div className="suggestions">
          {/* These buttons pre-fill the userInput state for demo purposes */}
          <button onClick={() => setUserInput('Tell me about omega-3 supplements.')}>
            Tell me about omega-3 supplements.</button>
          <button onClick={() => setUserInput('Tell me about food suggestions to maintain a good mood, be concise and friendly')}>
            Food suggestions to maintain a good mood.</button>
        </div>

        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your question here"
          className="message-input"
        />
        <div class="button-rows">
          <button onClick={generateAdvice} className="button">Get today's advice</button>
          <button className="button">Send</button>
        </div>
        
      </div>
        </div>
        
      </div>
      <div class="block">
        <Weather city="Vancouver" onDescriptionChange={setDescription} />
        <div class="weather-container">
            <MoodJournal onDescriptionChange={setGeneratedQuote} onMoodTagChange={setMoodTag} />
        </div>
        <div class="weather-container">
            <h2>Your Mindful Moments....</h2>
            <div class="block"> <History /> </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default App;