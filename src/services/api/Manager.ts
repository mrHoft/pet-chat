import Store from '../Store/Store';
import {AuthAPI, ChatAPI, UserAPI} from '.';
import {timedMessage, formMessage} from '../../utils/chat_utils';
import {
	TProfile,
	TSignIn,
	TSignUp,
	TChatUsers,
	TChat,
	TPassword
} from "./types";

export class Manager{
	private static _instance:Manager;
	// private static _socket: WebSocket;
	// private static _socketPingInterval: number;
	protected 	store:Store
	protected	Auth:AuthAPI
	protected	Chat:ChatAPI
	protected	User:UserAPI;

	constructor() {
		if(Manager._instance) return Manager._instance;
		Manager._instance = this;

		this.store=new Store();
		this.Auth=new AuthAPI();
		this.Chat=new ChatAPI();
		this.User=new UserAPI();
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
	public async signin(data:TSignIn){
		let status=500;
		this.Auth.signin(data)
		.then(res=>{
			status=res.status;
			return status==200 ? {reason:'Authorized!'} : JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Sign in:', status, res.reason);
			if(status==200 || status==400) this.getUser();
		})
		.catch(err=>{console.warn(err)});
	}

	public async signup(data:TSignUp){
		let status=500;
		this.Auth.signup(data)
		.then(res=>{
			status=res.status;
			return JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Sign up:',status, res.reason);
			// timedMessage(element, res.reason);
			// this.resolveStatus(status);
			if(status==200){
				if(!res.display_name) res.display_name=res.first_name+' '+res.second_name;
				this.store.set('user', res);
				window.router.go("/");
			}
		})
		.catch(err=>{console.warn(err)});
	}
	public async getUser(){
		let status=500;
		this.Auth.getUser()
		.then(res=>{
			status=res.status;
			return JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Get user:', status, res);
			// if(!res.display_name) res.display_name=res.first_name+' '+res.second_name;
			this.store.set('user', res);
			window.router.go("/");
		})
		.catch((err)=>{console.warn(err)});
	}

	public async logout(){
		this.Auth.logout()
		.then(res=>{if(res.status==200) this.store.removeState(); window.router.go('/')})
		.catch((err)=>{console.warn(err)});
	}

	public async updateAvatar(data:FormData, err_el:Element | null){
		let status=500;
		this.User.updateAvatar(data)
		.then(res=>{
			status=res.status;
			return JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Update avatar:', status, res);
			if(status==200) this.store.set('user', res); else timedMessage(err_el, 'Error');
		})
		.catch((err)=>{console.warn(err)});
	}

	public async updatePassword(data:TPassword, err_el:Element | null){
		this.User.updatePassword(data)
		.then(res=>{if(res.status==200) window.router.go('/'); else timedMessage(err_el, 'Wrong password');})
		.catch((err)=>{console.warn(err)});
	}

	public async updateProfile(data:TProfile, err_el:Element | null){
		this.User.updateProfile(data)
		.then(res=>{if(res.status==200) formMessage(err_el, 'Profile updated'); else formMessage(err_el, 'Error');})
		.catch((err)=>{console.warn(err)});
	}

	public async getChatsInfo(){
		let status=500;
		this.Chat.getChatsInfo()
		.then(res=>{
			status=res.status;
			return JSON.parse(res.response);
		})
		.then(res=>{
			if(status==200){
				console.warn('Chats: ', res);
				this.store.set('chats', res);
				// window.router.go("/");
			}
			if(status==401){	//Unauthorized
				window.router.go("/login");
			}
		})
		.catch((err)=>{console.warn(err)});
	}

	public async createChat(data: TChat, err_el:Element | null){
		let status=500;
		this.Chat.createChat(data)
		.then(res=>{
			status=res.status;
			return JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Create chat:', status, res.reason);
			if(status==200){
				document.getElementById('modal_more')!.style.display='none';
				this.getChatsInfo();
				// window.router.go('/');
			}else timedMessage(err_el, res.reason);
		})
		.catch((err)=>{console.warn(err)});
	}

	public async updateChatAvatar(data:FormData, index:number, err_el:Element | null){
		let status=500;
		this.Chat.updateChatAvatar(data)
		.then(res=>{
			status=res.status;
			return JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Update chat avatar:', status, res);
			if(status==200)
				this.getChatsInfo();	//this.store.set('chats.'+index, res);
			else
				timedMessage(err_el, 'Error');
		})
		.catch((err)=>{console.warn(err)});
	}

	public async deleteChat(id:number){
		let status=500;
		this.Chat.deleteChat({chatId: id})
		.then(res=>{
			status=res.status;
			return JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Delete request: ', status, res);
			if(status==200){
				this.getChatsInfo();
			}
		})
		.catch((err)=>{console.warn(err)});
	}

	public async getUsers(chatId:number){
		let status=500;
		this.Chat.getUsers({id: chatId})
		.then(res=>{
			status=res.status;
			return JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Chat users: ', status, res);
			if(status==200)
				this.store.set('chat_users', res);
			else
				this.store.set('chat_users', []);
		})
		.catch((err)=>{console.warn(err)});
	}

	public async searchUsers(name:string, err_el:Element | null){
		let status=500;
		this.User.searchUsers({login: name})
		.then(res=>{
			status=res.status;
			return JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Search users: ', status, res);
			if(status==200)
				this.store.set('search_users', res);
			else
				timedMessage(err_el, 'Error');
		})
		.catch((err)=>{console.warn(err)});
	}

	public async addUsers(data:TChatUsers){
		let status=500;
		this.Chat.addUsers(data)
		.then(res=>{
			status=res.status;
			return status==200 ? 'Done' : JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Add users: ', status, res);
			if(status==200){
				this.getUsers(data.chatId);
			}
		})
		.catch((err)=>{console.warn(err)});
	}

	public async removeUsers(data:TChatUsers){
		let status=500;
		this.Chat.removeUsers(data)
		.then(res=>{
			status=res.status;
			return status==200 ? 'Done' : JSON.parse(res.response);
		})
		.then(res=>{
			console.warn('Remove users: ', status, res);
			if(status==200){
				this.getUsers(data.chatId);
			}
		})
		.catch((err)=>{console.warn(err)});
	}

	public async getToken(chatId: number):Promise<string>{
		const self=this;
		return new Promise(function(resolve) {
			let status=500;
			self.Chat.getToken(chatId)
			.then((res:any)=>{
				status=res.status;
				return JSON.parse(res.response);
			})
			.then((data:any)=>{
				console.warn('Chat token request: ', status, status!=200 ? data : '');
				if(status==200){
					self.store.set('active_chat.token', data.token);
					resolve(data.token);
				}
				resolve('');
			})
			.catch((err:any)=>{console.warn(err); resolve('');});
		});
	}
}
