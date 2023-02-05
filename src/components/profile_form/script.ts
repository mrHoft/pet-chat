import template from './template.tmpl';
import Component from '../../services/Component';
import {replaceDOM} from '../../services/render-dom';
import {callback_validate} from '../../utils/validation';
import callback_profile from '../../services/callback-profile';

class ProfileForm extends Component{
	render() {
		return template;
	}
}

function profileForm(uuid:string){
	const block=new ProfileForm('div',{
		name: 'profile_form',
		events:{
			submit:(event:SubmitEvent)=>callback_profile(event),
			focusout:(event:FocusEvent)=>callback_validate(event),
		}
	});
	replaceDOM(uuid, block);
}

export default profileForm;
