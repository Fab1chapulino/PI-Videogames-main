import {useState} from "react";
import styles from "../../css/SearchBar.module.css"

export default function SearchBar({onSearch, goHome, searching}){
	const [query, setQuery]=useState("");

	const getBack="<— Go Home";

	function handleInputChange(e){
	const value = e.target.value;
	setQuery(value);
	}
	function clearAndHome(){
	setQuery("");
	goHome();
	}

        return(
           <div className={styles.Searching}>
	     <div >
               <input onChange={handleInputChange} type="search" value={query} size="70" className={styles.SearchBar} />
	       <span onClick={()=>onSearch(query)} className={styles.goHome} >search</span>
	     </div>
	{searching &&
	  <div className={styles.goHomeContainer} >
	     <div className={styles.goHome}>
	     <span onClick={clearAndHome}>{getBack}</span>
	     </div>
           </div>}
           </div>
        )
}

