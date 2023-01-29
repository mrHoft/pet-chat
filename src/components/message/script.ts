// import template from './template.tmpl';
import Block from '../../services/block';
import * as classes from './.module.css';

function message(container:Element, text:string){
	const block=new Block('div',{
		name: 'message',
		class: classes.message,
		text: text
	});
	container.insertBefore(block.getContent(),container.firstChild)
}

export default message;
