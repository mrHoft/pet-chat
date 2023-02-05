// ==	Pages
/* Changed to Parcel bundle-text import
import home from '../pages/home.tmpl';
import error_page from '../pages/error_page.tmpl';
import login from '../pages/login.tmpl';
import signup from '../pages/signup.tmpl';
import profile from '../pages/profile.tmpl';
import password_change from '../pages/password_change.tmpl';
//		Main window
import chat from '../pages/chat.tmpl';
import bottom_frame from '../pages/bottom_frame.tmpl';
import details_frame from '../pages/details_frame.tmpl';
import side_frame from '../pages/side_frame.tmpl';
import upper_frame from '../pages/upper_frame.tmpl';
*/
// ==	Components
import buttons from '../components/button/script';
import add_text from '../components/add_text/script';
import close_button from '../components/close/script';
import more_button from '../components/more/script';
import attach_button from '../components/attach/script';
import login_form from '../components/login_form/script';
import signup_form from '../components/signup_form/script';
import search_form from '../components/search_form/script';
import profile_form from '../components/profile_form/script';
import password_form from '../components/password_form/script';
import message_box from '../components/message_box/script';
// ==	Test
// import test from '../components/test';

const templates:Record<string, Function | string>={
//	Pages
/*
	bottom_frame,
	details_frame,
	side_frame,
	upper_frame,
	error_page,
	chat,
	home,
	login,
	signup,
	profile,
	password_change,
*/
//	Components
	text:				add_text,
	buttons,
	close_button,
	more_button,
	attach_button,
	login_form,
	signup_form,
	search_form,
	profile_form,
	password_form,
	message_box,
};

export default templates;
