import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import styles from "../css/Detail.module.css";

export default function Detail(){
	//some hooks
	const [detail, setDetail] = useState({});
	const {detailId}=useParams();
	
	useEffect(()=>{
	(async function getById(){
	  const {data} = await axios.get(`http://localhost:3001/videogames/${detailId}`)
	
	if(typeof data.id==="number"){	  
	  data.description=data.description.split("</p>").join(" ").split("<p>").join("")
	}
	  setDetail(data)
	  })()
	},[])
	
	console.log(detail)
        return(
        <div>
	{ Object.keys(detail).length &&
	<div className={styles.Data}>
	   <div clasName={styles.ImageCont}>
          	<img src={detail.image} className={styles.Image} />
		<h1 className={styles.Name}>{detail.name}</h1>
          </div>
	   <div>
		<p><b>description: </b>{detail.description}</p>
		<p><b>Released: </b>{detail.release_date}</p>

		<p><b>Genres: </b>{typeof detail.id!=="string"
		?detail.genres.join(", ")
		:detail.genres.map( genre=>Object.values(genre)[1] ).join(", ")}</p>

		<p><b>Platforms</b>{detail.platforms.join(", ")}</p>
		<p><b>Rating: </b>{detail.rating}</p>
	  </div>
	 </div>
	  }
        </div>
        )
}
