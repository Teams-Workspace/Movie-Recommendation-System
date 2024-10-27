const express = require('express');
const dbConnection = require('./models/dbConnection'); // Import your database connection
const app = express();
const port = 3000;

// Middleware to serve static files (like CSS)
app.use(express.static('public')); // Adjust the path according to your structure

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Admin route
app.get('/admin/:adminName', (req, res) => {
    const adminName = req.params.adminName;
    const validAdmins = ['saad', 'abrar']; // List of valid admin names

    // Check if the admin name is valid
    if (validAdmins.includes(adminName)) {
        // Fetch user data from the database
        dbConnection.query('SELECT username, email, profile_picture FROM users', (err, users) => {
            if (err) {
                return res.status(500).send('Database query error');
            }
            // Render the admin panel with user data
            res.render('adminPanel', { adminName, users });
        });
    } else {
        // Redirect to index page if admin name is invalid
        res.redirect('/');
    }
});

// Route for the index page
app.get('/', (req, res) => {
    res.render('index'); // Render your index.ejs page here
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
