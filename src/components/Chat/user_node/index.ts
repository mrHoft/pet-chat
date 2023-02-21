// import template from './template.tmpl';
import Component from '../../../services/Component';
import Store		from '../../../services/Store/Store';
import {TUser, TChatUsers} from '../../../services/api/types';
import { Manager } from '../../../services/api/Manager';
import * as classes from './.module.css';

const store=new Store();

function userNode(data:TUser){
	const block=new Component('div',{
		name: 'user_node',
		className: classes.user_node,
		events:	{
			click:()=>{
				const chat_id=store.getState().active_chat;
				const req_data:TChatUsers={
					users: [data.id],
					chatId: chat_id
				};
				// console.log(req_data);
				const manager=new Manager();
				manager.removeUsers(req_data);
			}
		}
	});
	const element=block.getElement();
	const {id, first_name, second_name, display_name, avatar, phone, email, role}=data;

	const avatar_el:HTMLDivElement=document.createElement("div");
	avatar_el.className='avatar';
	if(avatar) avatar_el.style.backgroundImage=`url("https://ya-praktikum.tech/api/v2/resources${avatar}")`;
	element.appendChild(avatar_el);

	const div_el:HTMLDivElement=document.createElement("div");
	div_el.className=classes.info;
	element.appendChild(div_el);

	const title_el:HTMLDivElement=document.createElement("div");
	// title_el.className=classes.info;
	const name=display_name ? `${first_name} ${second_name} (${display_name})` : `${first_name} ${second_name}`;
	title_el.textContent=name;
	div_el.appendChild(title_el);
/* 
	const time_el:HTMLDivElement=document.createElement("div");
	let time:string=new Date().toLocaleDateString();
	if(last_message) time=(new Date(last_message.time)).toLocaleDateString();
	time=time.replace(/\//g, '.');
	time_el.textContent=time;
	div_el.appendChild(time_el);

	const opt_el:HTMLDivElement=document.createElement("div");


	const role_el:HTMLDivElement=document.createElement("div");
	role_el.textContent=String(role);
	div_el.appendChild(role_el);
 */
	
	const del_el:HTMLDivElement=document.createElement("div");
	del_el.className=(role=='admin' ? 'crown' : 'user-del');
	div_el.appendChild(del_el);

	return element;
}

export default userNode;
