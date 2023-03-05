// export default (params:string):string=>params;

export default (uuid:string, text:string)=>{
	const parent=uuid[0]=='.' ? document.querySelector(uuid) : document.getElementById(uuid);
	if(parent) parent.textContent=text;
};
