import * as classes from './.module.css';

type Params={
	name: string,
	onclick: string
};
function MainButton({name, onclick}:Params):string {
	return `<button class="${classes._button}" onclick="${onclick}">${name}</button>`;
}

export default (options:Params[])=>{
	let out='';
	options?.forEach(element => {
		out+=MainButton(element)+'\n';
	});
	return out;
}
