const User = require('../Models/userModel');


const addToFav = async (req, res) => {
    try {
      const { userId, subject } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.favorites.push(subject);
      await user.save();
      res.status(200).json({ message: 'Subject added to favorites successfully' });
    } catch (error) {
      console.error('Error adding subject to favorites:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const removeFromFav = async (req, res) => {
    console.log("remove fav");
    try {
      const { userId, subjectId } = req.query;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const subjectIndex = user.favorites.findIndex(
        (favorite) => favorite._id.toString() === subjectId
      );
      if (subjectIndex === -1) {
        return res.status(404).json({ error: 'Subject not found in favorites' });
      }
      user.favorites.splice(subjectIndex, 1);
      await user.save();
      res.status(200).json({ message: 'Subject removed from favorites successfully' });
    } catch (error) {
      console.error('Error removing subject from favorites:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
const getAllFav = async (req, res) => {
    try {
      const { userId } = req.query;
      const user = await User.findById(userId).populate('favorites');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user.favorites);
    } catch (error) {
      console.error('Error getting user favorites:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


module.exports = {addToFav, removeFromFav, getAllFav}