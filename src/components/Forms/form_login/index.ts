import template		from './template.tmpl';
import Component	from '../../../services/Component';
import {replaceDOM}	from '../../../services/render-dom';
import {callback_validate, validateLoginFields}	from '../../../utils/validation';
import {formMessage} from '../../../utils/chat_utils';
// import {AuthAPI} from '../api';
import {TSignIn}	from '../../../services/api/types';
import Manager		from '../../../services/api/Manager';

function login_callback(event:SubmitEvent):boolean{
	event.preventDefault();
	const element=event.target as HTMLFormElement;
	if(!element) throw new Error('Something went wrong');
	// const element:HTMLFormElement | null=document.getElementById('login_form') as HTMLFormElement;
	const form:FormData=new FormData(element);
	const data:TSignIn={
		login: String(form.get('login')),
		password: String(form.get('password')),
	};
	// console.log(data);

	const validation:string=validateLoginFields(data);
	console.log(`Validation: ${!validation}`);
	if(validation!=''){
		formMessage(element, validation);
		return false;
	}
	const manager=new Manager();
	manager.signin(data, element);
	return false;
}

function formLogin(uuid:string){
	const block=new Component('div',{
		name: 'login_form',
		text: template,
		events:{
			// click:()=>console.log('click'),
			blur:(event:FocusEvent)=>{ console.log(event); },
			focusout:(event:FocusEvent)=>callback_validate(event),
			submit:(event:SubmitEvent)=>{
				login_callback(event);
			},
		},
	});
	replaceDOM(uuid, block);
}

export default formLogin;
