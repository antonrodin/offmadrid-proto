const express = require('express');

// Settings
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/locations', require('./routes/locations'));

// Init Server
app.listen(PORT, () => {
    console.log(`The app is running at http://localhost:${PORT}`);
});