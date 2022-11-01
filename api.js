var express = require('express');
var router = express.Router();
var api = require('./api.js')

const ROOT_URL = 'https://api.jikan.moe/v4/anime';

/* GET home page. */
router.get('/', async function(req, res, next) {
  const anime = req.query.anime;
  if (!anime) return res.render('new', { animeData: null });
  const animeData = await fetch(`${ROOT_URL}/anime/${anime}`)
    .then(res => res.json());
  animeData.anime = await fetch(animeData.ROOT_URL)
    .then(res => res.json());
  res.render('new', { animeData });
  // let animeData;
  // fetch(`${ROOT_URL}/users/${username}`, options)
  //   .then(res => res.json())
  //   .then(userInfo => {
  //     userData = userInfo;
  //     return fetch(userData.repos_url, options);
  //   })
  //   .then(res => res.json())
  //   .then(repos => {
  //     console.log(repos[0]);
  //     res.render('index', { userData });
  //   })
});

module.exports = router;
