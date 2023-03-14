import './App.css';
import LandingPage from "./components/LandingPage.jsx";
import Cards from "./components/Home/pages/Cards.jsx";
import SearchBar from "./components/Home/SearchBar.jsx";
import Slider from "./components/Home/pages/Slider.jsx";
import Options from "./components/Home/pages/Options.jsx";
import Nav from "./components/Nav.jsx";
import Detail from "./components/Detail.jsx";
import CreateGame from "./components/Forms/CreateGame.jsx";
import Loading from "./components/Loading"
import {Switch, Route, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {
	createPages,
	nextPage,
	prevPage,
	selectPage} from "./extraLogic";

import {showPage} from "./redux/actions.js"
import {fetchGamesByName} from "./redux/thunkFunctions";
import styles from "./css/Pages.module.css"

function App() {
	//hooks
	const dispatch = useDispatch();
	const allVideogames = useSelector(s=>s.allVideogames)
        const fifteenGames = useSelector(s=>s.fifteenGames)
	const location = useLocation();
	//states
	const [pages, setPages]=useState({
	nums:[],
	selected:1
	});
	const [searching, setSearching]=useState(false);

	//useEffects
	useEffect(()=>{
	console.log(allVideogames, "todos los juegos")
	setPages(createPages(allVideogames.length))
	dispatch(showPage(1))
	
	},[allVideogames])

	useEffect(()=>{
	dispatch(showPage(pages["selected"]))
	}, [pages["selected"]])

	//Some logix for pages
	const next=nextPage(pages, setPages);
	const prev=prevPage(pages, setPages);
	const select=selectPage(pages, setPages);


	//Some Logic for the SearchBar
	function onSearch(query){
        setSearching(true)
        dispatch(fetchGamesByName(query))
        	}
	
	function goHome(){
	dispatch( showPage(pages["selected"]) );
	setSearching(false);
	}


//Rendering
  return (
    <div className={location.pathname==="/home" && styles.App}>

	{location.pathname !== "/"?< Nav />:null}
	{location.pathname === "/home"
	?<SearchBar onSearch={onSearch} searching={searching} goHome={goHome}/>:null}
   <Switch>
	<Route exact path="/">
	   <LandingPage />
	</Route>

	<Route path="/home">
	{/*   <SearchBar onSearch={onSearch} searching={searching} goHome={goHome}/>*/}

	<div className={styles.Pages}>

	   {pages.nums.length && !searching
	?<Slider pages={pages} next={next} prev={prev} select={select}/>
	:null}


	<Options />

           {fifteenGames.length && 
		<Cards videogames={fifteenGames} searching={searching}/>}

	   {pages.nums.length && !searching
	?<Slider pages={pages} next={next} prev={prev} select={select}/>
	:null}
	</div>
        </Route>

	<Route path="/detail/:detailId">
           <Detail />
        </Route>

	<Route path="/create">
           <CreateGame />
        </Route>
  </Switch>
    </div>
  );
}

export default App;
