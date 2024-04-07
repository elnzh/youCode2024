const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
// const __dirname = "../outfit-recommender/server"
app.use(express.json());

// API endpoint to save data
app.post('/api/save-data', (req, res) => {
    const { moodTag, journalText, date } = req.body;
    const data = { moodTag, journalText, date };

    try {
        // Read existing data from JSON file
        const existingData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));

        // Append new data to existing data
        existingData.push(data);

        // Write updated data back to JSON file
        fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(existingData, null, 2));

        res.sendStatus(200);
    } catch (error) {
        console.error('Error saving data:', error);
        res.sendStatus(500);
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, '../outfit-recommender/public')));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
