import {show_message} from '../utils/utils';
import {validateFields, validateSecurityFields} from '../utils/validation';
// import {HTTPTransport} from './transport';

function callback_signup(event:SubmitEvent):boolean{
	event.preventDefault();
	event.stopPropagation();
	const element=event.target as HTMLFormElement
	if(!element) throw new Error('Something went wrong');
	// const element:HTMLFormElement | null=document.getElementById('login_form') as HTMLFormElement;
	const form:FormData=new FormData(element);
	const data={
		'first_name': form.get('first_name'),
		'second_name': form.get('second_name'),
		'login': form.get('login'),
		'email': form.get('email'),
		'phone': form.get('phone'),
		'password': form.get('password'),
		'psw-repeat': form.get('psw-repeat'),
		'display_name': form.get('display_name') || ''
	}
	console.log(data);
	const validation:string=validateFields(data) || validateSecurityFields(data);
	console.log(`Validation: ${!validation}`);
	if(validation!=''){
		const collection:HTMLCollection=element.getElementsByClassName("err");
		const err_el=collection.item(collection.length-1) as HTMLElement;
		if(err_el){
			show_message(err_el, validation, 'red');
			setTimeout(function(){show_message(err_el)}, 3000);
		}
	}
	// send_request(element,data);
	return false;
}

export default callback_signup;
