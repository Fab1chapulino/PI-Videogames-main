require('dotenv').config();
const axios = require("axios");
const { Videogame, game_genre, Genre } = require("../../../db.js")
const { API_KEY } = process.env;


const getGames = async function( req, res ){
	try{
	let i = 1;
	let vGamesApi = [];
	//fetching Api data
	while( i <= 5){
	const apiData = await axios.get( `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);

	vGamesApi.push( apiData );
	i+=1;
	 }
	//mapping the fetched data 
	await Promise.all( vGamesApi ).then(async (pages) => {
	 const results = pages.map( page => page.data.results.map( game => {
		return {
		id:game.id,
		name:game.name,
		image:game.background_image,
		genres:game.genres.map(gen=>gen.name),
		rating:game.rating
		}
		}))
	
	let videogames = [];
	results.forEach( array => videogames=videogames.concat(array))
	//fetching data from database and then joining it with the Api data
	let videogames_DB = await Videogame.findAll({
	attributes:["id","name", "image", "rating"],
	include:{
	model:Genre,
	attributes:["name"],
	through:{
		attributes:[]
		}
	   }
	})
	videogames_DB.reverse();
	res.status(200).json(videogames_DB.concat(videogames))
	})
	}catch(err){
	res.status(400).json({err:err.message})
	}
}

module.exports=getGames;
