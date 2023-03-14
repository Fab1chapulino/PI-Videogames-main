import {useState, useEffect} from "react";
import validate from "../../extraLogic/forms/validations/CreateGame";
import {useDispatch} from "react-redux";
import {postGame} from "../../redux/thunkFunctions";

export default function Create(){
	const platforms = ["PC",
	"PlayStation 5","Xbox One",
	"PlayStation 4","Xbox Series S/X",
	"Nintendo Switch","iOS","Android","Nintendo 3DS","Nintendo DS","Nintendo DSi","macOS","Linux","Xbox 360","Xbox","PlayStation 3","PlayStation 2","PlayStation","PS Vita","PSP","Wii U","Wii","GameCube","Nintendo 64","Game Boy Advance","Game Boy Color","Game Boy","SNES","NES","Classic Macintosh","Apple II","Commodore / Amiga","Atari 7800","Atari 5200","Atari 2600","Atari Flashback","Atari 8-bit","Atari ST","Atari Lynx","Atari XEGS","Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast","3DO","Jaguar","Game Gear","Neo Geo"]




	const genres = [{"id":1,"name":"Action"},{"id":2,"name":"Indie"},{"id":3,"name":"Adventure"},{"id":4,"name":"RPG"},{"id":5,"name":"Strategy"},{"id":6,"name":"Shooter"},{"id":7,"name":"Casual"},{"id":8,"name":"Simulation"},{"id":9,"name":"Puzzle"},{"id":10,"name":"Arcade"},{"id":11,"name":"Platformer"},{"id":12,"name":"Racing"},{"id":13,"name":"Massively Multiplayer"},{"id":14,"name":"Sports"},{"id":15,"name":"Fighting"},{"id":16,"name":"Family"},{"id":17,"name":"Board Games"},{"id":18,"name":"Educational"},{"id":19,"name":"Card"}]

	
	//hooks
	const dispatch = useDispatch();
	//States
//gameData
	const [gameData, setGameData]=useState({
	name:"",
	description:"",
	platforms:[],
	image:"",
	release_date:"",
	rating:0,
	genres:[],
	})
//Errors	
	const [errors, setErrors]=useState({
	name:"",
        description:"",
        platforms:"",
        image:"",
        release_date:"",
        genres:""
	})
//Access
	const [submit, setSubmit] = useState(false)	
	
	useEffect(()=>{
		if( Object.values(errors).find(v=>v.length)){
		setSubmit(false);
		}else{
		setSubmit(true)
		}
	},[errors])

//handling submit
	function handleSubmit(e){
	e.preventDefault();
	setErrors(validate(gameData))
	submit && dispatch(postGame(gameData))
	}

 //Handling input
	function handleInputChange(e){
	console.log(Object.values(e.target)[0].id, "Este es el option")
	if(e.target.name==="platforms"){
		setGameData({
		...gameData,
		[e.target.name]:Object.values(e.target).filter(e=>e.selected).map(e=>e.value)
		})

	}else if(e.target.name === "genres"){
	setGameData({
                ...gameData,
                [e.target.name]:Object.values(e.target).filter(e=>e.selected).map(e=>e.id)
                })
	}else{
		setGameData({
		...gameData,
		[e.target.name]:e.target.value
		})
	}
		setErrors(validate({
		...gameData,
		[e.target.name]:e.target.value
		}))

	}

        return(
        <div>
	 <form onSubmit={(e)=>handleSubmit(e)}>

	{/*Name*/}

           <label for="Name">Name</label>
	   <input type="text" id="Name" name="name" onChange={(e)=>handleInputChange(e)}/>
	   <p>{errors.name && errors.name}</p>

    {/*Genres*/}

	   <label for="Genres">Genres</label>
	   	<select multiple id="Genre" name="genres" onChange={(e)=>handleInputChange(e)}>
		{genres.length &&
		  genres.map((g, i)=>{
		    return <option key={i} id={g.id} value={g.name}>{g.name}</option>
		  })
		}
		</select>
	<p>{errors.genres && errors.genres}</p>

    {/*date*/}

	   <label for="date"  >Released</label>
	   <input type="date" id="date" name="release_date" defaultValue={gameData.release_date} onChange={(e)=>handleInputChange(e)} />
	   <p>{errors.release_date && errors.release_date}</p>
		
    {/*platforms*/}

	   <label for="platforms" >platforms</label>
	   <select multiple id="platforms" name="platforms" onChange={(e)=>handleInputChange(e)}>
	       {platforms.length &&
                  platforms.map((p, i)=>{
                    return <option key={i} value={p}>{p}</option>
                  })
		}
                </select>
	<p>{errors.platforms && errors.platforms}</p>

	{/*rating*/}

           <label for="Rating"  >Rating</label>
           <input name="rating" id="Rating" type="range" min="0.0" step="0.5" max="5.0" defaultValue="0" onChange={(e)=>handleInputChange(e)}/>

   {/*image*/}

	   <label for="Image"  >image URL</label>
           <input type="file"  id="Image" name="image" onChange={(e)=>handleInputChange(e)}/>
	   <p>{errors.image && errors.image}</p>

{/*description*/}

	   <label for="description"  >description</label><br/>
	    <textarea id="description" name="description" rows="15" cols="35" onChange={(e)=>handleInputChange(e)}>
	</textarea>
	<p>{errors.description && errors.description}</p>

	<button type="submit">Create</button>
	 </form>
        </div>
        )
}
