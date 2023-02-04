import {show_message} from './utils';

const Marks={
	error: '&#9888; ',
	valid: '&#x2714; '
}

const Messages={
	'first_name':	'First name is incorrect',
	'second_name':	'Second name is incorrect',
	'login':		'Login is incorrect',
	'email':		'Wrong e-mail',
	'phone':		'Wrong phone number',
	'password':		'Wrong password',
	'psw-repeat':	'Passwords do not match',
	'display_name':	'Name is incorrect',
}

const checkName=(value:string)=>(value.length>=3 && value.match(/^[A-Za-zА-Яа-яЁё]+$/));
const checkLogin=(value:string)=>(value.length>=4 && value.match(/^[A-Za-z0-9_]+$/));
const checkEmail=(value:string)=>(value.length!= 0 && value.match(/^[A-Za-z\._\-[0-9]+[@][A-Za-z\._\-[0-9]+[\.][a-z]{2,4}$/));
const checkPassword=(value:string)=>(value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/));
const checkPhone=(value:string)=>(value.replace(/\s+/g, '').replace('(', '').replace(')', '').replace('+', '').match(/^[0-9]{11}$/));

function validateName(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	const err_el=element.nextElementSibling;
	const value=element.value;
	if(!checkName(value)) {
		show_message(err_el, Marks.error+Messages.first_name, 'red');
		return 1;
	}
	// if (!value(/^[A-Za-z]+\s{1}[A-Za-z]+$/)) {}
	show_message(err_el, Marks.valid, 'green');
	return 0;
}

function validateLogin(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	const err_el=element.nextElementSibling;
	const value=element.value;
	if(value.length<4){
		show_message(err_el, Marks.error+'Minimum four characters', 'red');
		return 1;
	}
	if(!checkLogin(value)){
		show_message(err_el, Marks.error+'Wrong characters', 'red');
		return 1;
	}
	show_message(err_el, Marks.valid, 'green');
	return 0;
}

function validateEmail(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	const err_el=element.nextElementSibling;
	const value=element.value;
	if(!checkEmail(value)) {
		show_message(err_el, Marks.error+Messages.email, 'red');
		return 1;
	}
	show_message(err_el, Marks.valid, 'green');
	return 0;
}

function validatePassword(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	const err_el=element.nextElementSibling;
	const value=element.value;
	if(value.length<8) {
		show_message(err_el, Marks.error+'Minimum eight characters', 'red');
		return 1;
	}
	if(!checkPassword(value)) {	//Minimum eight characters, at least one letter and one number
		show_message(err_el, Marks.error+'At least one letter and one number', 'red');
		return 1;
	}
	show_message(err_el, Marks.valid, 'green');
	return 0;
}

function validatePassword2(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	const err_el=element.nextElementSibling;
	const password=element.previousElementSibling?.previousElementSibling as HTMLInputElement;
	const value=element.value;
	if(!(password && value.length>=8 && value===password.value)) {
		show_message(err_el, Marks.error+Messages['psw-repeat'], 'red');
		return 1;
	}
	show_message(err_el, Marks.valid, 'green');
	return 0;
}

function validatePhone(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	const err_el=element.nextElementSibling;
	let value=element.value;
	value=value.replace(/\s+/g, '').replace('(', '').replace(')', '').replace('+', '');
	if(!value.match(/^[0-9]{11}$/)) {
		show_message(err_el, Marks.error+'Wrong phone number', 'red');
		return 1;
	}
	if(element && value.length>4 && value.match(/^[0-9]*$/)) {
		element.value='+'+value.charAt(0)+'('+value.substring(1,4)+')'+ (value.length<8 && value.substring(4) || value.substring(4,7)+' '+(value.length<10 && value.substring(7) || value.substring(7,9)+' '+value.substring(9)));
	}
	show_message(err_el, Marks.valid, 'green');
	return 0;
}

function validateMessage(value:string) {
	var required = 1;
	var left = required - value.length;
	if (left > 0) {
		alert('Message can not be blank');
		return 1;
	}
	return 0;
}

function validateFields(data:any) {
	if(!checkName(data['first_name'] || '')) return Messages['first_name'];
	if(!checkName(data['second_name'] || '')) return Messages['second_name'];
	if(!checkLogin(data['login'] || '')) return Messages['login'];
	if(!checkEmail(data['email'] || '')) return Messages['email'];
	if(!checkPhone(data['phone'] || '')) return Messages['phone'];
	if(data['display_name']!='' && !checkName(data['display_name'] || '')) return Messages['display_name'];
	return '';
}

function validateSecurityFields(data:any) {
	if(!checkPassword(data['password'] || '')) return Messages['password'];
	if(data['password']!=data['psw-repeat']) return Messages['psw-repeat'];
	return '';
}

function validateLoginFields(data:any) {
	if(!checkLogin(data['login'] || '')) return Messages['login'];
	if(!checkPassword(data['password'] || '')) return Messages['password'];
	return '';
}

function callback_validate(event:FocusEvent){
	event.stopPropagation();
	if(!event.target) return false;
	const target=event.target as HTMLInputElement;
	if(target.name=='') return false;
	console.log(target.name);
	switch(target.name){
		case 'first_name':
			validateName(target);
			break;
		case 'second_name':
			validateName(target);
			break;
		case 'login':
			validateLogin(target);
			break;
		case 'email':
			validateEmail(target);
			break;
		case 'phone':
			validatePhone(target);
			break;
		case 'password':
			validatePassword(target);
			break;
		case 'psw-repeat':
			validatePassword2(target);
			break;
		default:
			console.log('Unexpected error');
	}
}

export {callback_validate, validateMessage, validateFields, validateSecurityFields, validateLoginFields};
