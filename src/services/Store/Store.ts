import EventBus from '../EventBus';
import {setValue, addValue} from '../../utils/base_utils';

class Store extends EventBus {
	static EVENT_UPDATE:string = 'Update';
	static STORE_NAME:string = 'myAppStore';

	protected static _instance:Store;
	protected _state:Record<string, any> = {};

	constructor() {
		if(Store._instance) return Store._instance;
		super();
		const savedState = localStorage.getItem(Store.STORE_NAME);
		this._state = savedState ? (JSON.parse(savedState) ?? {}) : {} 
		Store._instance = this;

		this.on(
			Store.EVENT_UPDATE, 
			() => {
				console.log('App store update');
				localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state));
			}
		);
	}

	public getState() {
		return this._state;
	}

	public removeState() {
		this._state = {};
		this.emit(Store.EVENT_UPDATE);
	}

	public set(id: string, value: unknown) {
		// this._state[id] = value;
		setValue(this._state, id, value);
		this.emit(Store.EVENT_UPDATE);
	}

	public add(id: string, value: unknown) {
		addValue(this._state, id, value);
		this.emit(Store.EVENT_UPDATE);
	}
}

export default Store;
