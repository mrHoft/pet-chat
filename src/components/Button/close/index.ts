import Component from '../../../services/Component';
import {replaceDOM} from '../../../services/render-dom';
import * as classes from './.module.css';

type ButtonProps={
	name:string,
	text:string,
	class?:string,
	events?:Record<string, unknown>
};

class CloseButton extends Component<ButtonProps>{
	constructor(props:ButtonProps) {
		super("button", props);
	}

	render():string {
		return this.props.text;
	}
}

function closeButton(uuid:string, props:Record<string, any>={}):void{
	const button = new CloseButton(<ButtonProps>{
		name: 'close_button',
		text: '&times;',
		className: classes.close_button,
		events:{
			click:()=>props['onclick'] ? props['onclick']() : window.router.go('/')
		}
	});
	replaceDOM(uuid, button);
}

export default closeButton;
