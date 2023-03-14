require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre } = require("../../../db");

const getGenres = async function( req, res ){
	try{
	await axios.get( `https://api.rawg.io/api/genres?key=${API_KEY}` )
	.then( genres => genres.data.results )
	.then(async ( genres ) => {
	const genresNames = genres.map( g => {
		return { name:g.name }; 
	});
	const already = await Genre.findAll();
	if(!already.length){
	const bulkGenres = await Genre.bulkCreate( genresNames );
	res.status(200).json( bulkGenres )
	}else{
	res.status(200).json( already )
	}
	})
	}catch(err){
	res.status(400).json(err.message);
	}
}

module.exports=getGenres;
