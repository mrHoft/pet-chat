import Component	from '../../../services/Component';
import Store		from '../../../services/Store/Store';
import connect		from '../../../services/Store/connect';
import {replaceDOM}	from '../../../services/render-dom';
import chatNode		from '../chat_node';
import {TChatInfo} from '../../../services/api/types';
// import * as classes from './.module.css';

const store=new Store();

type MessagesProps={
	id:			string,
	className:	string,
	update:		Function,
	events?:	Record<string, unknown>
};

const mapChatsToProps=(state:Indexed)=>state.chats;

function chatsFrame(uuid:string, props:Record<string, any>={}):void{
	// console.log(props);
	const HOC=connect(Component, mapChatsToProps);
	const frame=new HOC('div',<MessagesProps>{
		id:		'chats_frame',
		className: 'scrolled',	//classes.chats_frame,
		update:	renderChats,
		// events:	{click:()=>props['onclick'] ? props['onclick']() : window.open('/', '_self')}
	});
	replaceDOM(uuid, frame);
	renderChats();
}

function renderChats(){
	console.log('...Update chats');
	let container:HTMLElement | null=document.getElementById('chats_frame');
	const chats=mapChatsToProps(store.getState());
	if(container && chats){
		container.innerHTML='';
		const list=document.createElement('ul');
		Object.values(chats).forEach((value: TChatInfo)=>{
			const list_el=document.createElement('li');
			const node=chatNode(value);
			list_el.appendChild(node);
			list.appendChild(list_el);
			// console.log(value);
			// const element=message(container as HTMLElement, value);
			// container!.insertBefore(element,container!.firstChild)
		});
		container.appendChild(list);
	}
}

export default chatsFrame;
