import Component	from '../../../services/Component';
import Store		from '../../../services/Store/Store';
import connect		from '../../../services/Store/connect';
import {replaceDOM}	from '../../../services/render-dom';
import {TChatInfo, ChatToken} from '../../../services/api/types';
import { getChatIndex } from '../utils';
import * as classes from './.module.css';
import * as icon from '../../../../static/icon-36.svg';

const store=new Store();

type MessagesProps={
	id:			string,
	text:		string,
	update:		Function,
	className?:	string,
	events?:	Record<string, unknown>
};

const mapActiveChatToProps=(state:Indexed)=>{
	const cur:ChatToken=state.active_chat;
	if(cur){
		const id:number=cur.chatId;
		const index=getChatIndex(id)
		return state.chats[index] || {};
	}
	return {};
}

function chatHeader(uuid:string, props:Indexed={}):void{
	// console.log(props);
	const HOC=connect(Component, mapActiveChatToProps);
	const frame=new HOC('div',<MessagesProps>{
		id:		'chat_header',
		text:	`<div class="icon"></div><div class="${classes.name}">Chat name</div>`,
		update:	renderChatHeader,
		className: classes.chat_header,
		// events:	{click:()=>props['onclick'] ? props['onclick']() : window.open('/', '_self')}
	});
	replaceDOM(uuid, frame);
	renderChatHeader();
}

function renderChatHeader(){
	console.log('...Update chat header');
	let container:HTMLElement | null=document.getElementById('chat_header');
	const data:TChatInfo=mapActiveChatToProps(store.getState());
	if(container && data){
		const collection:HTMLCollection=container.getElementsByTagName('div');
		const {title, avatar}=data;

		const avatar_el=collection[0] as HTMLDivElement;
		if(avatar)
			avatar_el.style.backgroundImage=`url("https://ya-praktikum.tech/api/v2/resources${avatar}")`;
		else
			avatar_el.style.backgroundImage=`url(\"${icon}\")`;

		const title_el=collection[1] as HTMLDivElement;
		title_el.textContent=title || 'Chat name';
	}
}

export default chatHeader;
