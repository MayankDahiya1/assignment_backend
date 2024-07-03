/*
 * CONST ASSIGNMENT
 */
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/*
 * REGISTER A NEW USER
 */
exports.register = async (req, res) => {
  // Const assignment
  const { firstName, lastName, email, password, role } = req.body;

  // Try
  try {
    // Let Assignment
    let user = await User.findOne({ email });

    // If user already exists then throw a message
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Else create a new user object
    user = new User({ firstName, lastName, email, password, role });

    // Saving user response
    await user.save();

    // Payload with user details
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // JWT SignIn to create a token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    // If error persists then console that error and send response accordingly
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


/*
 * LOGGED IN USER
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


/*
 * LOGOUT USER
 */
exports.logout = (req, res) => {
  res.status(200).send('User logged out');
};
