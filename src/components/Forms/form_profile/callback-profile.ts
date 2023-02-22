import {formMessage} from '../../../utils/chat_utils';
import {validateFields} from '../../../utils/validation';
import {TProfile} from "../../../services/api/types";
import { Manager } from '../../../services/api/Manager';
// import {HTTPTransport} from './transport';

function callback_profile(event:SubmitEvent):boolean{
	event.preventDefault();
	event.stopPropagation();
	const element=event.target as HTMLFormElement
	if(!element) throw new Error('Something went wrong');
	// const element:HTMLFormElement | null=document.getElementById('login_form') as HTMLFormElement;
	const form:FormData=new FormData(element);
	const data:TProfile={
		'first_name':	String(form.get('first_name')),
		'second_name':	String(form.get('second_name')),
		'login':		String(form.get('login')),
		'email':		String(form.get('email')),
		'phone':		String(form.get('phone')),
		'display_name':	String(form.get('display_name') || '')
	}
	console.log(data);
	const validation:string=validateFields(data);
	console.log(`Validation: ${!validation}`);
	if(validation!=''){
		formMessage(element, validation);
		return false;
	}
	const manager=new Manager(); manager.updateProfile(data, element);
	return false;
}

export default callback_profile;
