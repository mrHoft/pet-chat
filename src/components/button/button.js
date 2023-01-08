// import classes from './style.css';

function MainButton({ name, onclick }) {
	return (`<button class="main_button" onclick="${onclick}">${name}</button>`);
}

function AddButtons(options){
	let out='';
	if(options){
		options.forEach(element => {
			out+=MainButton(element)+'\n';
		});
	}
	// console.log(out);
	return out;
}

export default AddButtons;
