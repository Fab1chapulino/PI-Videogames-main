export default function nextPage(pages, setPages){
	return function(){
	setPages({
                ...pages,
                selected:pages.selected===pages.nums.length
		?pages.selected
		:pages.selected+1
                })
	}
}
