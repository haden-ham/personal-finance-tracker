// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes'); // Import the routes file

dotenv.config();

const app = express();
app.use(express.json()); // For parsing JSON bodies

// Use the routes from routes.js
app.use('/api', routes); // All routes in routes.js will be prefixed with '/api'

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
