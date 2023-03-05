// ==	Pages
// Changed from Parcel bundle-text import
import bottom_frame from './pages/bottom_frame.tmpl';
import chat from './pages/chat.tmpl';
import details_frame from './pages/details_frame.tmpl';
import error_page from './pages/error_page.tmpl';
import home from './pages/home.tmpl';
import login from './pages/login.tmpl';
import modal_add_user from './pages/modal_add_user.tmpl';
import modal_more from './pages/modal_more.tmpl';
import password_change from './pages/password_change.tmpl';
import profile from './pages/profile.tmpl';
import side_frame from './pages/side_frame.tmpl';
import signup from './pages/signup.tmpl';
import upper_frame from './pages/upper_frame.tmpl';

const templates:Record<string, Function | string>={
	bottom_frame,
	chat,
	details_frame,
	error_page,
	home,
	login,
	modal_add_user,
	modal_more,
	password_change,
	profile,
	side_frame,
	signup,
	upper_frame,
	test: '<h1>TestPage</h1>',
};

export default templates;
