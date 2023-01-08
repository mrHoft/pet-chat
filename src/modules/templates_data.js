// ==	Pages
import home from '../pages/home.js';
import error_page from '../pages/error_page.js';
import login from '../pages/login.js';
import signup from '../pages/signup.js';
import profile from '../pages/profile.js';
import password_change from '../pages/password_change.js';
//		Main window
import chat from '../pages/chat.js';
import bottom_frame from '../pages/bottom_frame.js';
import {details_frame} from '../pages/details_frame.js';
import side_frame from '../pages/side_frame.js';
import upper_frame from '../pages/upper_frame.js';
// ==	Components
import AddButtons from '../components/button/button.js';
import CloseButton from '../components/close/close.js';
import MoreButton from '../components/more/more.js';
import AttachButton from '../components/attach/attach.js';
import AddText from '../components/add_text.js';

const templates=new Object(
	{
	'bottom_frame':		bottom_frame,
	'details_frame':	details_frame,
	'side_frame':		side_frame,
	'upper_frame':		upper_frame,
	'error_page':		error_page,
	'chat':				chat,
	'home':				home,
	'login':			login,
	'signup':			signup,
	'profile':			profile,
	'password_change':	password_change,
	'close':			CloseButton,
	'more':				MoreButton,
	'attachment':		AttachButton,
	'buttons':			AddButtons,
	'text':				AddText,
	}
);

export default templates;
