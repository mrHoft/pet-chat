import Component	from '../Component';
import Store		from './Store';
import {isEqual, cloneDeep}	from '../../utils/base_utils';

function connect(component: typeof Component, mapStateToProps: (state: Indexed) => Indexed) {
	// используем class expression
	return class extends component {
		constructor(tag:string, props: Indexed={}) {
			const store=new Store();
			// сохраняем начальное состояние
			let oldState=mapStateToProps(store.getState());
			// передаём аргументы конструктора
			super(tag, {...props, state: {...oldState}});

			// подписываемся на событие
			store.on(Store.EVENT_UPDATE, () => {
				// при обновлении получаем новое состояние
				const newState=mapStateToProps(store.getState());
				// вызываем обновление компонента, передав данные из хранилища
				if (!oldState || (newState && !isEqual(oldState, newState))){
					// this.setProps({state: {...mapStateToProps(store.getState())}});
					// сохраняем новое состояние
					oldState=cloneDeep(newState);
					if(this.props.update) this.props.update();
				}
			});
		}
	}
}
/* 
class HOD extends Component {
	constructor(tag:string, props={}, mapStateToProps:Function) {
		const store=new Store();
		super(tag, {...props, ...mapStateToProps(store.getState())});

		store.on(Store.EVENT_UPDATE, () => {
			this.setProps({...mapStateToProps(store.getState())});
		});
	}
}
 */
export default connect;
