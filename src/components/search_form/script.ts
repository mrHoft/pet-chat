import template from './template.tmpl';
import Component from '../../services/Component';
import {replaceDOM} from '../../services/render-dom';
import * as classes from './.module.css';

class SearchForm extends Component{
	render() {
		return template;
	}
}

function searchForm(uuid:string){
	const block=new SearchForm('div',{
		name: 'search_form',
		className: classes.search_form,
		events:{
			// click:()=>console.log('click'),
			submit:(event:SubmitEvent)=>{
				event.preventDefault();
				console.log('search');
			},
		}
	});
	replaceDOM(uuid, block);
}

export default searchForm;
