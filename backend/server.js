const express = require('express');
const mongoose = require('mongoose');
const cors    = require('cors');
const { findBestSprinklerSpots } = require('./algorithms');
require('dotenv').config();


const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
})

app.post('/api/submitGrid/', (req, res) => {
    try {
        const tileMap = req.body.grid;
        const dimW = req.body.dimW || 3;
        const dimH = req.body.dimH || 3;
        
        if (!Array.isArray(tileMap) || !tileMap.length) {
            return res.status(400).json({ error: 'Invalid or missing grid'});
        }

        findBestSprinklerSpots(tileMap, dimW, dimH);

        res.json({ result: tileMap})
    } catch (e) {
        console.error(e);
        res.status(500).json({error: e.message});
    }
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));