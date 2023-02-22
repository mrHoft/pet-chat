import Component	from '../../../services/Component';
import Store		from '../../../services/Store/Store';
import connect		from '../../../services/Store/connect';
import {replaceDOM}	from '../../../services/render-dom';
import { TMessage } from '../../../services/api/types';
import message		from '../message_node';
// import * as classes from './.module.css';

const store=new Store();

type MessagesProps={
	id:			string,
	className:	string,
	update:		Function,
	events?:	Record<string, unknown>
};

const mapMessagesToProps=(state:Indexed)=>state.messages;

function messages_frame(uuid:string, props:Record<string, any>={}):void{
	// console.log(props);
	const HOC=connect(Component, mapMessagesToProps);
	const messages_frame=new HOC('div',<MessagesProps>{
		id:			'messages_frame',
		className:	'scrolled',	//classes.messages_frame
		update:		renderMessages,
		// events:	{click:()=>props['onclick'] ? props['onclick']() : window.open('/', '_self')}
	});
	replaceDOM(uuid, messages_frame);
	renderMessages();
}

function renderMessages(){
	console.log('...Update messages');
	let container:HTMLElement | null=document.getElementById('messages_frame');
	const messages=mapMessagesToProps(store.getState());
	if(container && messages){
		container.innerHTML='';
		messages.forEach((value: TMessage)=>{
			// console.log(value);
			const element=message(container as HTMLElement, value);
			// container!.insertBefore(element,container!.firstChild);
			container?.appendChild(element);
		});
		// messages_frame.scrollTop=messages_frame.scrollHeight;
		if(container!.firstElementChild) container!.firstElementChild.scrollIntoView();
	}
}

export default messages_frame;
