export default function getFifteen(allVideogames, page){
	/*const fifteen=Array.isArray(allVideogames)
	?allVideogames.slice( (page-1)*15, (page*15))
	:null*/
	let fifteen=[];
	for(let i=(page-1)*15; i<page*15; i++){
	fifteen.push(allVideogames[i])
	}
	return fifteen;
}
