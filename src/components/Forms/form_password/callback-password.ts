import {timedMessage} from '../../../utils/chat_utils';
import {validateSecurityFields} from '../../../utils/validation';
// import {HTTPTransport} from './transport';
import { Manager } from '../../../services/api/Manager';
import {TPassword} from '../../../services/api/types';

function callback_password(event:SubmitEvent):boolean{
	event.preventDefault();
	event.stopPropagation();
	const element=event.target as HTMLFormElement
	if(!element) throw new Error('Something went wrong');
	// const element:HTMLFormElement | null=document.getElementById('login_form') as HTMLFormElement;
	const form:FormData=new FormData(element);
	const data:TPassword={
		'oldPassword': String(form.get('oldPassword')),
		'newPassword': String(form.get('newPassword')),
	}
	// console.log(data);
	const validation:string=validateSecurityFields({...data, 'psw-repeat': form.get('psw-repeat')});
	console.log(`Validation: ${!validation}`);
	const collection:HTMLCollection=element.getElementsByClassName("err");
	const err_el=collection.item(collection.length-1) as HTMLElement;
	if(validation!=''){
		if(err_el) timedMessage(err_el, validation);
		return false;
	}
	const manager=new Manager(); manager.updatePassword(data, err_el);
	return false;
}

export default callback_password;
