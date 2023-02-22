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
import buttons		from '../components/Button/buttons';
import add_text		from '../components/add_text';
import close_button	from '../components/Button/close';
import more_button	from '../components/Button/more';
import attach_button from '../components/Button/attach';
import form_login	from '../components/Forms/form_login';
import form_signup	from '../components/Forms/form_signup';
import form_search	from '../components/Forms/form_search';
import form_profile	from '../components/Forms/form_profile';
import form_password from '../components/Forms/form_password';
import form_avatar from '../components/Forms/form_avatar';
import message_box	from '../components/Messages/message_box';
import messages_frame from '../components/Messages/message_list';
import chats_frame from '../components/Chat/chat_list';
import chat_header from '../components/Chat/header';
import chat_details from '../components/Chat/details';
import chat_delete from '../components/Chat/delete';
import chat_users from '../components/Chat/user_list';
import add_user_list from '../components/Users/add_user_list';
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
	form_login,
	form_signup,
	form_search,
	form_profile,
	form_password,
	form_avatar,
	message_box,
	messages_frame,
	chats_frame,
	chat_header,
	chat_details,
	chat_delete,
	chat_users,
	add_user_list,
};

export default templates;
