require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post('/api/welcome', async (req, res) => {
    console.log('Received data:', req.body);
    const { moodTag, description } = req.body;

    // Construct the prompt differently based on whether moodTag is provided
    let prompt = '';
    if (moodTag) {
        prompt = `Given the mood: ${moodTag} and the weather condition: ${description}, 
                provide list of health supplements recommendations, be concise and friendly`;
    } else {
        prompt = `Given the weather condition: ${description}, 
                provide health supplements recommendations, be concise and friendly`;
    }

    console.log('prompt generated:', prompt);

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: prompt
                }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            }
        );
        // Send the message back to the client
        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error communicating with OpenAI' });
    }
});


app.get('/api/chat', async (req, res) => {
    console.log('prompt generated:', req.body);
    try {
        const { question } = req.body;
        let prompt = `Given the query: ${question}, 
                provide an answer, be concise and friendly`;
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: prompt
                }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            }
        );
        // Send the message back to the client
        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error communicating with OpenAI' });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});