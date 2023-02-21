// import template from './template.tmpl';
import Component from '../../../services/Component';
import Store		from '../../../services/Store/Store';
import { TMessage } from '../../../services/api/types';
import * as classes from './.module.css';

const store=new Store();

function message(container:HTMLElement, data:TMessage){
	const {id, chat_id, time, type, user_id, content, is_read, file}=data;
	const self=store.getState().user;
	const users=store.getState().known_users;
	const user=users[String(user_id)];
	const name=user ? (user.display_name ? user.display_name : user.first_name+' '+user.second_name) : user_id;

	const block=new Component('div',{
		name: 'message',
		id:	'message_'+id,
		className: user_id==self.id ? classes.message_out : classes.message_in,
		text: `${name}: ${content}`
	});
	// container.insertBefore(block.getElement(),container.firstChild)
	return block.getElement();
}

export default message;
