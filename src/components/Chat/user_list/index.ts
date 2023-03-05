import Component	from '../../../services/Component';
import connect		from '../../../services/Store/connect';
import {replaceDOM}	from '../../../services/render-dom';
import {TUser}		from '../../../services/api/types';
import Manager		from '../../../services/api/Manager';
import Store		from '../../../services/Store/Store';
import { merge, setValue } from '../../../utils/base_utils';
import classes		from './.module.css';
import userNode		from '../user_node';

const store=new Store();
const manager=new Manager();

type DetailsProps={
	id:			string,
	text?:		string,
	update:		Function,
	className?:	string,
	events?:	Record<string, unknown>
};

const mapChatUsersToProps=(state:Indexed)=>state.chat_users;

function updateChatUsers(){
	console.log('...Update chat users');
	const container:HTMLElement | null=document.getElementById('chat_users');
	const data:[]=mapChatUsersToProps(store.getState());
	const newUsers={};
	if(container && data){
		container.innerHTML='';
		const list=document.createElement('ul');
		Object.values(data).forEach((value: TUser)=>{
			setValue(newUsers, String(value.id), value);

			const list_el=document.createElement('li');
			const node=userNode(value);
			list_el.appendChild(node);
			list.appendChild(list_el);
		});
		container.appendChild(list);
	}
	// Add new users (to know them by id)
	const {known_users} = store.getState();
	store.set('known_users', known_users ? merge(known_users, newUsers) : newUsers);
	// console.log(store.getState().known_users);
}

function chatUsers(uuid:string, props:Indexed={}):void{
	// console.log(props);
	const HOC=connect(Component, mapChatUsersToProps);
	const frame=new HOC('div',<DetailsProps>{
		id:		'chat_users',
		update:	updateChatUsers,
		className: `${classes.chat_users} scrolled`,
/*
 		events:	{
			click:()=>{
				const id:number=store.getState().active_chat;
				console.log(id);
				manager.getUsers({id});
			}
		}
*/
	});
	replaceDOM(uuid, frame);
	const id:number=store.getState().active_chat;
	if(id && !mapChatUsersToProps(store.getState())) manager.getChatUsers(id);
	updateChatUsers();
}

export default chatUsers;
