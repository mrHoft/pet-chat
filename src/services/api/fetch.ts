import {queryString} from '../../utils/base_utils';

const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

type Options = {
    method?: string;
	headers?:Record<string, string>;
    data?: any;
	timeout?: number;
	retries?: number;
	title?: string;
	id?: string;
};

type HTTPMethod=(url:string, options?:Options)=>Promise<XMLHttpRequest>;

class HTTPTransport {
	private _url:string='';

	constructor(url:string=''){
		this._url=url;
	}

	get:HTTPMethod		= (url, options={}) => this.request(`${this._url+url}?${queryString(options.data ?? {})}`, {...options,method: METHOD.GET}, options.timeout);

	put:HTTPMethod		= (url, options={}) => this.request(this._url+url, {...options, method: METHOD.PUT}, options.timeout);

	post:HTTPMethod		= (url, options={}) => this.request(this._url+url, {...options, method: METHOD.POST}, options.timeout);

	delete:HTTPMethod	= (url, options={}) => this.request(this._url+url, {...options, method: METHOD.DELETE}, options.timeout);

	request(url:string, options:Options, timeout=5000):Promise<XMLHttpRequest> {
		const {method=METHOD.POST, data, headers={}}=options;
		// console.log(data);

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.withCredentials=true;
			xhr.timeout=timeout;
			// xhr.setRequestHeader('Content-Type', 'text/plain');
			Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
			xhr.onload = ()=>{
				// console.log('on load');
				resolve(xhr);
			};
			function on_err(err:Event){
				// console.log(`Error: ${err.message}`);
				reject();
				throw err;
			}
			xhr.onabort = on_err;
			xhr.onerror = on_err;
			xhr.ontimeout = on_err;
			if(method==METHOD.GET || !data) xhr.send(); else xhr.send(data instanceof FormData ? data : JSON.stringify(data));
		});
	}
}

function fetchWithRetry(url:string, options:Options):Promise<HTTPTransport | XMLHttpRequest>{
	const retries=options['retries'] || 1;
	const xhr=new HTTPTransport();
	function on_err(err:ErrorEvent){
		if (retries<2) throw err;
		return fetchWithRetry(url, {...options, retries: retries-1});
	}
	return xhr.get(url, options).catch(on_err);
}

export {HTTPTransport, fetchWithRetry};
