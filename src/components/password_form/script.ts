import template from './template.tmpl';
import Block from '../../services/block';
import renderDOM from '../../services/render-dom';
import {callback_validate} from '../../utils/validation';
import callback_password from '../../services/callback-password';

class Page extends Block{
	render() {
		return template;
	}
}

function password_form(uuid:string){
	const block=new Page('div',{
		name: 'password_form',
		events:{
			submit:(event:SubmitEvent)=>callback_password(event),
			focusout:(event:FocusEvent)=>callback_validate(event),
		}
	});
	renderDOM(uuid, block);
}

export default password_form;
