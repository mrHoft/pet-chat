// import {formMessage} from '../../utils/chat_utils';
import {validateNickName} from '../../utils/validation';
import {TChat} from "../../services/api/types";
import { Manager } from '../../services/api/Manager';
// import {HTTPTransport} from './transport';

function newChat(element: HTMLFormElement){
	if(!element) throw new Error('Something went wrong');

	const form:FormData=new FormData(element);
	const data:TChat={
		'title': String(form.get('title'))
	}
	console.log(data);

	const collection:HTMLCollection=element.getElementsByClassName("main_inputbox");
	const input_el=collection[0];
	if(input_el){
		const validation:boolean=validateNickName(input_el as HTMLInputElement);
		console.log(`Validation: ${validation}`);
		if(!validation){
			// formMessage(element, validation);
			return false;
		}
		
		const manager=new Manager();
		manager.createChat(data, input_el.nextElementSibling);
	}
	return false;
}

export default newChat;
