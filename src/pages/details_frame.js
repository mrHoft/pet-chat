const details_frame=`
<div id="details_frame"></div>
`;

function details_switch(){
	const el=document.getElementById('details_frame');
	let visible=el.style.display!='none';
	el.style.display=(visible?'none':'block');
	console.log('Temporary functionality.');
}

export {details_frame, details_switch};
