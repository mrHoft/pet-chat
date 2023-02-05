import makePage from './make_page';
import * as utils from '../utils/utils';

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
			{'name':'Log in',		'onclick':"location.href='/login';"},
			{'name':'Sign up',		'onclick':"location.href='/sign-up';"},
			{'name':'Profile',		'onclick':"location.href='/profile';"},
			{'name':'Change password',		'onclick':"location.href='/password_change';"},
			{'name':'Chat',			'onclick':"location.href='/chat';"},
//			{'name':'Chat list',	'onclick':"location.href='/chatlist';"},
			{'name':'404',			'onclick':"location.href='/404';"},
			{'name':'500',			'onclick':"location.href='/500';"},
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
		'upper_frame':{
			'more_button':{
				'onclick': utils.details_switch
			}
		},
		'bottom_frame':{
			'message_box':{
				'onclick': utils.show_message
			}
		}
	});
	return true;
}

function chatlist() {
	makePage('chatlist');
	return true;
}
/*
function about() {
	let link = document.createElement('a');
	link.href = '#/';
	link.innerText = 'Home';

	let div = document.createElement('div');
	div.innerHTML = '<h1>About</h1>';
	div.appendChild(link);

	main.appendChild(div);
};
*/
const routes:Record<string, Function>={
	home,
	no_page,
	error_page,
	login,
	signup,
	profile,
	password_change,
	chat,
	chatlist,
};

export default routes;
