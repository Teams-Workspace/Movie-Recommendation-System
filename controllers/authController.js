const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/dbConnection');

// Function to check if admin credentials are valid
const isValidAdmin = (email, password) => {
    return (
        (email === process.env.ADMIN_EMAIL_SAAD && password === process.env.ADMIN_PASSWORD_SAAD) ||
        (email === process.env.ADMIN_EMAIL_ABRAR && password === process.env.ADMIN_PASSWORD_ABRAR) ||
        (email === process.env.ADMIN_EMAIL_HAROON && password === process.env.ADMIN_PASSWORD_HAROON)
    );
};

exports.getSignupPage = (req, res) => {
    res.render('signup');
};

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    let connection;
    try {
        connection = await pool.getConnection();

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
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).render('500');
    } finally {
        if (connection) connection.release();
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    let connection;
    try {
        connection = await pool.getConnection();
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
        const token = jwt.sign({ id: user.id, email: user.email, username: user.username, profile_picture: user.profile_picture }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });

        if (isValidAdmin(email, password)) {
            res.json({ redirect: `/admin/${user.id}?password=${password}` });  // Send redirect URL for admin
        } else {
            res.json({ redirect: '/' });  // Send redirect URL for regular users
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).render('500');
    } finally {
        if (connection) connection.release();
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');  // Clear the JWT token
    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session:', err);
            return res.status(500).render('505');
        }
        res.redirect('/');  // Redirect to the homepage
    });
};

exports.updateProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            console.error('No file uploaded'); // Debug log
            return res.status(400).send('No file uploaded.');
        }

        const userId = req.user.id; // Ensure req.user is available
        const profilePicturePath = `/uploads/profile_pics/${req.file.filename}`;

        let connection;
        try {
            connection = await pool.getConnection();
            await connection.query('UPDATE users SET profile_picture = ? WHERE id = ?', [profilePicturePath, userId]);
        } catch (err) {
            console.error('Error updating profile picture:', err);
            res.status(500).render('500');
        } finally {
            if (connection) connection.release();
        }

        // Update the req.user object directly if it's available.
        req.user.profile_picture = profilePicturePath;

        res.redirect('/'); // Redirect to the profile or home page
    } catch (err) {
        console.error('Error during profile picture update:', err);
        res.status(500).render('500');
    }
};
