import template from './template.tmpl';
import Block from '../../services/block';
import renderDOM from '../../services/render-dom';
import {callback_validate} from '../../utils/validation';
import callback_signup from '../../services/callback-sugnup';

class SignupForm extends Block{
	render() {
		return template;
	}
}

function signupForm(uuid:string){
	const block=new SignupForm('div',{
		name: 'signup_form',
		events:{
			submit:(event:SubmitEvent)=>callback_signup(event),
			focusout:(event:FocusEvent)=>callback_validate(event),
		}
	});
	renderDOM(uuid, block);
}

export default signupForm;
