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

function attach_button(uuid:string, props={}):void{
	const button = new Button({
		name: 'attach_button',
		text: '&nbsp;',
		class: classes.attach_button,
		events:{
			click:()=>props['onclick'] ? props['onclick']() : window.open('#', '_self')
		}
	});
	renderDOM(uuid, button);
}

export default attach_button;
