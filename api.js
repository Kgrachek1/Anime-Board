const base_url = "https://api.jikan.moe/v4/anime";


function searchAnime(req, res){



    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    
}
module.exports = Creator;