const express = require('express');
const path = require('path');
const db = require('./database/mysql');

// Settings
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/locations', require('./routes/locations'));

// Init Server
db.connect(() => {
    app.listen(PORT, () => {
        console.log(`The app is running at http://localhost:${PORT}`);
    });
})