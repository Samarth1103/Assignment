const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  designation: { type: String, required: true },
  imageUrl: { type: String, required: true }, // URL to the stored image
});

module.exports = mongoose.model('Client', ClientSchema);