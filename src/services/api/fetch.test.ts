import {HTTPTransport} from './fetch';

describe('HTTPTransport', () => {
	const open: jest.Mock=jest.fn();
	const send: jest.Mock=jest.fn();
	const http: HTTPTransport=new HTTPTransport('http://localhost:80');
	const setRequestHeader: (key: string, value: string) => void=jest.fn();
	window.XMLHttpRequest=jest.fn().mockImplementation(() => ({open, send, setRequestHeader})) as any;

	test('get', () => {
		http.get('/test');
		expect(open).toBeCalledWith('GET', 'http://localhost:80/test?');
	});

	test('get with query', () => {
		http.get('/test', { data: { key1: 'with', key2: 'key' } });
		expect(open).toBeCalledWith('GET', 'http://localhost:80/test?key1=with&key2=key');
	});

	test('post', () => {
		http.post('/test', { data: { key1: 'with', key2: 'key' } });
		expect(open).toBeCalledWith('POST', 'http://localhost:80/test');
		expect(send).toBeCalledWith('{"key1":"with","key2":"key"}');
	});

	test('post form data', () => {
		const formData=new FormData();
		formData.append('key', 'value');
		http.post('/test', { data: formData });
		expect(open).toBeCalledWith('POST', 'http://localhost:80/test');
		expect(send).toBeCalledWith(formData);
	});

	test('delete', () => {
		http.delete('/test');
		expect(open).toBeCalledWith('DELETE', 'http://localhost:80/test');
	});
});
