import Router from './modules/Router';
import routes from './modules/routes_data';

const router=Router.get(".app");
router
	.use('/', routes.home)
	.use('/404', routes.no_page)
	.use('/500', routes.error_page)
	.use('/login', routes.login)
	.use('/sign-up', routes.signup)
	.use('/profile', routes.profile)
	.use('/password_change', routes.password_change)
	.use('/chat', routes.chat)
	.start();
