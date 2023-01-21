function show_message(element:HTMLElement ,text: string){
	element.style.display='block';
	element.textContent=text;
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
