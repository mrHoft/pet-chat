import template		from './template.tmpl';
import Component	from '../../../services/Component';
import {replaceDOM}	from '../../../services/render-dom';
import {callback_validate,validateFields} from '../../../utils/validation';
import Store		from '../../../services/Store/Store';
import connect		from '../../../services/Store/connect';
import Manager		from '../../../services/api/Manager';
import {formMessage}	from '../../../utils/chat_utils';

import {TProfile}	from '../../../services/api/types';

const store=new Store();
const manager=new Manager();

class ProfileForm extends Component{
	render() {
		return template;
	}
}

const mapUserToProps=(state:Indexed)=>state.user;

function renderUser(){
	console.log('...Update user profile');
	const userData=mapUserToProps(store.getState());
	if(userData){
		if(!userData.display_name) userData.display_name=`${userData.first_name} ${userData.second_name}`;
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
			if(avatar_el) avatar_el.style.backgroundImage=manager.resources(userData.avatar);
		}
	}
}

function callback_profile(event:SubmitEvent):boolean{
	event.preventDefault();
	event.stopPropagation();
	const element=event.target as HTMLFormElement;
	if(!element) throw new Error('Something went wrong');
	// const element:HTMLFormElement | null=document.getElementById('login_form') as HTMLFormElement;
	const form:FormData=new FormData(element);
	const data:TProfile={
		first_name:	String(form.get('first_name')),
		second_name:	String(form.get('second_name')),
		login:		String(form.get('login')),
		email:		String(form.get('email')),
		phone:		String(form.get('phone')),
		display_name:	String(form.get('display_name') || ''),
	};
	console.log(data);
	const validation:string=validateFields(data);
	console.log(`Validation: ${!validation}`);
	if(validation!=''){
		formMessage(element, validation);
		return false;
	}
	const manager=new Manager(); manager.updateProfile(data, element);
	return false;
}

function profileForm(uuid:string){
	const HOC=connect(ProfileForm as typeof Component, mapUserToProps);
	const block=new HOC('div', {
		id: 'form_profile',
		update:	renderUser,
		events:{
			submit:(event:SubmitEvent)=>callback_profile(event),
			focusout:(event:FocusEvent)=>callback_validate(event),
		},
	});
	replaceDOM(uuid, block);
	renderUser();
}

export default profileForm;
