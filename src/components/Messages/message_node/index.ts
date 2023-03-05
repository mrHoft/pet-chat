// import template from './template.tmpl';
import Component	from '../../../services/Component';
import Store		from '../../../services/Store/Store';
import { TMessage } from '../../../services/api/types';
import classes 		from './.module.css';
import { timeDiff, timeFull } from '../../../utils/date_utils';

const store=new Store();

function message(container:HTMLElement, data:TMessage){
	const {id, chat_id, time, type, user_id, content, is_read, file}=data;
	const isOwn=user_id==store.getState().user.id;
	const users=store.getState().known_users;
	const user=users ? users[String(user_id)] : undefined;

	const name=user ? (user.display_name ? user.display_name : `${user.first_name} ${user.second_name}`) : user_id;
	const timeShort=time.slice(11,16);	// timeDiff(time);
	const timeString=timeFull(time);
	time.slice(10,5);
	const header=`<div style="${isOwn ? 'display: flex; justify-content: right;' : 'display: flex; justify-content: space-between;'}">
	${!isOwn ? `<div style="color: #89C5CC; font-weight: 600; cursor: pointer">${name}&nbsp;</div>` : ''}
	<div style="color: gray;">
		<span class="tip">${timeShort}<span class="tooltip">${timeString}</span></span>
		${isOwn && is_read ? '<span style="color: #89C5CC;">&#x2714;</span>' : ''}
	</div>
</div>`;

	const block=new Component('div',{
		name: 'message',
		// id:	'message_'+id,
		className: isOwn ? classes.message_right : classes.message_left,
		text: `${header}${content}`,
	});
	// container.insertBefore(block.getElement(),container.firstChild)
	return block.getElement();
}

export default message;
