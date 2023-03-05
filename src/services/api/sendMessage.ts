import Store	from '../Store/Store';
import { ChatToken }	from './types';

export default function sendMessage(message:string){
	const store=new Store();
	const state=store.getState();
	const cur:ChatToken=state.active_chat;
	if(!cur || !cur.chatId){
		alert('Start a new chat first');
		return;
	}
	const soket:WebSocket | undefined=cur.socket;
	if(soket && soket instanceof WebSocket){
		soket.send(JSON.stringify({
			content: message,
			type: 'message',
		}));
	}
}
