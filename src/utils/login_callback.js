import {show_message} from './utils.js'

function login_callback(){
	let status=500;
	const element=document.getElementById('login_form');
	const form=new FormData(element);
	const data={
		'login': form.get('login'),
		'password': form.get('password')
	}
	const collection=element.getElementsByClassName("err");

	fetch('https://ya-praktikum.tech/api/v2/auth/signin',{
		method:'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			},
		body: JSON.stringify(data),
		// withCredentials: true,
	})
	.then((res)=>{
		status=res.status;
		return res.json();
	})
	.then((res)=>{
		show_message(collection[0],res.reason);
		switch(status){
			case 200:
				console.log('Authorized!')
				break;
			case 401:
				console.log('Unauthorized');
				break;
			default:
				console.log('Unexpected error');
		}
	})
	.catch((err)=>{console.log(err)});

	return false;	//Prevent HTML form submit
}

export default login_callback;
