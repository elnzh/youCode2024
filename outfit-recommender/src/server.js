require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    
    const { moodTag, description } = req.body;
    // Validate request body
    if (!description) {
        return res.status(400).json({ message: 'Description is required.' });
    }

    // Construct the prompt based on provided moodTag and description
    let prompt = `Provide general health and wellness supplements recommendations, be concise and friendly.`;
    if (moodTag) {
        prompt += ` Given the mood: ${req.body.moodTag} and the weather condition: ${req.body.description}, provide list of health supplements recommendations.`;
    } else {
        prompt += ` Given the weather condition: ${req.body.description}, provide health supplements recommendations.`;
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "You are a knowledgeable assistant about dietary supplements."
                }, {
                    role: "user",
                    content: prompt
                }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                }
            }
        );
        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI request failed:', error.message);
        res.status(500).json({ message: 'Failed to fetch advice from OpenAI.' });
    }
});

// app.post('/api/chat', async (req, res) => {
//     const { question } = req.body;

//     // Validate request body
//     if (!question) {
//         return res.status(400).json({ message: 'Question is required.' });
//     }

//     try {
//         const response = await axios.post(
//             'https://api.openai.com/v1/chat/completions',
//             {
//                 model: "gpt-3.5-turbo",
//                 messages: [{ role: "user", content: question }]
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
//                 }
//             }
//         );
//         res.json({ message: response.data.choices[0].message.content });
//     } catch (error) {
//         console.error('OpenAI request failed:', error.message);
//         res.status(500).json({ message: 'Failed to fetch response from OpenAI.' });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});