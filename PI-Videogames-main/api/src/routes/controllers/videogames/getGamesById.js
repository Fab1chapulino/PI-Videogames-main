require('dotenv').config();
const axios = require("axios");
const { Videogame,Genre } = require("../../../db.js");
const { API_KEY } = process.env;

const getGamesById = async function(req, res){
        try{
        const { id } = req.params;
	//Identifying the videogame's source(DB or Api)
        if( id.length<36){
	//Fetching Api data
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        .then(videogame=>videogame.data)
        .then( async (videogame) =>{
	//Getting the requited data
	const newGame = {
		id:videogame.id,
                name: videogame.name,
                description: videogame.description,
                platforms: videogame.platforms.map( p => p.platform.name ),
                image: videogame.background_image,
                release_date: videogame.released,
                rating: videogame.rating,
		genres:videogame.genres.map( gen => gen.name)
                }

        res.status(200).json(newGame);
        })
   }else if(id.length>=36){
	//Fetching DB data
        const videogame = await Videogame.findOne({
	where:{
		id:id
	},
	include:{
	model:Genre,
	through:{
		attributes:[]
	   }
	}
	})

        res.status(200).json(videogame);
   }else{
	res.status(404).send("Not found");
	}

        }catch(err){
        res.status(400).json({error:err.message})
        }
}

module.exports = getGamesById;
