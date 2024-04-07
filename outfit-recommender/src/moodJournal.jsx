import React, { useState } from 'react';

// import OpenAI from "openai";


import Openai from 'openai'; // Assuming 'openai' is the correct module name


const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
console.log(apiKey)

const openai = new Openai({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});


const MoodJournal = ({ onDescriptionChange, onMoodTagChange }) => {

    const [journalText, setJournalText] = useState('');
    let [moodTagInput, setMoodTagInput] = useState(''); // Define moodTagInput state




    let journalTextInput = ""
    let dateInput = ""
    //let quote = "";
    let jsonString = ""



    const handleMoodTagChange = (event) => {
        const selectedMoodTag = event.target.value;
        setMoodTagInput(selectedMoodTag); // Update moodTagInput state
        onMoodTagChange(selectedMoodTag); // Pass selected mood tag to parent
    };

    const handleJournalTextChange = (event) => {
        setJournalText(event.target.value);
    };

    let handleSubmit = async (event) => {
        event.preventDefault();

        const currentDate = new Date().toLocaleDateString();
        const jsonData = {
            moodTag: moodTagInput,
            journalText: journalText,
            date: currentDate
        };

        try {
            // Read existing data from JSON file (if any)
            const existingData = JSON.parse(localStorage.getItem('moodJournalData')) || [];

            // Append new data to existing data
            existingData.push(jsonData);

            // Write updated data back to JSON file
            localStorage.setItem('moodJournalData', JSON.stringify(existingData));
            await getUserInput()
            console.log(localStorage)
            alert('Data saved successfully');
            // setMoodTag('');
            // setJournalText('');
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Failed to save data. Please try again.');
        }

    };


    let getUserInput = async () => {

        // Retrieve the JSON string from localStorage

        jsonString = localStorage.getItem('moodJournalData');
        // console.log("second time ${jsonString}")
        // console.log(jsonString[jsonString.length-1])

        // Parse the JSON string into a JavaScript object
        const journalData = JSON.parse(jsonString)
        const lastObject = journalData[journalData.length - 1]
        console.log(lastObject)

        // Access a specific field in the JavaScript object
        moodTagInput = lastObject.moodTag;
        journalTextInput = lastObject.journalText;
        dateInput = lastObject.date;

        // Now you can use these variables as needed
        console.log('Mood Tag:', moodTagInput);
        console.log('Journal Text:', journalTextInput);
        console.log('Date:', dateInput);

    }

    let openAIQuote = async () => {


        const completion = await openai.chat.completions.create({
            messages: [

                { "role": "system", "content": "You are a counselor." },
                {
                    "role": "user", "content": `Please generate a motivational comforting a peoson whose mood is ${moodTagInput} and whose wrote journal:" ${journalText}", please keep it no more that 3 sentences, related to the mood`
                }

            ],
            model: "gpt-3.5-turbo",
        });

        console.log(completion.choices[0].message.content);
        onDescriptionChange(completion.choices[0].message.content)
        //return completion.choices[0].message.content;
    }


    return (
        <div>
            <h2>Select Mood Tag:</h2>
            <select value={moodTagInput} onChange={handleMoodTagChange}>
                <option value="">Select Mood</option>
                <option value="Grateful">Grateful</option>
                <option value="Excited">Excited</option>
                <option value="Happy">Happy</option>
                <option value="Inspired">Inspired</option>
                <option value="Tired">Tired</option>
                <option value="Sad">Sad</option>
                <option value="Stressed">Stressed</option>
                <option value="Angry">Angry</option>
                <option value="Lonely">Lonely</option>
            </select>

            <h2>Journal Entry:</h2>
            <textarea value={journalText} onChange={handleJournalTextChange} rows="4" cols="50" />

            <button onClick={handleSubmit}>Submit</button>
            <button onClick={openAIQuote}> Generate quote</button>

            {/* <div>
                {generatedQuote && <p>{generatedQuote}</p>}
            </div> */}

        </div>
    );
};



export default MoodJournal;
