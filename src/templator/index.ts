import addTemplate from './template';
const main = document.getElementById('main');

function makePage(name:string='',props:Record<string, unknown>={}):void{
	if(!name) {
		name='error_page';
		props={'text':'Page not found (404)'};
	}
	main!.innerHTML=`<div id="${name}"></div>`;
	addTemplate(name,props);
}

export default makePage;
