import Block from '../../services/block';
import renderDOM from '../../services/render-dom';
import * as classes from './.module.css';

class Button extends Block {
	constructor(props) {
		super("button", props);
	}

	render():string {
		return this.props.text as string;
	}
}

function more_button(uuid:string, props={}):void{
	// console.log(props);
	const button = new Button({
		name: 'more_button',
		text: '&#9776;',
		class: classes.more_button,
		events:{
			click:()=>props['onclick'] ? props['onclick']() : window.open('/', '_self')
		}
	});
	renderDOM(uuid, button);
}

export default more_button;
