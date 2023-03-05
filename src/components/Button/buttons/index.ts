import classes from './.module.css';

type Params={
	name: string,
	onclick: string
};
function MainButton({name, onclick}:Params):string {
	return `<button class="${classes._button}" onclick="${onclick}">${name}</button>`;
}

export default (uuid:string, options:Params[])=>{
	let out='';
	// console.log(uuid,options);
	options?.forEach((element:Params) => {
		out+=`${MainButton(element)}\n`;
	});
	const parent=uuid[0]=='.' ? document.querySelector(uuid) : document.getElementById(uuid);
	if(parent){
		parent.innerHTML=out;
	}
};
