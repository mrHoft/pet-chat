import template from './template.tmpl';
import Component from '../../../services/Component';
import {replaceDOM} from '../../../services/render-dom';
import login_callback from './callback-login';
import {callback_validate} from '../../../utils/validation';

class Page extends Component{
	render() {
		return template;
	}
}

function login_form(uuid:string){
	const block=new Page('div',{
		name: 'login_form',
		events:{
			// click:()=>console.log('click'),
			blur:(event:FocusEvent)=>{console.log(event)},
			focusout:(event:FocusEvent)=>callback_validate(event),
			submit:(event:SubmitEvent)=>{
				login_callback(event);
			},
		}
	});
	replaceDOM(uuid, block);
}

export default login_form;
