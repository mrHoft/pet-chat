// import {sum} from './modules/sum';
// import MainButton from './components/button/button.jsx';
const {tmpl}=require('./modules/template.js');

function App(){
	return tmpl('home');
		// <div className="app">
		// 	<h1>Hello</h1>
		// 	<MainButton style={{marginTop:30}} onClick={()=>console.log('Click')}>Button</MainButton>
		// </div>
}

// const root = document.querySelector('#root');
// root.innerHTML=App();
// root.textContent = sum(6, -1).toString();
module.exports={App};