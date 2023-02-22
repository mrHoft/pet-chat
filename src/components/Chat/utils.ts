import Store		from '../../services/Store/Store';
import {TChatInfo} from '../../services/api/types';

const store=new Store();

function getChatIndex(id:number):number{
	const chats:TChatInfo[]=store.getState().chats;
	for(let i=0; i<chats.length; ++i)
		if(chats[i].id==id) return i;
	return -1;
}

export {getChatIndex};
