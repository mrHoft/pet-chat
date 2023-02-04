import {show_message} from '../utils/utils';
import {validateSecurityFields} from '../utils/validation';
// import {HTTPTransport} from './transport';

function callback_password(event:SubmitEvent):boolean{
	event.preventDefault();
	event.stopPropagation();
	const element=event.target as HTMLFormElement
	if(!element) throw new Error('Something went wrong');
	// const element:HTMLFormElement | null=document.getElementById('login_form') as HTMLFormElement;
	const form:FormData=new FormData(element);
	const data={
		'password': form.get('password'),
		'psw-repeat': form.get('psw-repeat'),
	}
	console.log(data);
	const validation:string=validateSecurityFields(data);
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

export default callback_password;
