import templates from 'bundle-text:./pages/*.tmpl';
import components from './components_data';
import {v4 as makeUUID} from 'uuid';
import Queue from '../services/Queue';

let FLOW_DELAY=new Queue();
type NodeParams={
	name:string,
	uuid:string,
	props:any
}

function tmpl(name:string, options:any):string {
	let template=templates[name as keyof typeof templates];
	if(template==undefined) throw new Error(`No such template: ${name}`)
	// if(typeof template=='function') template=template(options);
	let rendered=template.toString()

	//Adding temporary sections for a future components
	const components:string[] | null=rendered.match(/{{{(.*)}}}/g);
	if(components){
		components.forEach((tmpl_string:string) => {
			const name:string=tmpl_string.slice(3,tmpl_string.length-3)
			const uuid:string=makeUUID();
			rendered=rendered.replace(tmpl_string,`<section id='${uuid}'></section>`);
			const props=options? options[name] : {};
			FLOW_DELAY.enqueue({name, uuid, props});
		});
	}

	//Include possible page parts using closure
	const include:string[] | null=rendered.match(/{{(.*)}}/g);
	if(include){
		include.forEach((tmpl_string:string) => {
			const name=tmpl_string.slice(2,tmpl_string.length-2)
			rendered=rendered.replace(tmpl_string,tmpl(name, options? options[name] : {}));
		});
	}
	return rendered;
};

function addComponents():void{
	while(!FLOW_DELAY.isEmpty()){
		const node:NodeParams=FLOW_DELAY.dequeue()?.value;
		const {name, uuid, props}:NodeParams=node;
		// console.log(name, uuid, props);
		const component=components[name];
		if(component==undefined) throw new Error(`No such component: ${name}`);
		if(typeof component!='function') throw new Error(`Invalid component: ${name}`);
		component(uuid, props);
	};
}

function addTemplate(name='home', options={}) {
	FLOW_DELAY.clear();
	let element:HTMLElement | null=document.getElementById(name);
	if(element){
		element.innerHTML=tmpl(name, options);
		addComponents();
		return element;
	}else console.log("No root element: "+name);
};

export default addTemplate;
