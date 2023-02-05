import routes from './routes_data';

function resolveRoute(route:string) {
	if(routes[route]) return routes[route];
	else return routes['no_page'];
};

function router(evt:Event):void {
	let url:string=window.location.pathname.replace(/^\/|\/$/, '') || 'home';
	console.log(`Route: ${url}`);
	let route=resolveRoute(url);
	route();
};

window.addEventListener('load', router);
// window.addEventListener('hashchange', router);

export default router;
