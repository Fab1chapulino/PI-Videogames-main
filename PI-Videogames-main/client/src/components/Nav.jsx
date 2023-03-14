import { NavLink } from "react-router-dom";
import styles from "../css/Nav.module.css";

export default function Nav(){
	return(
	<div className={styles.Bar} >
	<NavLink to={"/home"} className={styles.Navigate} >Home</NavLink>
	<NavLink to={"/create"} className={styles.Navigate} >Create</NavLink>
	</div>
	)
}
