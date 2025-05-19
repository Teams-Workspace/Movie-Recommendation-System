require('dotenv').config()
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Watchlist = require('../models/Watchlist');
const Likes = require('../models/Likes');
const router = express.Router();

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate random 8-character password (mixed alphanumeric)
const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Email template function
const generateEmailTemplate = (value, type) => {
  const isVerification = type === 'verify';
  const isPasswordReset = type === 'reset';
  const subject = isVerification ? 'Verify Your Email' : 'Your New Password';
  const title = isVerification ? 'Email Verification' : 'New Password Generated';
  const message = isVerification
    ? 'Please use the OTP below to verify your email address.'
    : 'Your password has been reset. Use the new password below to log in.';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #121212; color: #F5F5F5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #121212;">
    <!-- Header -->
    <tr>
    <td style="padding: 20px 0; text-align: center; background-color: #E50914;">
    <img
          src="http://localhost:5000/public/Logo.png"
          alt="Movie Recommendation System Logo"
          style="max-width: 200px; height: auto; display: block; margin: 0 auto;"
            >
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding: 40px 20px; text-align: center;">
            <h1 style="font-size: 24px; font-weight: bold; color: #F5F5F5; margin: 0 0 20px;">
              ${title}
            </h1>
            <p style="font-size: 16px; color: #F5F5F5; margin: 0 0 20px;">
              ${message}
            </p>
            <div style="display: inline-block; padding: 15px 30px; background-color: #E50914; color: #F5F5F5; font-size: 32px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
              ${value}
            </div>
            <p style="font-size: 14px; color: #4B4B4B; margin: 0 0 20px;">
              ${isVerification ? 'This OTP expires in 10 minutes.' : 'Please change your password after logging in.'}
            </p>
            <a
              href="http://localhost:5173/${isVerification ? 'otp' : 'login'}"
              style="display: inline-block; padding: 12px 24px; background-color: #E50914; color: #F5F5F5; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 8px;"
            >
              ${isVerification ? 'Verify Now' : 'Log In Now'}
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #1A1A1A;">
            <p style="font-size: 12px; color: #4B4B4B; margin: 0;">
              © 2025 Movie Recommendation System. All rights reserved.
            </p>
            <p style="font-size: 12px; color: #4B4B4B; margin: 10px 0 0;">
              Need help? Contact us at <a href="mailto:support@mrs.com" style="color: #E50914; text-decoration: none;">support@mrs.com</a>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, email, password });
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP email
    await transporter.sendMail({
      to: email,
      subject: 'Verify Your Email',
      html: generateEmailTemplate(otp, 'verify'),
    });

    res.status(201).json({ message: 'User created. OTP sent to email.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.isVerified) return res.status(400).json({ message: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Generate random password
    const newPassword = generateRandomPassword();
    user.password = newPassword; // Will be hashed by pre-save hook
    await user.save();

    // Send new password email
    await transporter.sendMail({
      to: email,
      subject: 'Your New Password',
      html: generateEmailTemplate(newPassword, 'reset'),
    });

    res.status(200).json({ message: 'New password sent to email.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.resetPasswordToken !== otp || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Add to Watchlist
router.post('/watchlist', authenticate, async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ message: 'Movie ID required' });

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const watchlist = await Watchlist.findOne({ user: req.userId });
    if (watchlist && watchlist.movieIds.includes(movieId)) {
      return res.status(200).json({ message: 'Already in watchlist' });
    }

    const updatedWatchlist = await Watchlist.findOneAndUpdate(
      { user: req.userId },
      { $addToSet: { movieIds: movieId } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Movie added to watchlist' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Watchlist
router.get('/watchlist', authenticate, async (req, res) => {
  try {
    const watchlist = await Watchlist.findOne({ user: req.userId }).select('movieIds');
    res.status(200).json(watchlist ? watchlist.movieIds : []);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from Watchlist
router.delete('/watchlist', authenticate, async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ message: 'Movie ID required' });

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const watchlist = await Watchlist.findOne({ user: req.userId });
    if (!watchlist || !watchlist.movieIds.includes(movieId)) {
      return res.status(400).json({ message: 'Movie not in watchlist' });
    }

    await Watchlist.findOneAndUpdate(
      { user: req.userId },
      { $pull: { movieIds: movieId } },
      { new: true }
    );

    res.status(200).json({ message: 'Movie removed from watchlist' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Add to Likes
router.post('/likes', authenticate, async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ message: 'Movie ID required' });

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if movieId already exists in user's likes
    const likelist = await Likes.findOne({ user: req.userId });
    if (likelist && likelist.movieIds.includes(movieId)) {
      return res.status(200).json({ message: 'Already liked' });
    }

    const updatedlike = await Likes.findOneAndUpdate(
      { user: req.userId },
      { $addToSet: { movieIds: movieId } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Added to likes' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Likes
router.get('/likes', authenticate, async (req, res) => {
  try {
    const likes = await Likes.findOne({ user: req.userId }).select('movieIds');
    res.status(200).json({ likes: likes ? likes.movieIds : [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete from Likes
router.delete('/likes', authenticate, async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ message: 'Movie ID required' });

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const likelist = await Likes.findOne({ user: req.userId });
    if (!likelist || !likelist.movieIds.includes(movieId)) {
      return res.status(400).json({ message: 'Movie not in likes' });
    }

    await Likes.findOneAndUpdate(
      { user: req.userId },
      { $pull: { movieIds: movieId } },
      { new: true }
    );

    res.status(200).json({ message: 'Movie removed from likes' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Profile
router.put('/update-profile', authenticate, async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update name and email
    if (name) user.name = name;
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already in use' });
      user.email = email;
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
      user.password = newPassword;
    }

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('name email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;