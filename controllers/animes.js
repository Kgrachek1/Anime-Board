
const fetch = require('node-fetch')
const Anime = require('../models/anime');
const Creator = require('../models/creator');

module.exports = {
  index,
  show,
  new: newAnime,
  create,
  getAnime
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
    
    res.redirect(`/animes/${anime._id}`);
  });
}

const ROOT_URL = 'https://api.jikan.moe/v4/anime';

//const ROOT_URL = 'https://jikan1.p.rapidapi.com/anime/16498/episodes';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'
  
}
}

async function getAnime(req, res) {
  const animeData = await fetch(`${ROOT_URL}?q=${req.query.anime}`)
    .then(res => res.json())
    .then(data => data.data)
  Anime.find({}, function(err, animes){
      const anime = formatanimeData(animeData)
      console.log(anime)
      anime.forEach(a =>{
        const newAnime = new Anime(a)
        newAnime.save(function(err){
          
        })
      })
      res.render('creators/new', { anime })
      
    })
    
}
	//.then(json => console.log(json))
	//.catch(err => console.error('error:' + err))

//router.get('/', async function(req, res, next) {
 // const anime = req.query.anime;
  //if (!anime) return res.render('creators/new', { animeData: null });
  //const animeData = await fetch(`${ROOT_URL}/anime=${anime}`)
   // .then(res => res.json());
  //animeData.anime = await fetch(animeData.html_url)
   // .then(res => res.json());
  //res.render('creators/new', { animeData });
  
//});
function formatanimeData(animeData) {
  return animeData.map(a =>({
    title: a.title,
    apiId: a.mal_id,
    animeDes: a.synopsis,
    animeImg: a.images.jpg.image_url,
    releaseYear: a.aired.string,
    nowShowing: a.airing
  }))
}


