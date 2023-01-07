import addTemplate from './template.js';
let main = document.getElementById('main');

function makePage(name,props){
	if(name==undefined) name='no_page';
	main.innerHTML=`<div id="${name}"></div>`;
	addTemplate(name,props);
}

function no_page() {
	makePage();
};

function home() {
	makePage('home',{
		'buttons':[
			{'name':'Log in',		'onclick':"location.href='#login';"},
			{'name':'Sign up',		'onclick':"location.href='#signup';"},
			{'name':'Chat',			'onclick':"location.href='#chat';"},
			// {'name':'Chat list',	'onclick':"location.href='#chatlist';"},
			{'name':'404',			'onclick':"location.href='#404';"},
		]
	});
};

function login() {
	makePage('login');
};

function signup() {
	makePage('signup');
};
function chat() {
	makePage('chat');
};

function chatlist() {
	makePage('chatlist');
};
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
export {home,no_page,login,signup,chat,chatlist};