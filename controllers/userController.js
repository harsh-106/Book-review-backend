import User from '../models/User.js';


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

export const createUser = async (req, res) => {
    try {
      const { name, email, bio } = req.body;
  
      const newUser = new User({ name, email, bio });
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create user', error });
    }
  };
  


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user', error });
  }
};

export const checkEmailExistence = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking email existence', error });
  }
};