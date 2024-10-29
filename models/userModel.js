const db = require('./dbConnection');
const bcrypt = require('bcrypt');

// Function to create a new user
const createUser = async (username, email, password, profilePicture) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with 10 salt rounds
    const sql = 'INSERT INTO users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(sql, [username, email, hashedPassword, profilePicture], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId); // Return the new user ID
        });
    });
};

// Function to get a user by email
const getUserByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); // Return the first user found
        });
    });
};

// Function to get a user by ID
const getUserById = async (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); // Return the user found
        });
    });
};

// Function to update a user's profile picture
const updateProfilePicture = async (id, profilePicture) => {
    const sql = 'UPDATE users SET profile_picture = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [profilePicture, id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows); // Return number of affected rows
        });
    });
};

// Function to get all users (for admin)
const getAllUsers = async () => {
    const sql = 'SELECT id, username, email, profile_picture FROM users';
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results); // Return all users
        });
    });
};

// Export the functions
module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateProfilePicture,
    getAllUsers,
};
