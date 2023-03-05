import Store		from '../../services/Store/Store';

const store=new Store();

function getChatIndex(id:number):number{
	const {chats} = store.getState();
	for(let i=0; i<chats.length; ++i) if(chats[i].id==id) return i;
	return -1;
}

export default getChatIndex;
