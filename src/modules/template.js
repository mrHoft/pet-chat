import * as template from 'bundle-text:../pages/*.tmpl';
import AddButtons from '../components/button/button.js';
import CloseButton from '../components/close/close.js';
import MoreButton from '../components/more/more.js';
import AttachButton from '../components/attach/attach.js';

function tmpl(name='home', options={}) {
	let rendered=template[name].toString()
		.replace('{{close}}', CloseButton())
		.replace('{{more}}', MoreButton())
		.replace('{{attachment}}', AttachButton());
	if(options.buttons){
		rendered=rendered.replace('{{buttons}}', AddButtons(options.buttons));
	}

	let include=rendered.match(/{{(.*)}}/g);
	if(include){
		console.log(include);
		include.forEach(name => {
			rendered=rendered.replace(name,tmpl(name.slice(2,name.length-2)));
		});
	}
	return rendered;
};

function addTemplate(name='home', options={}) {
	let element = document.getElementById(name);
	// console.log(element);
	element.innerHTML=tmpl(name, options);
	return element;
};

export default addTemplate;