function show_message(element:Element | null, text: string='', color='red'){
	if(!element || !(element instanceof HTMLElement)) return;
	element.style.display=(text=='')? 'none' : 'block';
	// element.textContent=text;
	element.innerHTML=text;
	element.style.color=color;
}

function details_switch(){
	const det=document.getElementById('details_frame');
	const cent=document.getElementById('central_frame');
	if(det && cent){
		let visible=det.style.width!='0px';
		if(visible){
			det.style.width='0px';
			cent.style.marginRight='0px';
			// console.log('Hide');
		}else{
			det.style.width='320px';
			cent.style.marginRight='320px';
			// console.log('Show');
		}
	}
}

export {show_message,details_switch};
