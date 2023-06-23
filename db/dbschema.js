const mongoose = require('mongoose');

const MySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model('MyImage', MySchema);

module.exports = Image;
