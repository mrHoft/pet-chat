import template from './template.tmpl';
import Component from '../../../services/Component';
import {replaceDOM} from '../../../services/render-dom';
import {callback_validate} from '../../../utils/validation';
import callback_signup from './callback-sugnup';

class SignupForm extends Component{
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
	replaceDOM(uuid, block);
}

export default signupForm;
