import {show_message} from '../utils/utils';
import {HTTPTransport} from './transport';
import {validateLoginFields} from '../utils/validation';

function timed_message(element:HTMLFormElement, text:string):void{
	const collection:HTMLCollection=element.getElementsByClassName("err");
	const err_el=collection.item(collection.length-1) as HTMLElement;
	if(err_el){
		show_message(err_el, text, 'red');
		setTimeout(function(){show_message(err_el)}, 3000);
	}
}

function callback_login(event:SubmitEvent):boolean{
	event.preventDefault();
	const element=event.target as HTMLFormElement
	if(!element) throw new Error('Something went wrong');
	// const element:HTMLFormElement | null=document.getElementById('login_form') as HTMLFormElement;
	const form:FormData=new FormData(element);
	const data={
		'login': form.get('login'),
		'password': form.get('password')
	}
	console.log(data);
	
	const validation:string=validateLoginFields(data);
	console.log(`Validation: ${!validation}`);
	if(validation!=''){
		timed_message(element, validation);
		return false;
	}
	send_request(element,data);
	return false;
}

function send_request(element:HTMLFormElement, data:Record<string, unknown>){
	let status=500;
	const url='https://ya-praktikum.tech/api/v2/auth/signin';
	const headers={
		'Accept': 'application/json',
		'Content-Type': 'application/json'
		};

	const xhr=new HTTPTransport;
	xhr.post(url,{headers:headers, data:data, timeout:3000})
	.then((res)=>{
		status=res.status;
		return JSON.parse(res.response);
	})
	.then((res)=>{
		// console.log(res);
		timed_message(element, res.reason);;
		switch(status){
			case 200:
				console.log('Authorized!')
				break;
			case 401:
				console.log('Unauthorized');
				break;
			case 404:
				console.log('Not found');
				break;
			default:
				console.log('Unexpected error');
		}
	})
	.catch((err)=>{console.log(err)});
/*
	fetch(url,{
		method:'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			},
		body: JSON.stringify(data),
		// mode: 'cors',			//same-origin, no-cors
		// credentials: 'include',	//omit, same-origin, include
		// cache: 'default',		//no-store, reload, no-cache, force-cache, only-if-cached
	})
	.then((res)=>{
		status=res.status;
		console.log(res);
		return res.json();
	});
*/
}

export default callback_login;
