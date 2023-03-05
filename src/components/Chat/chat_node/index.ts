// import template from './template.tmpl';
import Component from '../../../services/Component';
import Store		from '../../../services/Store/Store';
import Manager		from '../../../services/api/Manager';
import {TChatInfo} from '../../../services/api/types';
import { timeDiff } from '../../../utils/date_utils';
import classes from './.module.css';

const store=new Store();
const manager=new Manager();

function chatNode(data:TChatInfo){
	const block=new Component('div',{
		name: 'chat_node',
		className: classes.chat_node,
		events:	{
			click:()=>store.set('active_chat.chatId', data.id),
		},
	});
	const element=block.getElement();
	const {id, title, avatar, created_by, unread_count, last_message}=data;

	// Avatar
	const avatar_el:HTMLDivElement=document.createElement('div');
	avatar_el.className='icon';
	if(avatar) avatar_el.style.backgroundImage=manager.resources(avatar);
	element.appendChild(avatar_el);


	const div_el:HTMLDivElement=document.createElement('div');
	element.appendChild(div_el);

	// Info
	const div_info:HTMLDivElement=document.createElement('div');
	div_info.className=classes.info;
	div_el.appendChild(div_info);

	const title_el:HTMLDivElement=document.createElement('div');
	title_el.textContent=title;
	div_info.appendChild(title_el);

	const time_el:HTMLDivElement=document.createElement('div');
	let time:string='';	// time=(new Date(time)).toLocaleDateString(); time=time.replace(/\//g, '.');
	if(last_message) time=last_message.time;
	time_el.className=classes.time;
	time_el.textContent=time ? timeDiff(time) : '';
	div_info.appendChild(time_el);

	// Last message
	const message_el:HTMLDivElement=document.createElement('div');
	message_el.className=classes.message;
	if(last_message){
		const message:string=last_message.content;
		message_el.textContent=message.slice(0,27)+(message.length>27 ? '...' : '');
	}else message_el.textContent='';
	div_el.appendChild(message_el);

	// Undead count
	const unread_el:HTMLDivElement=document.createElement('div');
	unread_el.className=classes.count;
	if(!unread_count) unread_el.style.color='gray';
	unread_el.textContent=String(unread_count);

	element.appendChild(unread_el);

	return element;
}

export default chatNode;
