import * as classes from './.module.css';

function MainButton({ name, onclick }):string {
	return `<button class="${classes._button}" onclick="${onclick}">${name}</button>`;
}

export default (options)=>{
	let out='';
	if(options){
		options.forEach(element => {
			out+=MainButton(element)+'\n';
		});
	}
	// console.log(out);
	return out;
}
