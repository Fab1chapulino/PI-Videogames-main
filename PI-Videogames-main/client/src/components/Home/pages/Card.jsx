import { NavLink } from "react-router-dom";
import styles from "../../../css/Card.module.css"

export default function Card({id, image, name, genres}){
	console.log(image, "Imagen")
	return(
   <div className={styles.Card} >
	{image &&
     <NavLink to={`/detail/${id}`} className={styles.Enlace} >
	<div className={styles.ImageCont} >
	<img src={image} className={styles.Image} />
	</div>
	  <h2 className={styles.Content} >{name}</h2>
	  <p className={styles.Content} ><span>Genres: </span>{genres}</p>

     </NavLink>}
   </div>
	)
}
