import styles from "../css/Landing.module.css";
import {NavLink} from "react-router-dom";

export default function LandingPage(){
	return(
	<div className={styles.Landing}>
	 <div className={styles.Contain}>
	  <h1 className={styles.Welcome} >Welcome to CyberGames</h1>
	  <p className={styles.Invitation}>Press Start to Play</p>
	  <NavLink to={"/home"} className={styles.goHome} >Start!</NavLink>
	 </div>
	</div>
	)
}
