import Store		from './Store';
// import {isEqual, cloneDeep}	from '../../utils/base_utils';
import {ChatToken}	from '../api/types';
import Manager		from '../api/Manager';
import newWebSocket from '../api/socket';

const store=new Store();

async function prepareNewChat(chatId:number | undefined):Promise<void>{
	if(chatId){
		const manager=new Manager();
		manager.getChatUsers(chatId);						// Chat users update request
		await manager.getToken(chatId)					// WebSocket token request
		.then((token)=>newWebSocket(chatId, token));		// Connect WebSocket to current chat
	}
}

function startChatChangeListener() {
	const cur:ChatToken=store.getState().active_chat;
	let chatId:number | undefined=cur ? cur.chatId : undefined;

	store.on(Store.EVENT_UPDATE, () => {
		const cur:ChatToken=store.getState().active_chat;
		if(cur){
			if (cur.chatId && chatId!=cur.chatId){
				// console.log(chatId, cur.chatId);
				chatId=cur.chatId;
				prepareNewChat(chatId);
			}
		}
	});

	prepareNewChat(chatId);
}

export default startChatChangeListener;
