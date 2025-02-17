require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json()); 
app.use(cors()); 

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/voting-game';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Welcome to the Voting Game API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

app.get('/api/joke', async (req, res) => {
    try {
      const response = await fetch('https://www.freepublicapis.com/teehee-joke-api');
      if (!response.ok) {
        throw new Error('Failed to fetch joke from TeeHee API');
      }
      const data = await response.json();
  
      
      const joke = {
        id: data.id || Date.now().toString(), 
        question: data.setup || data.question || "No question provided",
        answer: data.punchline || data.answer || "No answer provided",
        votes: [
          { value: 0, label: "😂" },
          { value: 0, label: "👍" },
          { value: 0, label: "❤️" }
        ],
        availableVotes: ["😂", "👍", "❤️"]
      };
    
      res.json(joke);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch joke from TeeHee API' });
    }
  });
