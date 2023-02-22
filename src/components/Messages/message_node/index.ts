// import template from './template.tmpl';
import Component from '../../../services/Component';
import Store		from '../../../services/Store/Store';
import { TMessage } from '../../../services/api/types';
import * as classes from './.module.css';
import { timeDiff } from '../../../utils/date_utils';

const store=new Store();

function message(container:HTMLElement, data:TMessage){
	const {id, chat_id, time, type, user_id, content, is_read, file}=data;
	const isOwn=user_id==store.getState().user.id;
	const users=store.getState().known_users;
	const user=users ? users[String(user_id)] : undefined;
	const name=user ? (user.display_name ? user.display_name : user.first_name+' '+user.second_name) : user_id;
	const timeString=timeDiff(time);
	const header=
`<div style="${isOwn ? 'display: flex; justify-content: right;' : 'display: flex; justify-content: space-between;'}">
	${!isOwn ? `<span style="color: #89C5CC; font-weight: 400;">${name}</span>` : ''}
	<span style="color: gray;">
		${timeString}
		${is_read ? '<span style="color: cornflowerblue;">&#x2714;</span>' : ''}
	</span>
</div>`;

	const block=new Component('div',{
		name: 'message',
		// id:	'message_'+id,
		className: isOwn ? classes.message_out : classes.message_in,
		text: `${header}${content}`
	});
	// container.insertBefore(block.getElement(),container.firstChild)
	return block.getElement();
}

export default message;
