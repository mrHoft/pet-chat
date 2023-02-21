// import template from './template.tmpl';
import Component from '../../../services/Component';
import Store		from '../../../services/Store/Store';
import {TChatInfo} from '../../../services/api/types';
import * as classes from './.module.css';

const store=new Store();

function chatNode(data:TChatInfo){
	const block=new Component('div',{
		name: 'chat_node',
		className: classes.chat_node,
		events:	{
			click:()=>store.set('active_chat.chatId', data.id)
		}
	});
	const element=block.getElement();
	const {id, title, avatar, created_by, unread_count, last_message}=data;

	const avatar_el:HTMLDivElement=document.createElement("div");
	avatar_el.className='icon';
	if(avatar) avatar_el.style.backgroundImage=`url("https://ya-praktikum.tech/api/v2/resources${avatar}")`;
	element.appendChild(avatar_el);

	const div_el:HTMLDivElement=document.createElement("div");
	div_el.className=classes.info;
	element.appendChild(div_el);

	const title_el:HTMLDivElement=document.createElement("div");
	// title_el.className=classes.info;
	title_el.textContent=title;
	div_el.appendChild(title_el);


	const time_el:HTMLDivElement=document.createElement("div");
	let time:string='';
	if(last_message) time=(new Date(last_message.time)).toLocaleDateString();
	time=time.replace(/\//g, '.');
	time_el.textContent=time;
	div_el.appendChild(time_el);
/* 
	const opt_el:HTMLDivElement=document.createElement("div");

	const del_el:HTMLDivElement=document.createElement("div");
	del_el.className=classes.del;
	del_el.innerHTML='&times';
	opt_el.appendChild(del_el);
 */
	const unread_el:HTMLDivElement=document.createElement("div");
	unread_el.className=classes.count;
	unread_el.textContent=String(unread_count);

	element.appendChild(unread_el);

	return element;
}

export default chatNode;
