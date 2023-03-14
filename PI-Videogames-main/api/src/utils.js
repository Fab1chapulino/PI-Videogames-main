const { Videogame, Genre } = require("./db");
const { Op }=require("sequelize");


const applySearch = async function( query ){
	let videogames_DB = [];


	videogames_DB = await Videogame.findAll({
		attributes:["id","name","image"],
		where:{
		name:query
		},
		include:{
		model:Genre,
		attributes:["name"],
		through:{
			attributes:[]
		  }
		},
		limit:15
	})

	if(videogames_DB.length)return videogames_DB.concat(true)

	let queriesArr = query.trim().split(' ').filter( e => e !== "");

	const secondResults=await Videogame.findAll({
		attributes: ["id", "name", "image"],
		where:{
		name:{
		[Op.or]:{
			[Op.startsWith]:queriesArr[0],
			[Op.endsWith]:queriesArr[queriesArr.length-1]
			}
		   }
		},
		include:{
		model:Genre,
		attributes:["name"],
		through:{
		   attributes:[]
		  }
		},
		limit:15
	})
	console.log(queriesArr[0])
	if(secondResults.length)return secondResults.concat(true)

	const thirdResults=await Videogame.findAll({
	attributes: ["id", "name", "image"],
                where:{
                name:{
                [Op.or]:{
                        [Op.startsWith]:queriesArr[0].slice(0,3),
                        [Op.substring]:queriesArr[queriesArr.length-1].slice(0,3)
                        }
                   }
		},
                include:{
                model:Genre,
                attributes:["name"],
                through:{
                   attributes:[]
                  }
                },
		limit:15
	})
	return thirdResults.concat(false);
}


module.exports = applySearch;
