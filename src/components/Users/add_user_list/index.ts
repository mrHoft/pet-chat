import Component	from '../../../services/Component';
import {replaceDOM}	from '../../../services/render-dom';
import {TUser}		from '../../../services/api/types';
import Store		from '../../../services/Store/Store';
import connect		from '../../../services/Store/connect';
import * as classes from './.module.css';
import userNode		from '../add_user_node';

const store=new Store();

type DetailsProps={
	id:			string,
	text?:		string,
	update:		Function,
	className?:	string,
	events?:	Record<string, unknown>
};

const mapSearchUsersToProps=(state:Indexed)=>state.search_users;

function searchUsers(uuid:string, props:Indexed={}):void{
	// console.log(props);
	const HOC=connect(Component, mapSearchUsersToProps);
	const frame=new HOC('div',<DetailsProps>{
		id:		'add_user_list',
		update:	updateSearchUsers,
		className: classes.user_list+' scrolled',
	});
	replaceDOM(uuid, frame);
}

function updateSearchUsers(){
	console.log('...Update search users');
	let container:HTMLElement | null=document.getElementById('add_user_list');
	const data:[]=mapSearchUsersToProps(store.getState());
	if(container && data){
		if(data.length>0){
			container.innerHTML='';
			const list=document.createElement('ul');
			Object.values(data).forEach((value: TUser)=>{
				const list_el=document.createElement('li');
				const node=userNode(value);
				list_el.appendChild(node);
				list.appendChild(list_el);
			});
			container.appendChild(list);
		}else
			container.innerHTML='<p>No users found.</p>';
	}
}

export default searchUsers;
