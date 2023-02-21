import Component from '../../../services/Component';
import {replaceDOM} from '../../../services/render-dom';
import * as classes from './.module.css';
import {Manager}	from '../../../services/api/Manager';
import Store		from '../../../services/Store/Store';

const store=new Store();

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
			click:()=>{
				const manager=new Manager();
				manager.deleteChat(store.getState().active_chat);
			}
		}
	});
	replaceDOM(uuid, button);
}

export default chatDelete;
