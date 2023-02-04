import Block from '../../services/block';
import renderDOM from '../../services/render-dom';
import * as classes from './.module.css';

type ButtonProps={
	name:string,
	text:string,
	class?:string,
	events?:Record<string, unknown>
};

function moreButton(uuid:string, props:Record<string, any>={}):void{
	// console.log(props);
	const button = new Block('button',<ButtonProps>{
		name: 'more_button',
		text: '&#9776;',
		class: classes.more_button,
		events:{
			click:()=>props['onclick'] ? props['onclick']() : window.open('/', '_self')
		}
	});
	renderDOM(uuid, button);
}

export default moreButton;
