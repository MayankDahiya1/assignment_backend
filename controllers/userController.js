/*
 * CONST ASSIGNMENT
 */
const User = require('../models/User');


/*
 * GET USER WITH PAGINATION
 */
exports.getUsers = async (req, res) => {
  // Try
  try {
    // Extracting query params
    const { page = 1, limit = 10 } = req.query;

    // Finding users with params
    const users = await User.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    // Count the number of response or object received
    const count = await User.countDocuments();

    // Sending details to frontend
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    // If error persists send an error response
    res.status(500).send('Server Error');
  }
};


/*
 * CREATE USER
 */
exports.createUser = async (req, res) => {
  // Extracting query params
  const { firstName, lastName, email, password, role } = req.body;
  // Try
  try {
    // Finding if user exists with same mail or not
    let user = await User.findOne({ email });

    // User found then send a message
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    // If not create an object with details
    user = new User({
      firstName,
      lastName,
      email,
      password,
      role
    });

    // Saving user with the details
    await user.save();
    res.json(user);
  } catch (err) {
    // If error persists then send error response
    res.status(500).send('Server Error');
  }
};

/*
 * UPDATING AN EXISTENCE USER WITH DETAILS
 */
exports.updateUser = async (req, res) => {
  // Extracting query params
  const { firstName, lastName, email, role } = req.body;
  try {
    // Try
    let user = await User.findOne({ email });

    // Checks if user exists or not
    user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = role;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

/*
 * DELETING AN USER
 */
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
