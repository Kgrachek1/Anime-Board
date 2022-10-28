const Anime = require('../models/anime');

module.exports = {
  create,
  delete: deleteReview
};

function deleteReview(req, res, next) {
  // Note the cool "dot" syntax to query for a movie with a
  // review nested within an array
  Anime.findOne({
    'reviews._id': req.params.id,
    'reviews.user': req.user._id
  }).then(function(anime) {
    if (!anime) return res.redirect('/animes');
    anime.reviews.remove(req.params.id);
    anime.save().then(function() {
      res.redirect(`/animes/${anime._id}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}

function create(req, res) {
  Anime.findById(req.params.id, function(err, anime) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    
    // We push an object with the data for the
    // review subdoc into Mongoose arrays
    anime.reviews.push(req.body);
    anime.save(function(err) {
      // Step 5: Respond with a redirect because we've mutated data
      res.redirect(`/animes/${anime._id}`);
    });
  });
}