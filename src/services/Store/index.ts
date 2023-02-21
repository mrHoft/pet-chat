import Store		from './Store';
// import {isEqual, cloneDeep}	from '../../utils/base_utils';
import { ChatToken } from '../api/types';
import { Manager } from '../api/Manager';
import newWebSocket from '../api/socket';
const store=new Store();

async function prepareNewChat(chatId:number | undefined):Promise<void>{
	if(chatId){
		const manager=new Manager();
		manager.getUsers(chatId);						//Chat users update request
		await manager.getToken(chatId)					//WebSocket token request
		.then(token=>newWebSocket(chatId, token));		//Connect WebSocket to current chat
	}
}

function startChatChangeListener() {
	const cur:ChatToken=store.getState().active_chat;
	if(cur){
		let chatId:number | undefined=cur.chatId;

		store.on(Store.EVENT_UPDATE, () => {
			const cur:ChatToken=store.getState().active_chat;
			const id=cur.chatId;
			if (id && chatId!=id){
				chatId=id;
				prepareNewChat(chatId);
			}
		});

		prepareNewChat(chatId);
	}
}

export default startChatChangeListener;
