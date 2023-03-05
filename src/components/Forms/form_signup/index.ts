import template from './template.tmpl';
import Component from '../../../services/Component';
import {replaceDOM}	from '../../../services/render-dom';
import {callback_validate,validateFields, validateSecurityFields}	from '../../../utils/validation';
import {formMessage}	from '../../../utils/chat_utils';

import {TSignUp}	from '../../../services/api/types';
import Manager		from '../../../services/api/Manager';

class FormSignup extends Component{
	render() {
		return template;
	}
}

function callback_signup(event:SubmitEvent):boolean{
	event.preventDefault();
	event.stopPropagation();
	const element=event.target as HTMLFormElement;
	if(!element) throw new Error('Something went wrong');
	// const element:HTMLFormElement | null=document.getElementById('login_form') as HTMLFormElement;
	const form:FormData=new FormData(element);
	const data:TSignUp={
		first_name: String(form.get('first_name')),
		second_name: String(form.get('second_name')),
		login: String(form.get('login')),
		email: String(form.get('email')),
		phone: String(form.get('phone')),
		password: String(form.get('password')),
		'psw-repeat': String(form.get('psw-repeat')),
		display_name: String(form.get('display_name') || ''),
	};
	console.log(data);
	const validation:string=validateFields(data) || validateSecurityFields(data);
	console.log(`Validation: ${!validation}`);
	if(validation!=''){
		formMessage(element, validation);
		return false;
	}

	const manager=new Manager(); manager.signup(data);
	return false;
}

function formSignup(uuid:string){
	const block=new FormSignup('div',{
		name: 'signup_form',
		events:{
			submit:(event:SubmitEvent)=>callback_signup(event),
			focusout:(event:FocusEvent)=>callback_validate(event),
		},
	});
	replaceDOM(uuid, block);
}

export default formSignup;
