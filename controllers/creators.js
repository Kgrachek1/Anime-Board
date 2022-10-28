const Creator = require('../models/creator');
const Anime = require('../models/anime');

module.exports = {
  new: newCreator,
  create,
  addToCast
};

function addToCast(req, res) {
  Anime.findById(req.params.id, function(err, anime) {
    anime.cast.push(req.body.creatorId);
    anime.save(function(err) {
      res.redirect(`/animes/${anime._id}`);
    });
  });
}

function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  // Fix by either reformatting to "MM-DD-YYYY" or by 
  // appending a "time" fragment like this... 
  req.body.created += 'T00:00';
  Creator.create(req.body, function (err, creators) {
    res.redirect('/creators/new');
  });
}

function newCreator(req, res) {
  Creator.find({})
    //Sort performers by their name
    .sort('name')
    .exec(function (err, creators) {
      res.render('creators/new', {
        title: 'Add Anime',
        creators
      });
    });
}