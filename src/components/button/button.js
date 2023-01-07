// import classes from './style.css';

function MainButton({ name, onclick }) {
	// console.log(classes);
	return (`<button class="main_button" onclick="${onclick}">${name}</button>`);
}

function AddButtons(data){
	let out='';
	data.forEach(element => {
		out+=MainButton(element)+'\n';
	});
	// console.log(out);
	return out;
}

export default AddButtons;