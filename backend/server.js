const express = require('express');
const mongoose = require('mongoose');
const { findBestSprinklerSpots } = require('./algorithms');
require('dotenv').config();


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
})

app.post('/processTileMap', (req, res) => {
    try {
        const { tileMap, dimW, dimH } = req.body;

        if (!Array.isArray(tileMap) || typeof dimW !== 'number' || typeof dimH !== 'number') {
            return res.status(400).json({ error: 'Invalid input format'});
        }

        findBestSprinklerSpots(tileMap, dimW, dimH);

        res.json({ tileMap })
    } catch (error) {
        console.error('Error processing tile map:', error);
        res.status(500).json({ error: 'Internal server error'});
    }
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));