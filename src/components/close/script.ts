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

function close_button(uuid:string, props={}):void{
	const button = new Button({
		name: 'close_button',
		text: '&times;',
		class: classes.close_button,
		events:{
			click:()=>window.open('/', '_self')
		}
	});
	renderDOM(uuid, button);
}

export default close_button;
