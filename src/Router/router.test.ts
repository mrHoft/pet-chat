import Router	from './Router';

describe('Router', () => {
	const router=Router.get('.app');
	test('Initialize', () => {
		router
			.use('/', ()=>'routes.start')
			.use('/home', ()=>'routes.home')
			.use('/500', ()=>'routes.error_page')
			.start();

		expect(router.getRoute('/')?._page()).toBe('routes.start');
	});
	test('Using routes', () => {
		expect(router.getRoute()?._pathname).toBe('/');
		router.go('/home');
		expect(router.getRoute()?._pathname).toBe('/home');
		router.go('/500');
		expect(router.getRoute()?._pathname).toBe('/500');
	});
});
