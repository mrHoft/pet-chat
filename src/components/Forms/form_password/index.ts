import template		from './template.tmpl';
import Component	from '../../../services/Component';
import {replaceDOM}	from '../../../services/render-dom';
import {callback_validate,validateSecurityFields}	from '../../../utils/validation';
import {timedMessage}	from '../../../utils/chat_utils';

import Manager		from '../../../services/api/Manager';
import {TPassword}	from '../../../services/api/types';

class PasswordForm extends Component{
	render() {
		return template;
	}
}

function callback_password(event:SubmitEvent):boolean{
	event.preventDefault();
	event.stopPropagation();
	const element=event.target as HTMLFormElement;
	if(!element) throw new Error('Something went wrong');
	// const element:HTMLFormElement | null=document.getElementById('login_form') as HTMLFormElement;
	const form:FormData=new FormData(element);
	const data:TPassword={
		oldPassword: String(form.get('oldPassword')),
		newPassword: String(form.get('newPassword')),
	};
	// console.log(data);
	const validation:string=validateSecurityFields({...data, 'psw-repeat': form.get('psw-repeat')});
	console.log(`Validation: ${!validation}`);
	const collection:HTMLCollection=element.getElementsByClassName('err');
	const err_el=collection.item(collection.length-1) as HTMLElement;
	if(validation!=''){
		if(err_el) timedMessage(err_el, validation);
		return false;
	}
	const manager=new Manager(); manager.updatePassword(data, err_el);
	return false;
}

function passwordForm(uuid:string){
	const block=new PasswordForm('div',{
		name: 'password_form',
		events:{
			submit:(event:SubmitEvent)=>callback_password(event),
			focusout:(event:FocusEvent)=>callback_validate(event),
		},
	});
	replaceDOM(uuid, block);
}

export default passwordForm;
