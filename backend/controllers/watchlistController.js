const Watchlist = require('../models/Watchlist');

// @desc Get watchlist
exports.getWatchlist = async (req, res) => {
  try {
    const list = await Watchlist.findOne({ user: req.user.id });
    res.status(200).json(list || { user: req.user.id, movieIds: [] });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Add a movie to watchlist
exports.addToWatchlist = async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) return res.status(400).json({ message: 'Movie ID is required' });

  try {
    let list = await Watchlist.findOne({ user: req.user.id });

    if (!list) {
      list = new Watchlist({ user: req.user.id, movieIds: [movieId.toString()] });
    } else if (!list.movieIds.includes(movieId.toString())) {
      list.movieIds.push(movieId.toString());
    }

    await list.save();
    res.status(200).json(list);
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Remove a movie from watchlist
exports.removeFromWatchlist = async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) return res.status(400).json({ message: 'Movie ID is required' });

  try {
    const list = await Watchlist.findOne({ user: req.user.id });
    if (!list) return res.status(404).json({ message: 'No watchlist found' });

    list.movieIds = list.movieIds.filter((id) => id !== movieId.toString());
    await list.save();

    res.status(200).json(list);
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};