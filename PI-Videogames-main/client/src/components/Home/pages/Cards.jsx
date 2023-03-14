import Card from "./Card.jsx";
import styles from "../../../css/AllCards.module.css"

export default function Cards(props){
	console.log(props.videogames,"cards videogames")
	return (
	<div className={styles.Cards}>
	   {
	  props.videogames.map((ch,i)=>{
		return(
		 <div key={i}>
		  <Card id={ch.id} name={ch.name} image={ch.image} genres={
	typeof ch.id==="number"
	?ch.genres.join(", ")
	:ch.genres.map( genre=>Object.values(genre)[0] ).join(", ")} />
		</div> 
		 )
	    })
	}
	</div>
	)
}
