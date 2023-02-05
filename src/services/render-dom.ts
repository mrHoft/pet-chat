function renderDOM(parent:string | Element | null, element:any):void{
	if(typeof parent=='string') parent=parent[0]=='.' ? document.querySelector(parent) : document.getElementById(parent);
	if(parent){
		parent.appendChild(element.getElement());
		element.dispatchComponentDidMount();
	}
}

function replaceDOM(temp:string | Element | null, element:any):void{
	if(typeof temp=='string') temp=temp[0]=='.' ? document.querySelector(temp) : document.getElementById(temp);
	if(temp){
		const parent=temp.parentElement;
		if(parent){
			const node=element.getElement();
			parent.appendChild(node);
			parent.replaceChild(node,temp);
			element.dispatchComponentDidMount();
		}
	}
}

export {renderDOM, replaceDOM};
