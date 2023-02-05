import EventBus from './event-bus';

class Component<Props extends Record<string, any>={}> {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	} as const;

	protected props:Props;
	private _element:(HTMLElement | null) = null;
	private _meta:{tagName:string, props:Props};
	private eventBus:() => EventBus;

	constructor(tagName: string = "div", props:Props) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props
		};

		this.props = this._makePropsProxy(props);
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Component.EVENTS.INIT);
	}

	private _registerEvents(eventBus: EventBus):void {
		eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _addEvents():void{
		const {events={}}=this.props;
		Object.keys(events).forEach(eventName=>{
			this._element!.addEventListener(eventName, events[eventName]);
		});
	}

	private _removeEvents(oldProps:Props):void{
		const {events={}}=oldProps;
		Object.keys(events).forEach(eventName=>{
			this._element!.removeEventListener(eventName, events[eventName]);
		});
	}

	private _createResources():void {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	protected init():void {
		this._createResources();
		this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount(oldProps:Props):void {
		this.componentDidMount(oldProps);
	}

	// Может переопределять пользователь, необязательно трогать
	protected componentDidMount(oldProps:Props) {}

	protected dispatchComponentDidMount() {
		this.eventBus().emit(Component.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps:Props, newProps:Props):void {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this._removeEvents(oldProps);
			this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	// Used universal comparison
	protected componentDidUpdate(oldProps:Props, newProps:Props):boolean {
		return (Object.keys(oldProps).length==Object.keys(newProps).length && !Object.keys(newProps).every(key=>oldProps[key]!==newProps[key]));
	}

	setProps=(nextProps:Props):void => {
		if (!nextProps) return;

		Object.assign(this.props, nextProps);
	};

	get element():HTMLElement | null {
		return this._element;
	}

	private _render():void {
		const component:string | HTMLElement=this.render();
		if(typeof component=='string') this._element!.innerHTML=component;
		else this._element!.appendChild(component);

		if(this.props.className) this._element!.className=this.props.className as string;
		if(this._element instanceof HTMLDivElement){
			if(this.props.contentEditable) this._element!.contentEditable=this.props.contentEditable as string;
			if(this.props.autofocus) this._element!.autofocus=this.props.autofocus as boolean;
		}		
		if(this._element instanceof HTMLTextAreaElement){	//Changed to div in this project
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

	// Может переопределять пользователь
	protected render():string | HTMLElement{
		if(this.props.text){
			return this.props.text;
		}else return '';
	}

	getElement(): HTMLElement{
		return this.element as HTMLElement;
	}

	private _makePropsProxy(props:Props) {
		const self = this;
		const proxy=new Proxy(props, { 
			set(target:Record<string, any>, prop:string, newValue:unknown) {
				const oldTarget={...target}
				target[prop]=newValue;
				self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty(target, prop) {
				throw new Error('Deleting property denied');
			},
		});
		return proxy as Props;
	}

	private _createDocumentElement(tagName:string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show():void {
		this.getElement().style.display = "Component";
	}

	hide():void {
		this.getElement().style.display = "none";
	}
}

export default Component;
