const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const animeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  apiId:{
    type: Number,
  },
  animeDes: {
    type: String,
  },
  animeImg:{
    type: String,
  },
 
  releaseYear: {
    type: String, 
    },
    

  
  nowShowing: {
    type: Boolean,
    default: false
  },
  reviews: [reviewSchema]
}, {
  timestamps: true
});



module.exports = mongoose.model('Anime', animeSchema);