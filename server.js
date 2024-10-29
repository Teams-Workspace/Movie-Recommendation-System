// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to serve static files (like CSS)
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Route imports
const adminRoutes = require('./routes/adminRoutes');

// Routes
app.use('/admin', adminRoutes);

// Route for the index page
app.get('/', (req, res) => {
    res.render('index'); // Render your index.ejs page
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
