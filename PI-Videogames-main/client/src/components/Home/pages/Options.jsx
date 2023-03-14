import {useDispatch} from 'react-redux';
import {applyFilters, orders} from "../../../redux/actions";
import {useState, useEffect} from "react";
import styles from "../../../css/Options.module.css"

export default function Options(){
	const dispatch = useDispatch();
	//Filter state
	const [filters, setFilters]=useState({	
	genres:[],
	origin:"Show All"
	})

	//Order State
	const [order, setOrder]=useState({
	by:"Default",
	mode:"None"	
	})

	const allGenres = [{"id":1,"name":"Action"},{"id":2,"name":"Indie"},{"id":3,"name":"Adventure"},{"id":4,"name":"RPG"},{"id":5,"name":"Strategy"},{"id":6,"name":"Shooter"},{"id":7,"name":"Casual"},{"id":8,"name":"Simulation"},{"id":9,"name":"Puzzle"},{"id":10,"name":"Arcade"},{"id":11,"name":"Platformer"},{"id":12,"name":"Racing"},{"id":13,"name":"Massively Multiplayer"},{"id":14,"name":"Sports"},{"id":15,"name":"Fighting"},{"id":16,"name":"Family"},{"id":17,"name":"Board Games"},{"id":18,"name":"Educational"},{"id":19,"name":"Card"}]

//handlers

	function handleFilters(e){
	const {name, value}=e.target;
	     switch(name){
		case "filterOrigin":
		  setFilters({...filters, origin:value})
	          break;

		case "filterByGenre":
		  setFilters({
		    ...filters,
		    genres:Object.values(e.target).filter(e=>e.selected).map(e=>e.value)
		  })
		  break;
		}	
	}


	function handleOrder(e){
	  const {name, value}=e.target;
	  switch(name){
	    case "By":
	    setOrder({...order,by:value})
	    break;
	    case "Mode":
	    setOrder({...order,mode:value})
	    break
	  }	
	}
 
//useEffects

	useEffect(()=>{
	     dispatch(applyFilters(filters))
	},[filters])	
	
	useEffect(()=>{
	console.log(order, "order options")
		dispatch(orders(order))
	},[order])	

//RENDERING



return(
	<div className={styles.Options} >

  {/*Filters*/}

    {/*By Origin*/}

	  <div className={styles.Filters} >
	  
	<h3 className={styles.Title} >Filter</h3>

   <div className={styles.setFilter}>

	<div className={styles.Origin} >
	   <h4 className={styles.subTitle} >By Origin</h4>

	   <select name="filterOrigin"  className={styles.Select} onChange={(e)=>handleFilters(e)}>

	    <option value="Show All" >Show All</option>
	    <option value="Created" >Created</option>
	    <option value="Not Created">Not Created</option>

	   </select> 
	</div>

   {/*By Genre*/}


	<div className={styles.Genre} >
	  <h4 className={styles.subTitle} >By Genre</h4>

	  <select multiple name="filterByGenre" className={styles.Select} onChange={(e)=>handleFilters(e)} >
	  {
	   allGenres.map((genre,i)=>{
		return <option key={i} id={genre.id} value={genre.name}>{genre.name}</option>
		})
	  }
           </select>
        </div>
   </div>
	  </div>

{/*Order*/}


	  <div className={styles.Order} >

	<h3 className={styles.Title} >Order</h3>

<div className={styles.setOrder} >
  
  {/*By*/}

    <div className={styles.By} >
	<h4 className={styles.subTitle} >By:</h4>

	<select name="By" className={styles.Select} onChange={(e)=>handleOrder(e)}>
	   <option value="Default">Default</option>
	   <option value="Rating" >Rating</option>
	   <option value="Alphabetically">Alphabetically</option>
	</select>
    </div>

  {/*Mode*/}

    <div className={styles.Mode} >
	<h4 className={styles.subTitle} >Mode:</h4>

	<select  name="Mode" className={styles.Select} onChange={(e)=>handleOrder(e)}>
	    <option value="None" >None</option>
           <option value="Ascend" >Ascend</option>
           <option value="Descend" >Descend</option>
        </select>
    </div>

  </div>
	 </div>

	</div>
	)
}
