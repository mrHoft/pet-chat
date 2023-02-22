import template		from './template.tmpl';
import Component	from '../../../services/Component';
import {replaceDOM}	from '../../../services/render-dom';
import {callback_validate} from '../../../utils/validation';
import callback_profile from './callback-profile';
import Store from '../../../services/Store/Store';
import connect		from '../../../services/Store/connect';

const store=new Store();

class ProfileForm extends Component{
	render() {
		return template;
	}
}

const mapUserToProps=(state:Indexed)=>state.user;

function profileForm(uuid:string){
	const HOC=connect(ProfileForm as typeof Component, mapUserToProps);
	const block=new HOC('div', {
	// const block=new ProfileForm('div',{
		name: 'form_profile',
		id: 'form_profile',
		update:	renderUser,
		events:{
			submit:(event:SubmitEvent)=>callback_profile(event),
			focusout:(event:FocusEvent)=>callback_validate(event),
		}
	});
	replaceDOM(uuid, block);
	renderUser();
}

function renderUser(){
	console.log('...Update user profile');
	const userData=mapUserToProps(store.getState());
	if(userData){
		if(!userData.display_name) userData.display_name=userData.first_name+' '+userData.second_name;
		const form=document.getElementById('form_profile');
		const collection=form?.getElementsByTagName('input');
		if(collection){
			Object.keys(userData).forEach((key:string)=>{
				for (let i=0; i < collection.length; i++){
					if(collection[i].name==key){
						collection[i].value=String(userData[key]);
					}
				}
			});
		}
		if(userData.avatar){
			const avatar_el=document.querySelector('.profile-avatar') as HTMLDivElement;
			if(avatar_el) avatar_el.style.backgroundImage=`url("https://ya-praktikum.tech/api/v2/resources${userData.avatar}")`;
		}
	}
}

export default profileForm;
