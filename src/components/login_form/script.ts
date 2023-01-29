import template from './template.tmpl';
import Block from '../../services/block';
import renderDOM from '../../services/render-dom';
import login_callback from '../../services/callback-login';

class Page extends Block{
	render() {
		return template;
	}
}

function login_form(uuid:string){
	const block=new Page('div',{
		name: 'login_form',
		events:{
			// click:()=>console.log('click'),
			submit:(event:SubmitEvent)=>{
				login_callback(event);
			},
		}
	});
	renderDOM(uuid, block);
}

export default login_form;
