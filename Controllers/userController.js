const User = require('../Models/userModel');
const generateToken = require('../config/token');

const regUser = async (req, res) => {
  // console.log("inside user con");
  const { name, email, password } = req.body;
  // console.log(req.body);
  
  try {
    // Validate if required fields are present
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Please provide all required fields' });
      return;
    }

    // Check if the user with the provided email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
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
  const {email , password} = req.body;
  const user = await User.findOne({email})
  // console.log(user);
  const pass = user.password
  // console.log(pass);
  if(pass == password){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
  })
  }else{
    res.status(401);
    throw new Error("invalid credentials")
  }

}

module.exports = { regUser, authUser };
