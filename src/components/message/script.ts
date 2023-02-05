// import template from './template.tmpl';
import Component from '../../services/Component';
import * as classes from './.module.css';

function message(container:Element, text:string){
	const block=new Component('div',{
		name: 'message',
		className: classes.message,
		text: text
	});
	container.insertBefore(block.getElement(),container.firstChild)
}

export default message;
