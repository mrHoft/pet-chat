import Component	from '../../../services/Component';
import connect		from '../../../services/Store/connect';
import {replaceDOM}	from '../../../services/render-dom';
import {TChatInfo, ChatToken}	from '../../../services/api/types';
import {Manager}	from '../../../services/api/Manager';
import Store		from '../../../services/Store/Store';
import { getChatIndex } from '../utils';
import * as classes from './.module.css';
import * as icon from '../../../../static/icon-36.svg';

const manager=new Manager();
const store=new Store();

type DetailsProps={
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

function chatDetails(uuid:string, props:Indexed={}):void{
	// console.log(props);
	const HOC=connect(Component, mapActiveChatToProps);
	const frame=new HOC('div',<DetailsProps>{
		id:		'chat_details',
		text:
`<div class="${classes.icon}" onclick="file_upload.click();"></div>
<input type="file" id="file_upload" name="file" hidden accept="image/png, image/jpeg, image/gif"/>
<p class="err" style="text-align: center;">Error</p>
<div class="${classes.name}">Chat name</div>`,
		update:	updateChatDetails,
		className: classes.chat_details,
		events:	{
			change:(event:SubmitEvent)=>{
				const id:number=store.getState().active_chat.chatId;
				const index=getChatIndex(id);
				if(index!=-1){
					const target=event.target as HTMLInputElement;
					const file=target.files? target.files[0] : null;
					if(file){
						const form=new FormData();
						form.append('avatar', file);
						form.append('chatId', String(id));
						const err_el=target.nextElementSibling;
						manager.updateChatAvatar(form, index, err_el);
					}
				}
			},
		}
	});
	replaceDOM(uuid, frame);
	updateChatDetails();
}

function updateChatDetails(){
	console.log('...Update chat details');
	let container:HTMLElement | null=document.getElementById('chat_details');
	const data:TChatInfo=mapActiveChatToProps(store.getState());
	if(container && data){
		const collection:HTMLCollection=container.getElementsByTagName('div');
		const {title, avatar}=data;

		const avatar_el=collection[0] as HTMLDivElement;
		if(avatar_el)
			if(avatar)
		 		avatar_el.style.backgroundImage=`url("https://ya-praktikum.tech/api/v2/resources${avatar}")`;
			else
			avatar_el.style.backgroundImage=`url(\"${icon}\")`;

		const title_el=collection[1] as HTMLDivElement;
		title_el.textContent=title || 'Chat name';
	}
}

export default chatDetails;
