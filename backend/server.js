require('dotenv').config();

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize the app
const app = express();

// Use dotenv for environment variables (e.g., port)
dotenv.config();

// MongoDB connection
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mongodb.net/personal_finance?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error: ", err);
  });

// Middleware setup
app.use(cors());
app.use(express.json());

// Example of your routes setup
app.get('/', (req, res) => {
  res.send('Hello, your server is running');
});

// Set the server to listen on a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
