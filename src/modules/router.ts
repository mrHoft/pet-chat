import * as routes from './routes_data';

function resolveRoute(route:string) {
	if(routes[route]) return routes[route];
	else return routes['no_page'];
};

function router(evt:Event):void {
	// let url=window.location.hash.slice(1) || 'home';
	let url:string=window.location.pathname.replace(/^\/|\/$/, '') || 'home';
	console.log(`Route: ${url}`);
	let route=resolveRoute(url);
	route();
};

export default router;
