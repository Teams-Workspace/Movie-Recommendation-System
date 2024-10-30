// controllers/adminController.js
const dbConnection = require('../models/dbConnection');

// Function to check if admin is valid
const isValidAdmin = (adminName, password) => {
    return (
        (adminName === process.env.ADMIN_NAME_SAAD && password === process.env.ADMIN_PASSWORD_SAAD) ||
        (adminName === process.env.ADMIN_NAME_ABRAR && password === process.env.ADMIN_PASSWORD_ABRAR ||
         adminName === process.env.ADMIN_NAME_HAROON && password === process.env.ADMIN_PASSWORD_HAROON    
        )
    );
};

exports.getAdminPanel = (req, res) => {
    const adminName = req.params.adminName;
    const password = req.query.password;

    // Check if the admin name and password are valid
    if (isValidAdmin(adminName, password)) {
        // Fetch user data from the database
        dbConnection.query('SELECT username, email, profile_picture FROM users', (err, users) => {
            if (err) {
                return res.status(500).send('Database query error');
            }
            // Render the admin panel with user data
            res.render('adminPanel', { adminName, users });
        });
    } else {
        // Redirect to index page if admin name or password is invalid
        res.redirect('/');
    }
};



