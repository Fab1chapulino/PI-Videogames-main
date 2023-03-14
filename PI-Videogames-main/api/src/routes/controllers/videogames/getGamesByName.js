require('dotenv').config();
const axios=require("axios");
const { API_KEY } = process.env;
const applySearch = require("../../../utils");
const getGames = require("./getGames")

const getGamesByName = async function(req,res){
	try{
	const { search } = req.query;

	//Fetching data from API
	await axios.get(`https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`)
	.then(videogames=>videogames.data.results)
	.then(async videogames=>{
	//We only need up to fifteen games
	let videogames_api=videogames.slice(0,15);


	//filtering data from api
		videogames_api=videogames_api.map( vg => {
		return {
		id:vg.id,
		name:vg.name,
		image:vg.background_image,
		genres:vg.genres.map( gen => gen.name)
		}
		})

	//fetching data from database

	let videogames_db = await applySearch( search );

	const boolean = videogames_db.pop();

		if(!videogames_db.concat(videogames_api).length){

		res.status(404).send("No Results Found");

		}else if(boolean){

		res.status(200).json(videogames_db.concat(videogames_api).slice(0,15))

		}else {

		res.status(200).json(videogames_api.concat(videogames_db).slice(0,15))
		}

	   })
	}catch(err){
	res.status(400).json({err:err.message});
	}
}

module.exports = getGamesByName;

