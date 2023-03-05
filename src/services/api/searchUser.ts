// import {formMessage} from '../../utils/chat_utils';
import {validateLogin}	from '../../utils/validation';
import Manager	from './Manager';

function searchUser(element: HTMLFormElement){
	if(!element) throw new Error('Something went wrong');

	const form:FormData=new FormData(element);
	const name:string=String(form.get('search_name'));
	console.log(name);

	const collection:HTMLCollection=element.getElementsByClassName('main_inputbox');
	const input_el=collection[0];
	if(input_el){
		const validation:boolean=validateLogin(input_el as HTMLInputElement);
		console.log(`Validation: ${validation}`);
		if(!validation){
			// formMessage(element, validation);
			return false;
		}

		const manager=new Manager();
		manager.searchUsers(name, input_el.nextElementSibling);
	}
	return false;
}

export default searchUser;
