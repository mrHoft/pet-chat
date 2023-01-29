import template from './template.tmpl';
import Block from '../../services/block';
import renderDOM from '../../services/render-dom';
import {callback_validate} from '../../utils/validation';
import callback_profile from '../../services/callback-profile';

class Page extends Block{
	render() {
		return template;
	}
}

function profile_form(uuid:string){
	const block=new Page('div',{
		name: 'profile_form',
		events:{
			submit:(event:SubmitEvent)=>callback_profile(event),
			focusout:(event:FocusEvent)=>callback_validate(event),
		}
	});
	renderDOM(uuid, block);
}

export default profile_form;
