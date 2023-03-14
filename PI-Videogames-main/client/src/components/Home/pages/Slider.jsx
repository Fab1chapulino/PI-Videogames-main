import styles from "../../../css/Slider.module.css";

export default function Slider(props){
	const left = "<";
	const right = ">"
        return(
        <div className={styles.Slider}>

        <span onClick={()=>props.prev()} className={styles.Change} >{left}</span>

	{props.pages.nums.map((page, i)=>{
	   return(
	    <span key={i} onClick={()=>props.select(i+1)} className={
	props.pages.selected===page
	?styles.Selected
	:styles.Change}>
		{page}
	    </span>
		)
		})}

	<span onClick={()=>props.next()} className={styles.Change} >{right}</span>

        </div>
        )
}
