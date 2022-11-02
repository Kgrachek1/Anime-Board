var express = require('express');
const { Query } = require('mongoose');
var router = express.Router();
const fetch = require('node-fetch')

const ROOT_URL = 'https://api.jikan.moe/v4';


const url = 'https://jikan1.p.rapidapi.com/anime/16498/episodes';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'
  }
};

fetch(url, options)
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.error('error:' + err));

//router.get('/', async function(req, res, next) {
 // const anime = req.query.anime;
//  if (!anime) return res.render('creators/new', { animeData: null });
 // const animeData = await fetch(`${ROOT_URL}${anime}`)
  //  .then(res => res.json());
  //animeData.anime = await fetch(animeData.html_url)
  //  .then(res => res.json());
  //res.render('creators/new', { animeData });
  
//});

module.exports = router;
