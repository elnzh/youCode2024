import React, { useState } from 'react';
import './Clothes.css'; // Import CSS file

// import OpenAI from "openai";


import Openai from 'openai'; // Assuming 'openai' is the correct module name


const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
console.log(apiKey)

const openai = new Openai({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});


const Clothes = ({description}) => {
    // const [moodTag, setMoodTag] = useState('');
    // const [journalText, setJournalText] = useState('');
    // let moods = []

    // let moodTagInput = ""
    // let journalTextInput = ""
    // let dateInput = ""
    // let jsonString = ""



    // const handleMoodTagChange = (event) => {
    //     setMoodTag(event.target.value);
    // };

    // const handleJournalTextChange = (event) => {
    //     setJournalText(event.target.value);
    // };

    // let handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const currentDate = new Date().toLocaleDateString();
    //     const jsonData = {
    //         moodTag: moodTag,
    //         journalText: journalText,
    //         date: currentDate
    //     };

    //     try {
    //         // Read existing data from JSON file (if any)
    //         const existingData = JSON.parse(localStorage.getItem('moodJournalData')) || [];

    //         // Append new data to existing data
    //         existingData.push(jsonData);

    //         // Write updated data back to JSON file
    //         localStorage.setItem('moodJournalData', JSON.stringify(existingData));
    //         await getUserInput()
    //         console.log(localStorage)
    //         alert('Data saved successfully');
    //         setMoodTag('');
    //         setJournalText('');
    //     } catch (error) {
    //         console.error('Error saving data:', error);
    //         alert('Failed to save data. Please try again.');
    //     }

    // };

    // let getUserInput = async () => {

    //     // Retrieve the JSON string from localStorage

    //     jsonString = localStorage.getItem('moodJournalData');
    //     // console.log("second time ${jsonString}")
    //     // console.log(jsonString[jsonString.length-1])

    //     // Parse the JSON string into a JavaScript object
    //     const journalData = JSON.parse(jsonString)
    //     const lastObject = journalData[journalData.length - 1]
    //     console.log(lastObject)

    //     // Access a specific field in the JavaScript object
    //     moodTagInput = lastObject.moodTag;
    //     journalTextInput = lastObject.journalText;
    //     dateInput = lastObject.date;

    //     // Now you can use these variables as needed
    //     console.log('Mood Tag:', moodTagInput);
    //     console.log('Journal Text:', journalTextInput);
    //     console.log('Date:', dateInput);


    // }
    const [clothes, setClothes] = useState(" ");

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
                { "role": "user", "content" : `please recommend me some Arcteryx clothes based on the weather ${description}, give me the product name and a short decription under 20 words for each`}
            ],
            model: "gpt-3.5-turbo",
        });


        setClothes(completion.choices[0].message.content);
        console.log(completion.choices[0].message.content);
    }


    return (
        <div className="clothes-container">
            <button onClick={generatText}>Generate</button>
            {clothes}
        </div>
    );
};

export default Clothes;