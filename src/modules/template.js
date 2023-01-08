// import templates from 'bundle-text:../pages/*.tmpl';
import templates from './templates_data.js'

function tmpl(name, options) {
	if (templates[name]==undefined) throw new Error(`No such template: ${name}`)
	// console.log(name, options);
	const template=typeof templates[name] == 'function' ? templates[name](options) : templates[name];
	let rendered=template.toString()

	const include=rendered.match(/{{(.*)}}/g);
	if(include){
		include.forEach(tmpl_string => {
			const name=tmpl_string.slice(2,tmpl_string.length-2)
			rendered=rendered.replace(tmpl_string,tmpl(name,options? options[name] : {}));
		});
	}
	return rendered;
};

function addTemplate(name='home', options={}) {
	let element = document.getElementById(name);
	element.innerHTML=tmpl(name, options);
	return element;
};

export default addTemplate;
