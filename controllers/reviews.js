const Anime = require('../models/anime');

module.exports = {
  create,
  delete: deleteReview,
  update
  
};

function deleteReview(req, res, next) {
  Anime.findOne({
    'reviews._id': req.params.id,
    'reviews.user': req.user._id
  }, function(err, anime) {
    if (!anime) return res.redirect('/animes');
    anime.reviews.remove(req.params.id);
    anime.save().then(function() {
      res.redirect(`/animes/${anime.apiId}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}

function create(req, res) {
  Anime.findOne({_id:req.params.id}, function(err, anime) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    anime.reviews.push(req.body)
    anime.save(function(err) {
      
      res.redirect(`/animes/${anime.apiId}`);
    });
  });
}
function update(req, res) {
  Anime.findOne({'reviews._id': req.params.id}, function(err, anime) {
    const animeUp = anime.reviews.id(req.params.id);
    if (!animeUp.user.equals(req.user._id)) return res.redirect(`/anime/${anime.apiId}`);
    animeUp.content = req.body.content;
    animeUp.rating = req.body.rating;
    anime.save(function(err) {
      res.redirect(`/animes/${anime.apiId}`);
    });
  });
}