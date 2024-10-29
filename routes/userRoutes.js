const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // Middleware for file uploads
const db = require('../models/dbConnection');
// Your database connection

// POST route to upload the profile picture
router.post('/upload-profile-pic', upload.single('profile_picture'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded or invalid file format' });
    }

    const userId = req.session.userId; // Assuming you're using session to track the logged-in user
    const profilePicPath = `/uploads/profile_pics/${req.file.filename}`;

    // Update the user's profile picture in the database
    const sql = `UPDATE users SET profile_picture = ? WHERE id = ?`;
    db.query(sql, [profilePicPath, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error while updating profile picture' });
        }
        res.json({ message: 'Profile picture updated successfully', profilePicPath });
    });
});

module.exports = router;
