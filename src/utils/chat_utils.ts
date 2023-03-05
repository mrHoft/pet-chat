import Store from '../services/Store/Store';

const store=new Store();

function showMessage(element:Element | null, text: string='', color='red'){
	if(!element || !(element instanceof HTMLElement)) return;
	element.style.display=(text=='')? 'none' : 'block';
	// element.textContent=text;
	element.innerHTML=text;
	element.style.color=color;
}

function timedMessage(element:Element | null, text:string, color='red'):void{
	if(element){
		showMessage(element, text, color);
		setTimeout(() =>{ showMessage(element); }, 3000);
	}
}

function formMessage(element:Element | null, text:string, color='red'):void{
	if(element){
		const collection:HTMLCollection=element.getElementsByClassName('err');
		const err_el=collection.item(collection.length-1) as HTMLElement;
		timedMessage(err_el, text, color);
	}
}

function detailsSwitch(state=undefined){
	const det=document.getElementById('details_frame');
	const cent=document.getElementById('central_frame');
	if(det && cent){
		const visible=det.style.width!='0px';
		if(state==undefined || state!=visible){
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
		if(state==undefined) store.set('details', !visible);
	}
}

export {showMessage, timedMessage, formMessage, detailsSwitch};
