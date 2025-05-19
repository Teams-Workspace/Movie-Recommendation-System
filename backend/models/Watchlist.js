const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  movieIds: [{ type: String, required: true }],
}, { timestamps: true });

// Ensure one watchlist document per user
watchlistSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);