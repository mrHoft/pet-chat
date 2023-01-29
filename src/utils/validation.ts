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
		globalThis.utils.message(err_el, Marks.error+Messages.first_name, 'red');
		return 1;
	}
	// if (!value(/^[A-Za-z]+\s{1}[A-Za-z]+$/)) {}
	globalThis.utils.message(err_el, Marks.valid, 'green');
	return 0;
}

function validateLogin(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	const err_el=element.nextElementSibling;
	const value=element.value;
	if(value.length<4){
		globalThis.utils.message(err_el, Marks.error+'Minimum four characters', 'red');
		return 1;
	}
	if(!checkLogin(value)){
		globalThis.utils.message(err_el, Marks.error+'Wrong characters', 'red');
		return 1;
	}
	globalThis.utils.message(err_el, Marks.valid, 'green');
	return 0;
}

function validateEmail(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	const err_el=element.nextElementSibling;
	const value=element.value;
	if(!checkEmail(value)) {
		globalThis.utils.message(err_el, Marks.error+Messages.email, 'red');
		return 1;
	}
	globalThis.utils.message(err_el, Marks.valid, 'green');
	return 0;
}

function validatePassword(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	const err_el=element.nextElementSibling;
	const value=element.value;
	if(value.length<8) {
		globalThis.utils.message(err_el, Marks.error+'Minimum eight characters', 'red');
		return 1;
	}
	if(!checkPassword(value)) {	//Minimum eight characters, at least one letter and one number
		globalThis.utils.message(err_el, Marks.error+'At least one letter and one number', 'red');
		return 1;
	}
	globalThis.utils.message(err_el, Marks.valid, 'green');
	return 0;
}

function validatePassword2(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	const err_el=element.nextElementSibling;
	const password=element.previousElementSibling?.previousElementSibling as HTMLInputElement;
	const value=element.value;
	if(!(password && value.length>=8 && value===password.value)) {
		globalThis.utils.message(err_el, Marks.error+Messages['psw-repeat'], 'red');
		return 1;
	}
	globalThis.utils.message(err_el, Marks.valid, 'green');
	return 0;
}

function validatePhone(element:HTMLInputElement | undefined):number {
	if(!element) return 1;
	// const err_el=element.nextElementSibling;
	let value=element.value;
	value=value.replace(/\s+/g, '').replace('(', '').replace(')', '').replace('+', '');
	if(!value.match(/^[0-9]{11}$/)) {
		// globalThis.utils.message(err_el, Marks.error+'Wrong phone number', 'red');
		return 1;
	}
	if(element && value.length>4 && value.match(/^[0-9]*$/)) {
		element.value='+'+value.charAt(0)+'('+value.substring(1,4)+')'+ (value.length<8 && value.substring(4) || value.substring(4,7)+' '+(value.length<10 && value.substring(7) || value.substring(7,9)+' '+value.substring(9)));
	}
	// globalThis.utils.message(err_el, Marks.valid, 'green');
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

function validateFields(data) {
	if(!checkName(data['first_name'] || '')) return Messages['first_name'];
	if(!checkName(data['second_name'] || '')) return Messages['second_name'];
	if(!checkLogin(data['login'] || '')) return Messages['login'];
	if(!checkEmail(data['email'] || '')) return Messages['email'];
	if(!checkPhone(data['phone'] || '')) return Messages['phone'];
	if(data['display_name']!='' && !checkName(data['display_name'] || '')) return Messages['display_name'];
	return '';
}

function validateSecurityFields(data) {
	if(!checkPassword(data['password'] || '')) return Messages['password'];
	if(data['password']!=data['psw-repeat']) return Messages['psw-repeat'];
	return '';
}

function callback_validate(event:FocusEvent){
	event.stopPropagation();
	if(!event.target) return false;
	const target=event.target as HTMLInputElement;
	if(target.name=='') return false;
	let decline=0;
	console.log(target.name);
	switch(target.name){
		case 'first_name':
			decline+=validateName(target);
			break;
		case 'second_name':
			decline+=validateName(target);
			break;
		case 'login':
			decline+=validateLogin(target);
			break;
		case 'email':
			decline+=validateEmail(target);
			break;
		case 'phone':
			decline+=validatePhone(target);
			break;
		case 'password':
			decline+=validatePassword(target);
			break;
		case 'psw-repeat':
			decline+=validatePassword2(target);
			break;
		default:
			console.log('Unexpected error');
	}
}

export {callback_validate, validateMessage, validateFields, validateSecurityFields};
