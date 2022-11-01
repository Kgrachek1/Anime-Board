var express = require('express');
var router = express.Router();
const ROOT_URL = 'https://api.jikan.moe/v4';


/* GET home page. */
router.get('/', async function(req, res, next) {
  const anime = req.query.anime;
  if (!anime) return res.render('index', { animeData: null });
  const animeData = await fetch(`${ROOT_URL}/users/${anime}`)
    .then(res => res.json());
  animeData.search = await fetch(animeData.search_url)
    .then(res => res.json());
  res.render('index', { animeData });
});



module.exports = router;
