import { getAllGames, searchGames, createGame, showDetail } from "./actions.js";
import axios from "axios";

export async function fetchGames ( dispatch, getState ){

	const {data}=await axios.get("http://localhost:3001/videogames");
	dispatch(getAllGames(data))

}
export function fetchGamesByName( query ){
	return async function(dispatch,getState){
	const {data} = await axios
	.get(`http://localhost:3001/videogames/name?search=${query}`)
		dispatch(searchGames(data))
	}
}
export function postGame(game){
	return async function(dispatch, getState){
		const {data} = await axios.post(`http://localhost:3001/videogames`,game)
		dispatch(createGame(data))
		}
}
export function getDetail(id){
	return async function(dispatch, getState){
        try{
		if(id){
        dispatch(showDetail({}))
		}else{
	const {data} = await axios.get(`http://localhost:3001/videogames/${id}`);
        dispatch(showDetail(data))
		}
        }catch(err){
        console.log(err.message)
        }
}
}
