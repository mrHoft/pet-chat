// import templates from 'bundle-text:../pages/*.tmpl';
import templates from './templates_data';
import {v4 as makeUUID} from 'uuid';

let FLOW_DELAY=new Array();

function tmpl(name:string, options:any):string {
	let template=templates[name];
	if(template==undefined) throw new Error(`No such template: ${name}`)
	if(typeof template=='function') template=template(options);
	let rendered=template.toString()

	const components:string[] | null=rendered.match(/{{{(.*)}}}/g);
	if(components){
		components.forEach((tmpl_string:string) => {
			const name=tmpl_string.slice(3,tmpl_string.length-3)
			const uuid = makeUUID();
			rendered=rendered.replace(tmpl_string,`<section id='${uuid}'></section>`);
			const props=options? options[name] : {};
			FLOW_DELAY.push({name, uuid, props});
		});
	}

	const include:string[] | null=rendered.match(/{{(.*)}}/g);
	if(include){
		include.forEach((tmpl_string:string) => {
			const name=tmpl_string.slice(2,tmpl_string.length-2)
			rendered=rendered.replace(tmpl_string,tmpl(name, options? options[name] : {}));
		});
	}
	return rendered;
};

function addComponents(element:HTMLElement):void{
	FLOW_DELAY.forEach(({name, uuid, props})=>{
		// console.log(name,uuid);
		const component=templates[name];
		if(component==undefined) throw new Error(`No such component: ${name}`);
		if(typeof component!='function') throw new Error(`Invalid component: ${name}`);
		component(uuid, props);
	});
}

function addTemplate(name='home', options={}) {
	FLOW_DELAY=[];
	let element:HTMLElement | null=document.getElementById(name);
	if(element){
		element.innerHTML=tmpl(name, options);
		addComponents(element);
		return element;
	}else console.log("No root element: "+name);
};

export default addTemplate;
