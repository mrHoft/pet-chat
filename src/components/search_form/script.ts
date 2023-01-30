import template from './template.tmpl';
import Block from '../../services/block';
import renderDOM from '../../services/render-dom';
import * as classes from './.module.css';

class SearchForm extends Block{
	render() {
		return template;
	}
}

function searchForm(uuid:string){
	const block=new SearchForm('div',{
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

export default searchForm;
