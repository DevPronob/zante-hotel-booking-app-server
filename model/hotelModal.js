const mongoose = require('mongoose');

// Define the schema for your data
const roomSchema = new mongoose.Schema({
  name: String,
  description: String,
  roomServices: [String],
  price: String,
  maxGuests: {
    Adults: Number,
    Children: Number,
  },
  date: {
    startingDate: String,
    endDate: String,
  },
  images: [String],
});

// Create the Mongoose model
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;