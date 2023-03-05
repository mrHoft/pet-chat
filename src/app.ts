import Router		from './Router/Router';
import routes		from './Router/routes_data';
import Store 		from './services/Store/Store';
import Manager		from './services/api/Manager';
import newChat		from './services/api/newChat';
import searchUser	from './services/api/searchUser';

declare global {
	interface Window {
		AppStore:any;
		router:Router;
		logout:Function;
		newChat:Function;
		searchUser:Function;
	}
}

window.AppStore=Store;

const manager=new Manager();
window.logout=()=>manager.logout();
window.newChat=newChat;
window.searchUser=searchUser;

// Router initialization that uses functions from
// 'routes' to render corresponding page
const router=Router.get('.app');
window.router=router;
router
	.use('/', routes.start)
	.use('/home', routes.home)
	.use('/404', routes.no_page)
	.use('/500', routes.error_page)
	.use('/login', routes.login)
	.use('/sign-up', routes.signup)
	.use('/profile', routes.profile)
	.use('/password_change', routes.password_change)
	.use('/chat', routes.chat)
	.start();
