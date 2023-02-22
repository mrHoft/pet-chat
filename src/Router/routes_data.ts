import makePage from '../templator';
import * as utils from '../utils/chat_utils';
import Store from '../services/Store/Store';
import {detailsSwitch} from '../utils/chat_utils';
import { Manager } from '../services/api/Manager';
import startChatChangeListener from '../services/Store';

const store=new Store();
const manager=new Manager();

function no_page() {
	makePage();
	return true;
};

function error_page() {
	makePage('error_page',{'text':'Unexpected error (500)'});
};

function home() {
	makePage('home',{
		'buttons':[
			{'name':'Log in',		'onclick':"window.router.go('/login');"},
			{'name':'Sign up',		'onclick':"window.router.go('/sign-up');"},
			{'name':'Profile',		'onclick':"window.router.go('/profile');"},
			{'name':'Change password',		'onclick':"window.router.go('/password_change');"},
			{'name':'Chat',			'onclick':"window.router.go('/chat');"},
//			{'name':'Chat list',	'onclick':"location.href='/chatlist';"},
			{'name':'404',			'onclick':"window.router.go('/404');"},
			{'name':'500',			'onclick':"window.router.go('/500');"},
//			{'name':'Test',			'onclick':"location.href='/test';"},
		]
	});
	return true;
};

function login() {
	makePage('login');
	return true;
}

function signup() {
	makePage('signup');
	return true;
}

function profile(){
	makePage('profile');
	return true;
}

function password_change(){
	makePage('password_change');
	return true;
}

function chat() {
	makePage('chat',{
		'side_frame':{
			'more_button':{
				'onclick': ()=>{document.getElementById('modal_more')!.style.display='block';}
			}
		},
		'upper_frame':{
			'more_button':{
				'onclick': utils.detailsSwitch
			}
		},
		'bottom_frame':{
			'message_box':{
				'onclick': utils.showMessage
			}
		},
		'modal_more':{
			'close_button':{
				'onclick': ()=>{document.getElementById('modal_more')!.style.display='none';}
			},
			'buttons':[
				{'name':'Profile',		'onclick':"window.router.go('/profile');"},
				{'name':'Log out',		'onclick':"window.logout();"},
			]
		},
		'modal_add_user':{
			'close_button':{
				'onclick': ()=>{document.getElementById('modal_add_user')!.style.display='none';}
			}
		}
	});

	//Check saved Details frame state
	const details=store.getState().details;
	if(details!=undefined) detailsSwitch(details);

	//Prepare chats state
	async function start(){
		await manager.getChatsInfo();
		startChatChangeListener();
	}
	start();

	return true;
}

function start(){
	if(store.getState()?.user)
		chat();
	else
		login();
}

const routes:Record<string, Function>={
	start,
	home,
	no_page,
	error_page,
	login,
	signup,
	profile,
	password_change,
	chat,
};

export default routes;
