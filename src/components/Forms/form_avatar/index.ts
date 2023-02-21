import template from './template.tmpl';
import Component from '../../../services/Component';
import {replaceDOM} from '../../../services/render-dom';
// import login_callback from '../../services/callbacks/callback-login';
// import {callback_validate} from '../../utils/validation';
import {Manager} from '../../../services/api/Manager';

class Avatar extends Component{
	render() {
		return template;
	}
}

function form_avatar(uuid:string){
	const block=new Avatar('div',{
		name: 'form_avatar',
		id: 'form_avatar',
		events:{
			change:(event:SubmitEvent)=>{
				const target=event.target as HTMLInputElement;
				const file=target.files? target.files[0] : null;
				if(file){
					const data=new FormData();
					data.append('avatar', file);
					const err_el=target.nextElementSibling;
					const manager=new Manager();
					manager.updateAvatar(data, err_el);
				}
			},
		}
	});
	replaceDOM(uuid, block);
}

export default form_avatar;
