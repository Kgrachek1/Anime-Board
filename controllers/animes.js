const fetch = require('node-fetch')
const Anime = require('../models/anime');
const Creator = require('../models/creator');

module.exports = {
    index,
    show,
    new: newAnime,
    getAnime
};

function index(req, res) {
    Anime.find({}, function (err, animes) {
        res.render('animes/index', {
            title: 'Anime Board',
            animes
        });
    });
}

function show(req, res) {
    Anime.findOne({
        apiId: req.params.id
    }, function (err, an) {


        res.render('animes/show', {
            title:'Anime',
            an

        });
     
    })
}

function newAnime(req, res) {
    res.render('animes/new', {title: 'Add an Anime'});
}

//function create(req, res) { 
    //req.body.nowShowing = !! req.body.nowShowing;
    // Remove leading/trailing spaces
   // req.body.cast = req.body.cast.trim();
    // Split if it's not an empty string
   // if (req.body.cast) 
      //  req.body.cast = req.body.cast.split(/\s*,\s*/);
    //for (let key in req.body) {
    //    if (req.body[key] === '') 
      //      delete req.body[key];
        
    //}
    // const anime = new Anime(req.body);
    // anime.save(function (err) {
    //     if (err) 
    //         return res.redirect('/animes/new');
        
    //     res.redirect(`/animes/${
    //         anime._id
    //     }`);
    // });


const ROOT_URL = 'https://api.jikan.moe/v4/anime';


async function getAnime(req, res) {
    const animeData = await fetch(`${ROOT_URL}?q=${
        req.query.anime
    }`).then(res => res.json())
    .then(data => data.data)
    const anime = formatanimeData(animeData)
    console.log(anime)
    Anime.find({}, function (err, animes) {
        anime.forEach(a => {
            let ani = Anime.findOne({apiId: a.anime})
            if (!ani) {
                const newAnime = new Anime(a)
                newAnime.save(function (err) {})


            }
        })
        res.render('animes/new', {anime})
    })
}

function formatanimeData(animeData) {
    return animeData.map(a => ({
        title: a.title,
        apiId: a.mal_id,
        animeDes: a.synopsis,
        animeImg: a.images.jpg.image_url,
        releaseYear: a.aired.string,
        nowShowing: a.airing
    }))
}
