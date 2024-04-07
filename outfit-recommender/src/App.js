import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';
import Avatar from './Avatar';
import './App.css';

const App = () => {
  const [description, setDescription] = useState(''); // State to store weather keyword
  // const [moodTag, setMoodTag] = useState(''); // State to store mood
  const [userInput, setUserInput] = useState(''); // State for user input
  const [messages, setMessages] = useState([]); // State to store chat messages

  useEffect(() => {
    // Prepare the data to be sent to the backend
    // If moodTag is not null or empty, include it in the postData
    let moodTag = null;
    const postData = moodTag ? { moodTag, description } : { description };

    // Function to fetch the initial health tips/welcome message
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.post('/api/welcome', postData);
        setMessages([{ text: response.data.message, sender: 'AI' }]);
      } catch (error) {
        console.error('Error fetching the initial welcome message:', error);
      }
    };

    // Call the function if the description is set
    if (postData) {
      fetchWelcomeMessage();
    }
  }, [description]); 


  const generateAnswer = async () => {
    if (!userInput.trim()) return; // Do not send empty messages
    try {
      // Prepare the data to be sent to the backend
      const postData = { question: userInput };
      const response = await axios.post('/api/chat', postData);
      setMessages(messages => [...messages, { text: response.data.message, sender: 'AI' }]);
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear input fields
    setUserInput('');
  };

  return (
    <div className="App">
      <Avatar description={description} />
      <Weather city="Vancouver" onDescriptionChange={setDescription} />


      {/* Chat interface */}
      <div className="chat-container">
        <h2>Personalized Wellness Chatbot</h2>

        {/* Chat messages box */}
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>

        <div className="suggestions">
          <button onClick={() => setUserInput('Tell me about omega-3 supplements.')}>
            Tell me about omega-3 supplements.</button>
          <button onClick={() => setUserInput('Tell me about food suggestions to maintain a good mood, be concise and friendly')}>
          Food suggestions to maintain a good mood.</button>
          {/* Repeat for other suggested questions */}
        </div>


        {/* Input for sending a message */}
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Send a message"
          className="message-input"
        />
        <button onClick={generateAnswer} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default App;