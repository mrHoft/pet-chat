import Component from '../../../services/Component';
import {replaceDOM} from '../../../services/render-dom';
import * as classes from './.module.css';

type ButtonProps={
	name:string,
	text:string,
	class?:string,
	events?:Record<string, unknown>
};

function moreButton(uuid:string, props:Record<string, any>={}):void{
	// console.log(props);
	const button = new Component('button',<ButtonProps>{
		name: 'more_button',
		text: '&#9776;',
		className: classes.more_button,
		events:{
			click:()=>props['onclick'] ? props['onclick']() : window.router.go('/')
		}
	});
	replaceDOM(uuid, button);
}

export default moreButton;
