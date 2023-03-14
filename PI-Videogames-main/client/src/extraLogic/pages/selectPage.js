export default function selectPage(pages, setPages){
	return function(page){
	setPages({
	...pages,
	selected:page
	})
	};
}
