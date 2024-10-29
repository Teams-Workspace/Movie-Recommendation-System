// app.js
const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const app = express();
const path = require('path');
require('dotenv').config;
const app = express();
const port = 3000;

// Middleware to serve static files (like CSS)
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: process.env.SESSION_SECRET, // Change this to a secure key
    resave: false,
    saveUninitialized: true,
}));


// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Route imports
const adminRoutes = require('./routes/adminRoutes');

// Routes
app.use('/admin', adminRoutes);
app.use('/', userRoutes); // '/user/upload-profile-pic' route
// Route for the index page
app.get('/', (req, res) => {
    res.render('index'); // Render your index.ejs page
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});
