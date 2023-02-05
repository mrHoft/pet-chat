import template from './template.tmpl';
import Component from '../../services/Component';
import {replaceDOM} from '../../services/render-dom';
import {callback_validate} from '../../utils/validation';
import callback_password from '../../services/callback-password';

class PasswordForm extends Component{
	render() {
		return template;
	}
}

function passwordForm(uuid:string){
	const block=new PasswordForm('div',{
		name: 'password_form',
		events:{
			submit:(event:SubmitEvent)=>callback_password(event),
			focusout:(event:FocusEvent)=>callback_validate(event),
		}
	});
	replaceDOM(uuid, block);
}

export default passwordForm;
