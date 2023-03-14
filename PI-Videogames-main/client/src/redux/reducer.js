const initialState={
	allVideogames:[],
	allVideogamesCopy:[],
	fifteenGames:[],
	detail:{}
}
 export default function rootReducer(state=initialState, action){
	switch(action.type){
	case "GET_ALL_GAMES":
	  return {
	  ...state,
	  allVideogames:action.payload,
	 allVideogamesCopy:action.payload
		}
	case "SHOW_PAGE":
	  return {
	  ...state,
	  fifteenGames:state.allVideogames.slice((action.payload-1)*15, action.payload*15),
		}
	case "SEARCH_GAMES":
	  return{
	 ...state,
	fifteenGames:[...action.payload]
	  }
	case "CREATE_GAME":
	return{
	...state,
	allVideogames:[action.payload, ...state.videogames]
	}
	case "SHOW_DETAIL":
	return {
	...state,
	detail:{...action.payload}
	}


	case "APPLY_FILTERS":
	const {genres, origin} = action.payload;

	if(genres.length){
	  let db_games=state.allVideogamesCopy.filter( game => typeof game.id==="string" );
          let api_games=state.allVideogamesCopy.filter( game => typeof game.id==="number" );

		genres.forEach(genre=>{
            api_games=api_games.filter( vg => vg.genres.includes(genre) )
          })

          genres.forEach(genre=>{
            db_games=db_games.filter( vg => vg.genres.map( name=>Object.values(name)[0] ).includes(genre))
          })

	   switch(origin){
		case "Created":
		 return {
		...state,
		allVideogames:db_games
		}
		case "Not Created":
		 return{
		 ...state,
		 allVideogames:api_games
		 }
		 default:
		  return{
		...state,
		allVideogames:db_games.concat(api_games)
		}
	   }
	}else{
	switch(origin){

                case "Created":
		  const created=state.allVideogamesCopy.filter( vg => typeof vg.id==="string");
                 return {
                ...state,
                allVideogames:created
                }

                case "Not Created":
		const notCreated = state.allVideogamesCopy.filter( vg => typeof vg.id==="number");
                 return{
		  ...state,
                 allVideogames:notCreated
                 }
                 default:
                  return{
                ...state,
                allVideogames:state.allVideogamesCopy
                }
	   }
	}
	case "ORDER":
	const { by, mode}=action.payload;

	if( by !== "Default" && mode !== "None"){
/*-------------------*/
	 if( by==="Rating" ){
	 return {
	  ...state,
	  allVideogames:[...state.allVideogames].sort(function(a,b){
	  	if( mode==="Ascend"){
/*100*/		  return a.rating-b.rating;
		}
		if( mode==="Descend"){
		return b.rating-a.rating;
		}
		return 0;
	    })
    	   }

	 }else if( by==="Alphabetically" ){

	   if( mode==="Ascend" ){
	    return {
	   ...state,
	   allVideogames:[...state.allVideogames].sort((a,b)=>{
		  if(a.name<b.name)return -1;
		  if(a.name>b.name)return 1;
		  return 0;
		})
	   }
	  }

	 if( mode==="Descend" ){
	   return {
	    ...state,
	    allVideogames:[...state.allVideogames].sort((a,b)=>{
                  if(a.name<b.name)return -1;
                  if(a.name>b.name)return 1;
                  return 0;
                  }).reverse()
		}
	    }

	  }
/*----------------------*/
	}else{
	return {
	  ...state,
	  allVideogames:[...state.allVideogamesCopy]
	 }
	}
	break;
	default:
	return state;
   }
}
