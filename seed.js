require('dotenv').config();
require('./config/database');

const Anime = require('./models/anime');
const Creator = require('./models/creator');

// For better organization, the seed data is being stored in a separate data.js module
const data = require('./data');

const p1 = Anime.deleteMany({});
const p2 = Creator.deleteMany({});

Promise.all([p1, p2])
  .then(function(results) {
    // results will be an array
    // of two result objects
    console.log(results);
    return Creator.create(data.creators);
  })
  .then(function(creators) {
    console.log(creators);
    return Anime.create(data.animes);
  })
  .then(function(animes) {
    console.log(animes);
    return Promise.all([
      Creator.findOne({name: 'Naruto Uzumaki'}),
      Anime.findOne({title: /Naruto Shippuden/})
    ]);
  })
  .then(function(results) {
    const naruto = results[0];
    const narutoShip = results[1];
    narutoShip.cast.push(naruto._id);
    return naruto.Ship.save();
  })
  .then(function(narutoShip) {
    console.log(narutoShip);
  })
  .then(process.exit);