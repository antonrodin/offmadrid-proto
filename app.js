require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./database/mysql');
const cors = require('cors');

// Settings
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.get('/', (req, res) => {
    res.send('Please use our awesome /api/locations endpoint');
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));

// Init Server
db.connect(() => {
    app.listen(PORT, () => {
        console.log(`The app is running at http://localhost:${PORT}`);
    });
})