import * as routes from './routes.js';

function resolveRoute(route) {
	if(routes[route]) return routes[route];
	else return routes['no_page'];
};

function router(evt) {
	let url = window.location.hash.slice(1) || 'home';
	console.log(url);
	let route = resolveRoute(url);
	route();
};
export default router;