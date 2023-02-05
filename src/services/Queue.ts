type El={
	value: any,
	next: El | null,
	prev: El | null
} | null;

class Queue{
	private size:number=0;
	private head:El=null;
	private tail:El=null;

	constructor(){
		this.size=0;
		this.head=null;
		this.tail=null;
	}

	enqueue(value:any){
		const node:El={value, next: null, prev: null};
		node.prev=this.tail;
		if (this.tail) {
			this.tail.next=node;
			this.tail=node;
		} else this.head=this.tail=node;

		return ++this.size;
	}
		
	dequeue(){
		if(this.size==0) throw new Error('Queue is empty');
		const node=this.head;
		const next=this.head?.next;
		if(next){next.prev=null; this.head=next;}
		else this.tail=this.head=null;
		--this.size;
		return node;
	}
		
	peek(){
		return this.head;
	}
		
	isEmpty(){
		return this.size==0;
	}

	clear(){
		this.size=0;
		this.head=null;
		this.tail=null;
	}
}

export default Queue;
