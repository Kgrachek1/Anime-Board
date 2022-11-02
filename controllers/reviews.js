const Anime = require('../models/anime');

module.exports = {
  create,
  delete: deleteReview,
  
};

function deleteReview(req, res, next) {
 
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
    anime.save(function(err) {
      
      res.redirect(`/animes/${anime._id}`);
    });
  });
}