class EventBus {
	private listeners:{ [key:string]: Function[] }={};

	constructor() {
		this.listeners = {};
	}

	on(event:string, callback:Function) {
		if (!this.listeners[event]) this.listeners[event] = [];
		this.listeners[event].push(callback);
	}

	off(event:string, callback:Function) {
		if (!this.listeners[event]) throw new Error(`No event: ${event}`);
		this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
	}

	emit(event:string, ...args:any) {
		if (!this.listeners[event]) throw new Error(`No event: ${event}`);
		this.listeners[event].forEach((listener) => { listener(...args); });
	}

	clear(){
		this.listeners={};
	}

	emit_and_clear(event:string, ...args:any){
		this.emit(event, ...args);
		this.listeners={};
	}
}

export default EventBus;
