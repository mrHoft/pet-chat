// import template from './template.tmpl';
import Component	from '../../../services/Component';
import {replaceDOM}	from '../../../services/render-dom';
import * as classes	from './.module.css';
// import message		from '../message';
// import Store		from '../../../services/Store/Store';
import sendMessage from '../../../services/api/sendMessage';

// const store=new Store();

function keypress_event(event:KeyboardEvent):void{
	if(event.key=='Enter' || event.key=='Backspace' || event.key=='Delete'){
		const box=event.target as HTMLDivElement;
		let value:string=box?.innerHTML;
		if(value){
			// console.log(value);
			if(value.replace(/\<\/?(div)?(br)?\>/gi,'')==''){
				value='';
				box.innerHTML=value;
				return;
			}
			value.trim();
			if(event.key=='Enter'){
				value=value.replace(/\<\/?div\>/gi,'');
				while(value.endsWith('<br>')) value=value.slice(0,-4);
			}
			if(!event.shiftKey && event.key=='Enter'){
				let messages_frame:HTMLElement | null=document.getElementById('messages_frame');
				if(messages_frame){
					console.log(value);
					sendMessage(value);
					// store.add('messages',value);
					// message(messages_frame,value);
					// messages_frame.scrollTop=messages_frame.scrollHeight;
					if(messages_frame.firstElementChild) messages_frame.firstElementChild.scrollIntoView();
				}
				value='';
				box.innerHTML=value;
			}
			let element:HTMLElement | null=document.getElementById('bottom_frame');
			if(element){
				const rows=value=='' ? 0 : Math.min(value.split('<br>').length,5);
				// console.log(rows);
				element.style.height=40+(rows)*14+'px';
				box.style.height=14+(rows)*14+'px';
			}
		}
	}
}

function messageBox(uuid:string){
	const block=new Component('div',{
		name: 'message_box',
		className: classes.textbox,
		placeholder: 'Message text',
		autofocus: true,
		contentEditable: 'true',
		events:{
			keyup: keypress_event,
		}
	});
	replaceDOM(uuid, block);
}

export default messageBox;
