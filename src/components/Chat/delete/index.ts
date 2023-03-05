import Component	from '../../../services/Component';
import {replaceDOM} from '../../../services/render-dom';
import classes		from './.module.css';
import Manager		from '../../../services/api/Manager';
import Store		from '../../../services/Store/Store';

const store=new Store();
const manager=new Manager();

type ButtonProps={
	name:string,
	text?:string,
	class?:string,
	events?:Record<string, unknown>
};

function chatDelete(uuid:string, props:Record<string, any>={}):void{
	const button = new Component('div',<ButtonProps>{
		name: 'chat_delete',
		className: classes.trash,
		events:{
			click:()=>manager.deleteChat(store.getState().active_chat.chatId),
		},
	});
	replaceDOM(uuid, button);
}

export default chatDelete;
