const initializeConnection = require('../models/dbConnection');

// Function to check if admin credentials are valid
const isValidAdmin = (email, password) => {
    return (
        (email === process.env.ADMIN_EMAIL_SAAD && password === process.env.ADMIN_PASSWORD_SAAD) ||
        (email === process.env.ADMIN_EMAIL_ABRAR && password === process.env.ADMIN_PASSWORD_ABRAR) ||
        (email === process.env.ADMIN_EMAIL_HAROON && password === process.env.ADMIN_PASSWORD_HAROON)
    );
};

exports.getAdminPanel = async (req, res) => {
    const email = req.user.email;
    const password = req.query.password; // Assuming the password is passed in the query

    if (isValidAdmin(email, password)) {
        try {
            const connection = await initializeConnection();
            const [users] = await connection.query('SELECT username, email, profile_picture FROM users');
            // Pass the admin email as adminName
            res.render('adminPanel', { adminName: email, users });
            await connection.end();
        } catch (err) {
            // console.error('Database query error:', err);
            res.status(500).render('505');
        }
    } else {
        res.redirect('/');
    }
};
