import {formMessage} from '../../../utils/chat_utils';
// import {AuthAPI} from '../api';
import {validateLoginFields} from '../../../utils/validation';
import {TSignIn} from '../../../services/api/types';
import {Manager} from '../../../services/api/Manager';

function callback_login(event:SubmitEvent):boolean{
	event.preventDefault();
	const element=event.target as HTMLFormElement
	if(!element) throw new Error('Something went wrong');
	// const element:HTMLFormElement | null=document.getElementById('login_form') as HTMLFormElement;
	const form:FormData=new FormData(element);
	const data:TSignIn={
		'login': String(form.get('login')),
		'password': String(form.get('password'))
	}
	// console.log(data);
	
	const validation:string=validateLoginFields(data);
	console.log(`Validation: ${!validation}`);
	if(validation!=''){
		formMessage(element, validation);
		return false;
	}
	const manager=new Manager(); manager.signin(data);
	return false;
}

export default callback_login;
