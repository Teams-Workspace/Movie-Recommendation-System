const bcrypt = require('bcryptjs');
const User = require('../models/User');


exports.updateProfile = async(req, res) =>{
  const {name, email, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id)
    if(!user){
     return res.status(404).json({ message: 'User not found' }); 
    }

    if(name) user.name = name;
    if(email && email !== user.email){
      const oldEmail = await User.findOne({email})
      if(oldEmail){
        return res.status(400).json({message:'Email alreay in use'})
      }
      user.email = email;
    }

    if(currentPassword && newPassword){
      const isMatch = await bcrypt.compare(currentPassword, user.password)
      if(!isMatch){
        return res.status(400).json({message: 'Current password is incorrect'})
      }
        user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
     res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}