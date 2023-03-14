
export default function createPages(numOfGames){
	let pages = {
	nums:[],
	selected:1
	};
	let i=1;

	while(i<=Math.ceil(numOfGames/15)){
	pages.nums.push(i);
	i++;
	}
	console.log(pages)
	return pages;
}
