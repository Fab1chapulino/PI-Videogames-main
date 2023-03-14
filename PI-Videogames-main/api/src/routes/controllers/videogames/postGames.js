const { Videogame } = require("../../../db");

const postGames = async function( req, res){
	try{
	const { name, 
		description, 
		platforms, 
		image, 
		release_date, 
		rating, 
		genres } = req.body;
	let newGame = await Videogame.create({
		name,
                description,
                platforms,
                image,
                release_date,
                rating});
	await newGame.addGenres(genres);
	res.status(200).json(newGame);
	}catch(err){
	res.status(400).json({err:err.message})
	}
}
module.exports = postGames;
