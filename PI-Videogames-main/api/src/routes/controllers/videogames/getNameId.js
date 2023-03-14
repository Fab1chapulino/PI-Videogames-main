const getGamesByName = require("./getGamesByName");
const getGamesById = require("./getGamesById");

const getNameId = function(req,res){
	const {search} = req.query;
	search?
	getGamesByName(req, res)
	:getGamesById(req, res)
}
module.exports=getNameId
