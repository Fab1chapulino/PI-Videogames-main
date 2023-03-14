import axios from "axios";

export default async function getGameById(id){
	try{
	const {data} = await axios.get(`http://localhost:3001/videogames/${id}`);
	return data;
	}catch(err){
	console.log(err.message)
	}
}
