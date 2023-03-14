export default function prevPage(pages, setPages){
	return function(){
        setPages({
                ...pages,
                selected:pages.selected===1?1:pages.selected-1
                })
	}
}
