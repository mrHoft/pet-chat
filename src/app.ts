import router from './modules/router.js';
import login_callback from './services/login_callback';
import { details_switch } from './utils/utils';

globalThis.utils = {
	login: login_callback,
	details_switch
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
