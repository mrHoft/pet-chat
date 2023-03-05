import Store from '../Store/Store';
import {AuthAPI, ChatAPI, UserAPI} from '.';
import {timedMessage, formMessage} from '../../utils/chat_utils';
import {
	TProfile,
	TSignIn,
	TSignUp,
	TChatUsers,
	TChat,
	TPassword,
} from './types';

export default class Manager{
	private static _instance:Manager;

	public BASE_URL:string='https://ya-praktikum.tech/api/v2';

	protected store:Store;

	protected Auth:AuthAPI;

	protected Chat:ChatAPI;

	protected User:UserAPI;
	// private static _socket: WebSocket;
	// private static _socketPingInterval: number;

	constructor() {
		if(Manager._instance) return Manager._instance;
		Manager._instance = this;

		this.store=new Store();
		this.Auth=new AuthAPI(this.BASE_URL);
		this.Chat=new ChatAPI(this.BASE_URL);
		this.User=new UserAPI(this.BASE_URL);
	}

	public resources(url:string):string{
		return `url("${this.BASE_URL}/resources${url}")`;
	}

/*
	private resolveStatus(status:number){
		switch(status){
			case 200: console.warn('Authorized!'); break;
			case 400: console.warn('Bad Request'); break;
			case 401: console.warn('Unauthorized'); break;
			case 404: console.warn('Not found'); break;
			default: console.warn('Unexpected error');
		}
	}
 */
private async resolveResponse(response:string):Promise<Indexed>{
/* 	// Variant 1
	return new Promise(function(resolve){
		if(response[0]=='[' || response[0]=='{')
			resolve(JSON.parse(response));
		resolve({reason: response});
	});
*/
	// Variant 2
	if(Array.isArray(response) || (response!=null && typeof response=='object')) return response;

	try { return JSON.parse(response); } catch(err){ return {reason: response}; }
}

	public async signin(data:TSignIn, err_el:Element | null){
		let status=500;
		this.Auth.signin(data)
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((data)=>{
			console.warn('API Sign in:', status, data.reason);
			if(status==200 || status==400) this.getUser();
			else formMessage(err_el, data.reason);
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async signup(data:TSignUp){
		let status=500;
		this.Auth.signup(data)
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((res)=>{
			console.warn('API Sign up:', status, res.reason);
			// timedMessage(element, res.reason);
			// this.resolveStatus(status);
			if(status==200){
				if(!res.display_name) res.display_name=`${res.first_name} ${res.second_name}`;
				this.store.set('user', res);
				window.router.go('/');
			}
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async getUser(){
		let status=500;
		this.Auth.getUser()
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((res)=>{
			console.warn('API Get user:', status, res);
			// if(!res.display_name) res.display_name=res.first_name+' '+res.second_name;
			this.store.set('user', res);
			window.router.go('/');
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async logout(){
		this.Auth.logout()
		.then((res)=>{ if(res.status==200) this.store.removeState(); window.router.go('/'); })
		.catch((err)=>{ console.warn(err); });
	}

	public async updateAvatar(data:FormData, err_el:Element | null){
		let status=500;
		this.User.updateAvatar(data)
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((data)=>{
			console.warn('API Update avatar:', status, data);
			if(status==200) this.store.set('user', data); else timedMessage(err_el, data.reason);
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async updatePassword(data:TPassword, err_el:Element | null){
		this.User.updatePassword(data)
		.then((res)=>{ if(res.status==200) window.router.go('/'); else timedMessage(err_el, 'Wrong password'); })
		.catch((err)=>{ console.warn(err); });
	}

	public async updateProfile(data:TProfile, err_el:Element | null){
		let status=500;
		this.User.updateProfile(data)
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((data)=>{
			console.warn('API Update profile:', status, data.response);
			if(status==200){
				this.store.set('user', data);
				formMessage(err_el, 'Profile updated', 'green');
			}else formMessage(err_el, String(data.response));
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async getChatsInfo(offset:number=0, limit:number=100, title:string=''){
		let status=500;
		this.Chat.getChatsInfo({offset, limit, title})
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((res)=>{
			console.warn('API Chats:', status, res);
			if(status==200){
				this.store.set('chats', res);
			}
			if(status==401){	// Unauthorized
				window.router.go('/login');
			}
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async createChat(data: TChat, err_el:Element | null){
		let status=500;
		this.Chat.createChat(data)
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((res)=>{
			console.warn('API Create chat:', status, res.reason);
			if(status==200){
				document.getElementById('modal_more')!.style.display='none';
				this.getChatsInfo();
				// window.router.go('/');
			}else timedMessage(err_el, res.reason);
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async updateChatAvatar(data:FormData, index:number, err_el:Element | null){
		let status=500;
		this.Chat.updateChatAvatar(data)
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((data)=>{
			console.warn('API Update chat avatar:', status, data);
			if(status==200)
				this.store.set(`chats.${index}.avatar`, data.avatar);
			else timedMessage(err_el, 'Error');
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async deleteChat(id:number){
		let status=500;
		this.Chat.deleteChat({chatId: id})
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((res)=>{
			console.warn('API Delete request:', status, res);
			if(status==200){
				this.getChatsInfo();
				this.store.set('messages', []);
				this.store.set('chat_users', []);
				this.store.set('active_chat', []);
			}
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async getChatUsers(id:number, offset:number=0, limit:number=100){
		let status=500;
		this.Chat.getChatUsers({id, offset, limit})
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((res)=>{
			console.warn('API Chat users:', status, res);
			if(status==200) this.store.set('chat_users', res);
			else this.store.set('chat_users', []);
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async searchUsers(name:string, err_el:Element | null){
		let status=500;
		this.User.searchUsers({login: name})
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((res)=>{
			console.warn('API Search users:', status, res);
			if(status==200) this.store.set('search_users', res);
			else timedMessage(err_el, 'Error');
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async addUsers(data:TChatUsers){
		let status=500;
		this.Chat.addUsers(data)
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((res)=>{
			console.warn('API Add users:', status, res);
			if(status==200){
				this.getChatUsers(data.chatId);
			}
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async removeUsers(data:TChatUsers){
		let status=500;
		this.Chat.removeUsers(data)
		.then((res)=>{
			status=res.status;
			return this.resolveResponse(res.response);
		})
		.then((res)=>{
			console.warn('API Remove users:', status, res);
			if(status==200){
				this.getChatUsers(data.chatId);
			}
		})
		.catch((err)=>{ console.warn(err); });
	}

	public async getToken(chatId: number):Promise<string>{
		const self=this;
		return new Promise((resolve) => {
			let status=500;
			self.Chat.getToken(chatId)
			.then((res)=>{
				status=res.status;
				return self.resolveResponse(res.response);
			})
			.then((data:Indexed)=>{
				console.warn('API Chat token:', status, status!=200 ? data : '');
				if(status==200){
					self.store.set('active_chat.token', data.token);
					resolve(data.token);
				}
				resolve('');
			})
			.catch((err)=>{ console.warn(err); resolve(''); });
		});
	}
}
