export function getAllGames( videogames ){
	return {
	type:"GET_ALL_GAMES",
	payload: videogames
	}
}

export function searchGames(results){
	return{
	type:"SEARCH_GAMES",
	payload:results
	}
}
export function createGame(data){
	return {
	type:"CRETAE_GAME",
	payload:data
	}
}
export function showPage(page){
	return {
	type:"SHOW_PAGE",
	payload:page
	}
}
export function showDetail(details){
	return {
	type:"SHOW_DETAIL",
	payload:details
	}
}
export function applyFilters(filters){
	return {
	type:"APPLY_FILTERS",
	payload:filters
	}
}
export function orders(order){
	return{
	type:"ORDER",
	payload:order
	}
}
