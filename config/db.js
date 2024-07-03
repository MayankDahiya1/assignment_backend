/*
 * CONST ASSIGNMENT
 */
const mongoose = require('mongoose');

/*
 * CONST ASSIGNMENT
 */
const connectDB = async () => {
  // Try
  try {
    // Connecting with mongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Consoling if mongoDB connected
    console.log('MongoDB connected');
    // Catch error
  } catch (err) {
    // If error console that
    console.error(err.message);
    process.exit(1);
  }
};

/*
 * EXPORT
 */
module.exports = connectDB;
