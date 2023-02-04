import Block from '../../services/block';
import renderDOM from '../../services/render-dom';
import * as classes from './.module.css';

type ButtonProps={
	name:string,
	text:string,
	class?:string,
	events?:Record<string, unknown>
};

class AttachmentButton extends Block<ButtonProps> {
	constructor(props:ButtonProps) {
		super("button", props);
	}

	render():string {
		if(this.props.text){
			return this.props.text;
		}else return '';
	}
}

function attachmentButton(uuid:string, props:Record<string, any>={}):void{
	const button=new AttachmentButton(<ButtonProps>{
		name: 'attach_button',
		text: '&nbsp;',
		class: classes.attach_button,
		events:{
			click:()=>props['onclick'] ? props['onclick']() : window.open('#', '_self')
		}
	});
	renderDOM(uuid, button);
}

export default attachmentButton;
