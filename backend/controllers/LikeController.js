const Likes = require('../models/Likes');

// @desc Get liked movies of a user
exports.getLikes = async (req, res) => {
  try {
    const likes = await Likes.findOne({ user: req.user.id });
    res.status(200).json(likes || { user: req.user.id, movieIds: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Add a movie to likes (create if not exists)
exports.addLike = async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) return res.status(400).json({ message: 'Movie ID is required' });

  try {
    let likes = await Likes.findOne({ user: req.user.id });

    if (!likes) {
      likes = new Likes({ user: req.user.id, movieIds: [movieId] });
    } else if (!likes.movieIds.includes(movieId)) {
      likes.movieIds.push(movieId);
    }

    await likes.save();
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Remove a movie from likes
exports.removeLike = async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) return res.status(400).json({ message: 'Movie ID is required' });

  try {
    const likes = await Likes.findOne({ user: req.user.id });
    if (!likes) return res.status(404).json({ message: 'No liked movies found' });

    likes.movieIds = likes.movieIds.filter((id) => id.toString() !== movieId.toString());
    await likes.save();

    res.status(200).json(likes);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};
