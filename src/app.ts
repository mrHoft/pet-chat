import router from './modules/router';
import login_callback from './services/callback-login';
import * as utils from './utils/utils';
import * as transport from './services/transport';

const ut:Record<string, Function> = {
	login: login_callback,
	details_switch: utils.details_switch,
	message: utils.show_message,
	transport: transport.HTTPTransport,
	fetchWithRetry: transport.fetchWithRetry
};

(globalThis as any).utils=ut;

window.addEventListener('load', router);
// window.addEventListener('hashchange', router);
