export function timeDiff(time:string){
	const pad=(n:number, s:number=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
	const now=new Date();
	const date=new Date(time);
	let diff=now.getTime()-date.getTime();

	let diffDays=Math.floor(diff/1000/60/60/24);
	if(diffDays)
		return `${pad(date.getFullYear(),4)}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;

	diff-=diffDays*1000*60*60*24;

	let diffHours=Math.floor(diff/1000/60/60);
	diff-=diffHours*1000*60*60;

	let diffMin=Math.floor(diff/1000/60);
	diff-=diffMin*1000*60;

	let diffSec=Math.floor(diff/1000);

	// if(diffHours==0 || diffMin==0) return `${pad(diffSec)} sec`;
		
	return `${pad(date.getHours())}:${pad(date.getMinutes())}`	//.${pad(date.getSeconds())}`;
	// console.log('Difference = ' + diffDays + ' days ' + diffHours + ' hours ' + diffMin + ' minutes ' + diffSec + ' seconds');
}
