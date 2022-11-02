const Anime = require('../models/anime');
const Creator = require('../models/creator');

module.exports = {
  index,
  show,
  new: newAnime,
  create
};

function index(req, res) {
  Anime.find({}, function(err, animes) {
    res.render('animes/index', { title: 'Anime Board', animes });
  });
}

function show(req, res) {
  Anime.findById(req.params.id)
    .populate('anime')
    .exec(function(err, anime) {
      Creator.find(
        {_id: {$nin: anime.cast}},
        function(err, creators) {
          console.log(creators);
          res.render('animes/creator', {
            title: 'Anime Detail',
            anime,
            creators
          });
        }
      );
    });
}

function newAnime(req, res) {
  res.render('creators/new', { title: 'Add an Anime' });
}

function create(req, res) {
  // Convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove leading/trailing spaces
  req.body.cast = req.body.cast.trim();
  // Split if it's not an empty string
  if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
  // Delete empty properties on req.body for defaults to happen 
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const anime = new Anime(req.body);
  anime.save(function(err) {
    if (err) return res.redirect('/animes/new');
    console.log(anime);
    res.redirect(`/animes/${anime._id}`);
  });
}
