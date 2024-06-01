const User = require('../Models/userModel');
const generateToken = require('../config/token');

const regUser = async (req, res) => {
  // console.log("inside user con");
  const { name, email, password } = req.body;
  // console.log(req.body);
  
  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Respond with user details and a token on successful registration
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if (user) {
      const pass = user.password;
      if (pass === password) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error during user authentication:', error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { regUser, authUser };
