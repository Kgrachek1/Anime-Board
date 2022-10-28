// Connect to the database
require('./config/database');

/*--- Require the app's Mongoose models ---*/
const Anime = require('./models/anime');
const Creator = require('./models/creator');

/*--- Define Variables to Hold Documents ---*/
let anime, animes;
let creator, creators;

/*--- Example ---*/

// console.log all movie documents
// Preview of promise syntax - coming SOON!
anime.find({}).then(console.log);

console.log('Time to CRUD!');