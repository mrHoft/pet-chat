import template from './template.tmpl';
import Block from '../../services/block';
import renderDOM from '../../services/render-dom';
import * as classes from './.module.css';

class Page extends Block{
	render() {
		return template;
	}
}

function search_form(uuid:string){
	const block=new Page('div',{
		name: 'search_form',
		class: classes.search_form,
		events:{
			// click:()=>console.log('click'),
			submit:(event:SubmitEvent)=>{
				event.preventDefault();
				console.log('search');
			},
		}
	});
	renderDOM(uuid, block);
}

export default search_form;
