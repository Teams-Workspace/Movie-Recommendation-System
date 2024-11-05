const pool = require('../models/dbConnection');

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
    const password = req.query.password;

    if (isValidAdmin(email, password)) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [users] = await connection.query('SELECT username, email, profile_picture FROM users');
            res.render('adminPanel', { adminName: email, users });
        } catch (err) {
            console.error('Database query error:', err);
            res.status(500).render('500');
        } finally {
            if (connection) connection.release();
        }
    } else {
        res.redirect('/');
    }
};
