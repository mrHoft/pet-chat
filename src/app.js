import router from './modules/router.js';
import login_callback from './utils/login_callback.js';
import {details_switch} from './pages/details_frame.js';

globalThis.utils=new Object({
	'login':			login_callback,
	'details_switch':	details_switch
});

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
