function renderDOM(parent:string | Element | null, element:any):void{
	if(typeof parent=='string') parent=parent[0]=='.' ? document.querySelector(parent) : document.getElementById(parent);
	if(parent){
		parent.appendChild(element.getContent());
		element.dispatchComponentDidMount();
	}
}

export default renderDOM;
