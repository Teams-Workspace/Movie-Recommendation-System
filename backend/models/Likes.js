const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  movieIds: [{ 
    type: String, 
    required: true 
  }],
},
{ timestamps: true });

module.exports = mongoose.model('Likes', likesSchema);
