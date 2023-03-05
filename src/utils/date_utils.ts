// Time string format functions
const pad=(n:number, s:number=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);

export function timeDiff_inherited(time:string){
	const now=new Date();
	const date=new Date(time);
	let diff=now.getTime()-date.getTime();

	const diffDays=Math.floor(diff/1000/60/60/24);
	diff-=diffDays*1000*60*60*24;

	const diffHours=Math.floor(diff/1000/60/60);
	if(diffHours>12) return `${pad(date.getFullYear(),4)}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
	diff-=diffHours*1000*60*60;

	const diffMin=Math.floor(diff/1000/60);
	diff-=diffMin*1000*60;

	const diffSec=Math.floor(diff/1000);

	// if(diffHours==0 || diffMin==0) return `${pad(diffSec)} sec`;

	return `${pad(date.getHours())}:${pad(date.getMinutes())}`;	// .${pad(date.getSeconds())}`;
	// console.log('Difference = ' + diffDays + ' days ' + diffHours + ' hours ' + diffMin + ' minutes ' + diffSec + ' seconds');
}

export function timeDiff(currDate:string, lastDate:string=''){
	const last:Date=lastDate=='' ? new Date() : new Date(lastDate);
	const curr:Date=new Date(currDate);

	const last_month=last.getMonth();
	const curr_month=curr.getMonth();
	const last_day=last.getDate();
	const curr_day=curr.getDate();

	if(last_month>curr_month || last_day>curr_day) return `${pad(curr.getFullYear(),4)}-${pad(curr_month+1)}-${curr_day}`;
	return `${pad(curr.getHours())}:${pad(curr.getMinutes())}`;
}

export function timeFull(time:string){
	const date=new Date(time);
	return `${pad(date.getFullYear(),4)}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;	// .${pad(date.getSeconds())}`;
}
