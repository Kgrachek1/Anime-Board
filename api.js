var express = require('express');
var router = express.Router();


const ROOT_URL = 'https://api.jikan.moe/v4/';


router.get('/creators/new', async function(req, res, next) {
  const anime = req.query.anime;
  if (!anime) return res.render('new', { animeData: null });
  const animeData = await fetch(`${ROOT_URL}/anime/${anime}`)
    .then(res => res.json());
  animeData.anime = await fetch(animeData.search_url, options)
    .then(res => res.json());
  res.render('creators/new', { animeData });
  
});

module.exports = router;
