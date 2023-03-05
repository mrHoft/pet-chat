import {tmpl}	from './template';

describe('Templator', () => {
	test('Make a test page', () => {
		expect(tmpl('test',{})).toBe('<h1>TestPage</h1>');
	});
	// Main templator functionality are unavailable inside jest/mocha
	// tmpl('test',{'more_button':{'onclick': ()=>{alert('click');}}})
});
