// pond.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const pondSchema = new Schema({
  pondId: {
    type: String,
    required: true,
    unique: true
  },
  i1: {
    type: Number, // Changed to Number to store currents
    required: true
  },
  i2: {
    type: Number, // Changed to Number to store currents
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a pre-save hook to update the updatedAt field
pondSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
const Pond = mongoose.model('ponds', pondSchema);

module.exports = Pond;
