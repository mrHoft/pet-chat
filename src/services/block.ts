import EventBus from './event-bus';

class Block {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	};

	protected props:Record<string, unknown>;
	private _element:(HTMLElement | null) = null;
	private _meta:{tagName:string, props:any};
	private eventBus:() => EventBus;

	constructor(tagName: string = "div", props: any = {}) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props
		};

		this.props = this._makePropsProxy(props);
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _addEvents():void{
		const {events={}}=this.props as {events:Record<string, ()=>void>};
		Object.keys(events).forEach(eventName=>{
			this._element!.addEventListener(eventName, events[eventName]);
		});
	}

	private _registerEvents(eventBus: EventBus):void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources():void {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	protected init():void {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount(oldProps:any):void {
		this.componentDidMount(oldProps);
	}

	// Может переопределять пользователь, необязательно трогать
	protected componentDidMount(oldProps:any) {}

	protected dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps:any, newProps:any):void {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	// Used universal comparison
	protected componentDidUpdate(oldProps:any, newProps:any):boolean {
		return (Object.keys(oldProps).length==Object.keys(newProps).length && !Object.keys(newProps).every(key=>oldProps[key]!==newProps[key]));
	}

	setProps = (nextProps:any):void => {
		if (!nextProps) return;

		Object.assign(this.props, nextProps);
	};

	get element():HTMLElement | null {
		return this._element;
	}

	private _render():void {
		const block:string=this.render();
		// Этот небезопасный метод для упрощения логики
		// Используйте шаблонизатор из npm или напишите свой безопасный
		// Нужно не в строку компилировать (или делать это правильно),
		// либо сразу в DOM-элементы возвращать из compile DOM-ноду
		this._element!.innerHTML=block;
		if(this.props.class) this._element!.className=this.props.class as string;
		
		if(this._element instanceof HTMLTextAreaElement){
			if(this.props.rows) this._element!.rows=this.props.rows as number;
			if(this.props.placeholder) this._element!.placeholder=this.props.placeholder as string;
			if(this.props.autofocus) this._element!.autofocus=this.props.autofocus as boolean;
		}
		if(this._element instanceof HTMLInputElement){
			if(this.props.type) this._element!.type=this.props.type as string;
			if(this.props.placeholder) this._element!.placeholder=this.props.placeholder as string;
		}
		this._addEvents();
		console.log('Rendered', this._meta.tagName, this.props.name);
	}

	// Может переопределять пользователь, необязательно трогать
	protected render():string {
		if(this.props.text){
			return this.props.text as string;
		}else return '';
	}

	getContent(): HTMLElement{
		return this.element as HTMLElement;
	}

	private _makePropsProxy(props:any) {
		const self = this;
		const proxy=new Proxy(props, { 
			set(target, prop, newValue) {
				const oldTarget={...target}
				target[prop] = newValue;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty(target, prop) {
				throw new Error('нет доступа');
			},
		});
		return proxy;
	}

	private _createDocumentElement(tagName:string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show():void {
		this.getContent().style.display = "block";
	}

	hide():void {
		this.getContent().style.display = "none";
	}
}

export default Block;
