const getGames  = require("./videogames/getGames");
//const getGamesById = require("./videogames/getGamesById");
const postGames = require("./videogames/postGames");
//const getGamesByName = require("./videogames/getGamesByName")
const getGenres = require("./genres/getGenres");
const getNameId = require("./videogames/getNameId")

module.exports = {
	getGames,
	getNameId,
	postGames,
	getGenres
}
