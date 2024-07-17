const express = require('express');
const mongoose = require('mongoose');
const Pond = require('./models/pond.model'); // Import the Pond model
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection URI
const uri = "mongodb+srv://vysu:passwordvysu@cluster0.7iapxsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the AMS');
});

// Route to create a new pond
app.post('/ponds', async (req, res) => {
  try {
    const { pondId, i1, i2 } = req.body;
    const newPond = new Pond({ pondId, i1, i2 });
    await newPond.save();
    res.status(201).json(newPond);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Other routes here...

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
