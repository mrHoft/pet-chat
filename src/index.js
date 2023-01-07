import router from './modules/router.js';

(function(){	//IIFE example
	// console.log(globalThis.data);
	// document.querySelector('#main');
})();

window.addEventListener('load', router);
window.addEventListener('hashchange', router);