import Store from '../Store/Store';
import { TUser, ChatToken } from './types';

export default function newWebSocket(chatId:number, TOKEN:string):void{
	const store=new Store();
	const state=store.getState();
	const user:TUser=state.user;
	const USER_ID:number=user.id;
	const CHAT_ID:number=chatId;	//state.active_chat.chatId;
	const cur:ChatToken=state.active_chat;
	// const TOKEN:string | undefined=cur.token;
	if(!TOKEN || TOKEN==''){
		console.error(CHAT_ID+' No token');
		return;
	}

	//Avoid using multiple connections
	const cur_soket:WebSocket | undefined=cur.socket;
	if(cur_soket && cur_soket.close) cur_soket.close();

	const socket=new WebSocket(`wss://ya-praktikum.tech/ws/chats/${USER_ID}/${CHAT_ID}/${TOKEN}`);
	const ping=new Ping(socket);

	socket.addEventListener('open', () => {
		console.warn(CHAT_ID+': WS connected');
		store.set('active_chat.socket', socket)
		ping.start();
/* 
		socket.send(JSON.stringify({
			content: 'Connected user: '+`${user.first_name} ${user.second_name}`,
			type: 'message',
		}));
 */
		socket.send(JSON.stringify({
			content: '0',
			type: 'get old',
		}));
	});

	socket.addEventListener('close', event => {
		if (event.wasClean)
			console.warn(CHAT_ID+': WS connection closed');
		else
			console.warn(CHAT_ID+': WS connection lost', event.code, event.reason);
		
		ping.stop();
	});

	socket.addEventListener('message', event => {
		if(event.data[0]=='{' || event.data[0]=='['){
			const data=JSON.parse(event.data);
			if(data.type=='message'){
				console.log(CHAT_ID+' message:', data.content);
				store.add('messages', data);
			}
			if(data.type=='pong') console.log(CHAT_ID+' message:', data.type);
			if(Array.isArray(data)) store.set('messages', data);
		}else console.warn(CHAT_ID+':', event.data);
	});

	socket.addEventListener('error', (event:ErrorEvent) => {
		console.log(CHAT_ID+' Error:', event.message);
	});
}

class Ping {
	private _timer:NodeJS.Timer;
	private _time:number;
	private _socket:WebSocket;

	constructor(socket:WebSocket, ms:number=10000){
		this._time=ms;
		this._socket=socket;
	}

	start() {
		if(this._timer)
			return true;
		this._timer=setInterval(
			() => this._socket.send(JSON.stringify({type: 'ping'})),
			this._time
		);
	}

	stop() {
		clearInterval(this._timer);
	}
}
