import Component from './Component';

interface TestComponentProps {
	id: string
	events?:Record<string, Function>
}

class TestComponent extends Component<TestComponentProps> {
	render(){
		return 'test string';
	}
}

describe('Component', () => {
	const func=jest.fn();
	const component=new TestComponent('div',{
		id: 'test',
	});
	const element=component.getElement();

	test('Create', () => {
		expect(element instanceof HTMLElement).toBeTruthy();
	});

	test('Set props', () => {
		component.setProps({id: 'test_changed'});
		expect(element.id).toBe('test_changed');
	});

	test('Event test', () => {
		component.setProps({
			id: 'test_changed',
			events: {
				click: () => func(),
			},
		});
		document.body.appendChild(element);
		const el=document.getElementById('test_changed') as HTMLElement;
		el.click();
		expect(func).toBeCalledTimes(1);
	});
});
