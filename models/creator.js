const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  posted: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Creator', creatorSchema);