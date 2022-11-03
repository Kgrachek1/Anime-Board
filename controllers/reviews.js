const Anime = require('../models/anime');

module.exports = {
  create,
  delete: deleteReview,
  update
  
};

function deleteReview(req, res, next) {
 console.log(req.params.id)
  Anime.findOne({
    'reviews._id': req.params.id,
    'reviews.user': req.user._id
  }, function(err, anime) {
    console.log(anime)
    if (!anime) return res.redirect('/animes');
    console.log(anime)
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
    console.log(req.body)
    req.body.userName = req.user.name;
    anime.reviews.push(req.body)
    anime.save(function(err) {
      
      res.redirect(`/animes/${anime.apiId}`);
    });
  });
}
function update(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Anime.findOne({'reviews._id': req.params.id}, function(err, anime) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const animeUp = anime.reviews.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!animeUp.user.equals(req.user._id)) return res.redirect(`/anime/${anime.apiId}`);
    // Update the text of the comment
    animeUp.content = req.body.content;
    animeUp.rating = req.body.rating;
    // Save the updated book
    anime.save(function(err) {
      // Redirect back to the book's show view
      res.redirect(`/animes/${anime.apiId}`);
    });
  });
}