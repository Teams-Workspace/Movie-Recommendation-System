const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const initializeConnection = require('../models/dbConnection');


// controllers/authController.js
exports.getSignupPage = (req, res) => {
    res.render('signup');
};

exports.getLoginPage = (req, res) => {
    res.render('login');
};


exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const connection = await initializeConnection();

        // Check if the email already exists
        const [existingUsers] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        const newUser = { id: result.insertId, username, email };

        // Generate a token
        const token = jwt.sign(newUser, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the cookie
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/'); // Redirect to index page after successful signup
        await connection.end();
    } catch (err) {
        // console.error('Error during signup:', err);
        res.status(500).render('500');
    }
};



// Function to check if admin credentials are valid
const isValidAdmin = (email, password) => {
    return (
        (email === process.env.ADMIN_EMAIL_SAAD && password === process.env.ADMIN_PASSWORD_SAAD) ||
        (email === process.env.ADMIN_EMAIL_ABRAR && password === process.env.ADMIN_PASSWORD_ABRAR) ||
        (email === process.env.ADMIN_EMAIL_HAROON && password === process.env.ADMIN_PASSWORD_HAROON)
    );
};

// controllers/authController.js
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const connection = await initializeConnection();
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Include username in the token
        const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log('Generated Token:', token);

        res.cookie('token', token, { httpOnly: true });

        if (isValidAdmin(email, password)) {
            res.json({ redirect: `/admin/${user.id}?password=${password}` });  // Send redirect URL for admin
        } else {
            res.json({ redirect: '/' });  // Send redirect URL for regular users
        }

        await connection.end();
    } catch (err) {
        // console.error('Error during login:', err);
        res.status(500).render('500');
        // res.status(500).json({ error: 'Internal Server Error' });
    }
};




// controllers/authController.js
exports.logout = (req, res) => {
    res.clearCookie('token');  // Clear the JWT token
    req.session.destroy((err) => {
        if (err) {
            // console.error('Failed to destroy session:', err);
            return res.status(500).render('505');
        }
        else
        {
            // console.log('User logged out successfully');
        }
        res.redirect('/');  // Redirect to the homepage
    });
};
exports.uploadProfilePic = async (req, res) => {
    // console.log('Request received:', req.file);

    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const profilePicPath = `/uploads/profile_pics/${req.file.filename}`;
    const userId = req.user ? req.user.id : null;
    // console.log('Profile Pic Path:', profilePicPath);
    // console.log('User ID:', userId);

    if (!userId) {
        return res.status(400).send('User not authenticated');
    }

    try {
        const connection = await initializeConnection();
        // console.log('Connected to the database');

        const [result] = await connection.query('UPDATE users SET profile_picture = ? WHERE id = ?', [profilePicPath, userId]);
        // console.log('Database update result:', result);

        await connection.end();
        res.redirect('/');
    } catch (err) {
        // console.error('Error updating profile picture:', err);
        res.status(500).render('505');
    }
};
