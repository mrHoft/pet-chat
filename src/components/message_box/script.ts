// import template from './template.tmpl';
import Block from '../../services/block';
import renderDOM from '../../services/render-dom';
import * as classes from './.module.css';
import message from '../message/script';

class Input extends Block {
	constructor(props:any) {
		super("textarea", props);
	}
}

function keypress_event(event:KeyboardEvent):void{
	if(event.key=='Enter' || event.key=='Backspace' || event.key=='Delete'){
		const box=event.target as HTMLTextAreaElement;
		let value:string=box?.value;
		console.log(value);
		if(value){
			if(!event.shiftKey && event.key=='Enter'){
				let messages_frame:HTMLElement | null=document.getElementById('messages_frame');
				if(messages_frame){
					value=value.replace(/\n/gi,'<br>');
					// messages_frame.innerHTML+=value;
					message(messages_frame,value);
					// messages_frame.scrollTop=messages_frame.scrollHeight;
					// if(messages_frame.lastElementChild) messages_frame.lastElementChild.scrollIntoView();
				}
				value='';
				box.value=value;
			}
			let element:HTMLElement | null=document.getElementById('bottom_frame');
			if(element){
				const rows=Math.min(value.split('\n').length,5);
				// console.log(rows);
				element.style.height=40+(rows-1)*16+'px';
				box.style.height=19+(rows-1)*16+'px';
			}
		}
	}
}

function message_box(uuid:string){
	const block=new Input({
		name: 'message_box',
		class: classes.textbox,
		placeholder: 'Message text',
		rows: 1,
		autofocus: true,
		events:{
			keyup: keypress_event,
		}
	});
	renderDOM(uuid, block);
}

export default message_box;
