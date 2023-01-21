import addTemplate from './template.js';
let main = document.getElementById('main');

function makePage(name,props){
	if(name==undefined) {
		name='error_page';
		props={'text':'Page not found (404)'};
	}
	main.innerHTML=`<div id="${name}"></div>`;
	addTemplate(name,props);
}

function no_page() {
	makePage();
};

function error_page() {
	makePage('error_page',{'text':'Unexpected error (500)'});
};

function home() {
	makePage('home',{
		'buttons':[
			{'name':'Log in',		'onclick':"location.href='/login';"},
			{'name':'Sign up',		'onclick':"location.href='/signup';"},
			{'name':'Profile',		'onclick':"location.href='/profile';"},
			{'name':'Change password',		'onclick':"location.href='/password_change';"},
			{'name':'Chat',			'onclick':"location.href='/chat';"},
			// {'name':'Chat list',	'onclick':"location.href='#chatlist';"},
			{'name':'404',			'onclick':"location.href='/404';"},
			{'name':'500',			'onclick':"location.href='/error_page';"},
		]
	});
};

function login() {
	makePage('login');
}

function signup() {
	makePage('signup');
}

function profile(){
	makePage('profile');
}

function password_change(){
	makePage('password_change');
}

function chat() {
	makePage('chat',{
		'upper_frame':{
			'more':{
				'onclick': 'globalThis.utils.details_switch();'
			}
		}
	});
}

function chatlist() {
	makePage('chatlist');
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
export {
	home,
	no_page,
	error_page,
	login,
	signup,
	profile,
	password_change,
	chat,
	chatlist
};
