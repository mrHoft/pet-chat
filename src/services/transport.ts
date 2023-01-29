const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE'
};

type Options = {
    method?: string;
	headers?:Record<string, string>;
    data?: any;
	timeout?: number;
	retries?: number;
};

function queryStringify(data:Record<string, any>={}):string{
	if(Object.keys(data).length==0) return '';
	let out='';
	for(let key in data) out+='&'+key+'='+data[key].toString();
	return '?'+out.substring(1);
}

class HTTPTransport {
	get		= (url:string, options:Options) => this.request(url+queryStringify(options['data']), {...options,method: METHOD.GET}, options['timeout']);
	put		= (url:string, options:Options) => this.request(url, {...options, method: METHOD.PUT}, options['timeout']);
	post	= (url:string, options:Options) => this.request(url, {...options, method: METHOD.POST}, options['timeout']);
	delete	= (url:string, options:Options) => this.request(url, {...options, method: METHOD.DELETE}, options['timeout']);

	request(url:string, options:Options, timeout=5000):Promise<XMLHttpRequest> {
		const {method=METHOD.POST, data, headers={}} = options;
		// console.log(data);

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.timeout=timeout;
			// xhr.setRequestHeader('Content-Type', 'text/plain');
			Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
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
			if(method==METHOD.GET || !data) xhr.send(); else xhr.send(JSON.stringify(data));
		});
	};
}

function fetchWithRetry(url:string, options:Options):Promise<HTTPTransport | XMLHttpRequest> {
	const retries=options['retries'] || 1;
	const xhr=new HTTPTransport;
	function on_err(err:ErrorEvent){
		if (retries<2) throw err;
		return fetchWithRetry(url, {...options, retries: retries-1});
	}
	return xhr.get(url, options).catch(on_err);
}

export {HTTPTransport,fetchWithRetry};
