import React, { useState } from 'react';

// import OpenAI from "openai";


import Openai from 'openai'; // Assuming 'openai' is the correct module name


const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
console.log(apiKey)

const openai = new Openai({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});


const MoodJournal = () => {
    const [moodTag, setMoodTag] = useState('');
    const [journalText, setJournalText] = useState('');
    let moods = []

    let moodTagInput = ""
    let journalTextInput = ""
    let dateInput = ""
    let jsonString = ""



    const handleMoodTagChange = (event) => {
        setMoodTag(event.target.value);
    };

    const handleJournalTextChange = (event) => {
        setJournalText(event.target.value);
    };

    let handleSubmit = async (event) => {
        event.preventDefault();

        const currentDate = new Date().toLocaleDateString();
        const jsonData = {
            moodTag: moodTag,
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
            setMoodTag('');
            setJournalText('');
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

    let generatText = async () => {


        const completion = await openai.chat.completions.create({
            messages: [

                { "role": "system", "content": "You are a stylist." },
        //         {
        //             "role": "user", "content": `
        // Please generate a motivational comforting a peoson whose mood is ${moodTag} and whose wrote journal ${journalText}, please generate in this parsable JSON format:
        
        // {
        //     "quote": "answer"
                // }` },
                { "role": "user", "content" : "It's 11 degree outside, please recommend me some Arcteryx clothing product"}
        
            ],
            model: "gpt-3.5-turbo",
        });

        console.log(completion.choices[0]);








        // let prompt = `
        // Please generate a motivational comforting a peoson whose mood is ${moodTag} and whose wrote journal ${journalText}, please generate in this parsable JSON format:
        // {
        //     "quote": "answer"
        // }`;

        // const response = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: prompt,
        //     max_tokens: 2048,
        //     temperature: 1,
        // });

        // const parsableJSONresponse = response.data.choices[0].text;
        // const parsedResponse = JSON.parse(parsableJSONresponse);


        // console.log("Answer: ", parsedResponse.quote);
    }


    return (
        <div>
            <h2>Select Mood Tag:</h2>
            <select value={moodTag} onChange={handleMoodTagChange}>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Tired">Sad</option>
                {/* Add more mood tags as needed */}
            </select>

            <h2>Journal Entry:</h2>
            <textarea value={journalText} onChange={handleJournalTextChange} rows="4" cols="50" />



            <button onClick={handleSubmit}>Submit</button>
            <button onClick={generatText}> Generate</button>
        </div>
    );
};



export default MoodJournal;
