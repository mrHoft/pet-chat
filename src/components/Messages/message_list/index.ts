import Component	from '../../../services/Component';
import Store		from '../../../services/Store/Store';
import connect		from '../../../services/Store/connect';
import {replaceDOM}	from '../../../services/render-dom';
import { TMessage } from '../../../services/api/types';
import message		from '../message_node';
import classes		from './.module.css';

const store=new Store();

type MessagesProps={
	id:			string,
	className:	string,
	update:		Function,
	events?:	Record<string, unknown>
};

const mapMessagesToProps=(state:Indexed)=>state.messages;

function renderMessages(){
	console.log('...Update messages');
	const container:HTMLElement | null=document.getElementById('messages_frame');
	const messages=mapMessagesToProps(store.getState());
	if(container && messages){
		container.innerHTML='';
		let lastTime:string='';
		messages.forEach((data: TMessage)=>{
			const currTime=data.time.slice(0,10);

			if(lastTime!=currTime){
				if(lastTime!=''){
					const el=document.createElement('div');
					el.className=classes.date;
					el.textContent=lastTime;
					container?.appendChild(el);
				}
				lastTime=currTime;
			}

			const el=message(container as HTMLElement, data);
			// container!.insertBefore(element,container!.firstChild);
			container?.appendChild(el);
		});
		// messages_frame.scrollTop=messages_frame.scrollHeight;
		if(container!.firstElementChild) container!.firstElementChild.scrollIntoView();
	}
}

function messages_frame(uuid:string, props:Record<string, any>={}):void{
	// console.log(props);
	const HOC=connect(Component, mapMessagesToProps);
	const messages_frame=new HOC('div',<MessagesProps>{
		id:			'messages_frame',
		className:	'scrolled',	// classes.messages_frame
		update:		renderMessages,
		// events:	{click:()=>props['onclick'] ? props['onclick']() : window.open('/', '_self')}
	});
	replaceDOM(uuid, messages_frame);
	renderMessages();
}

export default messages_frame;
