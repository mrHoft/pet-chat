/* Base utils:
*	trim
*	merge
*	setValue
*	isEqual
*	cloneDeep
*	queryStringify
 */

// trim('-_-ab c -_-', '_-'); // ab c
function trim(text:string, chars:string=''):string{
	if(!chars){
		return text.replace(/^\s+|\s+$/gm,'');
	}
	// const reg=new RegExp(chars.split('').join('|'),"gi");
	const reg=new RegExp(`[${chars}]`, "gi");
	return text.replace(reg,'');
}

const isPrimitive=(val:any):boolean => val !== Object(val);

const isObject=(obj:any):boolean => obj != null && typeof obj === 'object';

type Indexed<T = any> = {[k in (string | symbol)]: T};

// merge({a: {b: {a: 2}}, d: 5}, {a: {b: {c: 1}}})
function merge(lhs: Indexed, rhs: Indexed): Indexed {
	for (const key in rhs) {
		if (!rhs.hasOwnProperty(key)) continue;
		try {
			// Property in destination object set; update its value.
			// if (rhs[p].constructor===Object){
			if (isPrimitive(rhs[key])) {
				lhs[key]=rhs[key];
			} else {
				lhs[key]=merge(lhs[key] as Indexed, rhs[key] as Indexed);
			}
		} catch(e) {
			// Property in destination object not set; create it and set its value.
			lhs[key]=rhs[key];
		}
	}
	return lhs;
}

// setValue({ foo: 5 }, 'bar.baz', 10), // { foo: 5, bar: { baz: 10 } }
function setValue(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
	// if (typeof object !== 'object' || object === null) return object;
	if(isPrimitive(object)) return object;
	if(typeof(path)!='string' || path=='') throw new Error('path must be string');
	// const result=path.split('.').reduceRight<Indexed>((acc, key) => ({[key]: acc,}), value as any); merge(object as Indexed, result);
	let obj=object as Indexed
	let arr=path.split('.');
	let last=arr.pop();
	arr.forEach(key=>{
		if(!obj[key]) obj[key]={};
		obj=obj[key] as Indexed;
	});
	obj[last!]=value;
	return object;
}

function addValue(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
	// if (typeof object !== 'object' || object === null) return object;
	if(isPrimitive(object)) return object;
	if(typeof(path)!='string' || path=='') throw new Error('path must be string');
	// const result=path.split('.').reduceRight<Indexed>((acc, key) => ({[key]: acc,}), value as any); merge(object as Indexed, result);
	let obj=object as Indexed
	let arr=path.split('.');
	let last=arr.pop();
	arr.forEach(key=>{
		if(!obj[key]) obj[key]={};
		obj=obj[key] as Indexed;
	});
	if(!obj[last!] || !isArray(obj[last!])) obj[last!]=new Array();
	// obj[last!].push(value);
	obj[last!].unshift(value);
	return object;
}

/* 
function isLowEqual<Obj extends Record<string, any>={}>(a:Obj, b:Obj): boolean {
	return (Object.keys(a).length==Object.keys(b).length && !Object.keys(b).every(key=>a[key]!==b[key]));
}
 */
function isEqual<Obj extends Record<string, any>={}>(a:Obj, b:Obj):boolean {
	const _a=Object.keys(a);
	const _b=Object.keys(b);
	if (_a.length != _b.length) return false;
	for (let i=0; i < _a.length; i++) {
		const val1=a[_a[i]];
		const val2=b[_a[i]];
		if(isObject(val1) && isObject(val2)){
			if(!isEqual(val1, val2)) return false;
		}else if(val1 !== val2) return false;
	}
	return true;
}

type PlainObject<T=any>={[k in string]: T};

function isPlainObject(value: unknown): value is PlainObject {
	return typeof value === 'object'
		&& value !== null
		&& value.constructor === Object
		&& Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
	return isPlainObject(value) || isArray(value);
}
/* 
function isEqual2(lhs: PlainObject, rhs: PlainObject) {
	if (Object.keys(lhs).length !== Object.keys(rhs).length) return false;
	for (const [key, val1] of Object.entries(lhs)) {
		const val2=rhs[key];
		if (isArrayOrObject(val1) && isArrayOrObject(val2)) {
			if (!isEqual2(val1, val2)) return false;
		}else if (val1 !== val2) return false;
	}
	return true;
}
 */
function cloneDeep2(data:PlainObject):PlainObject {
	let res={};
	const clone=(obj1:PlainObject, obj2:PlainObject)=>{
		for(const [key, value] of Object.entries(obj2)){
			if (isArrayOrObject(value)){
				if(obj1[key]==undefined) obj1[key]={};
				clone(obj1[key],value);
			}
			obj1[key]=value;
		}
	}
	clone(res, data);
	return res;
}

function cloneDeep<T extends Indexed>(obj: T) {
	return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
		// Handle: null / undefined / boolean / number / string / symbol / function
		if (item === null || typeof item !== "object") return item;
	
		// Handle: Date
		if (item instanceof Date) return new Date((item as Date).valueOf());
	
		// Handle: Array
		if (item instanceof Array) {
			let copy: ReturnType<typeof _cloneDeep>[] = [];
			item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));
			return copy;
		}
	
		// Handle: Set
		if (item instanceof Set) {
			let copy = new Set();
			item.forEach(v => copy.add(_cloneDeep(v)));
			return copy;
		}
	
		// Handle: Map
		if (item instanceof Map) {
			let copy = new Map();
			item.forEach((v, k) => copy.set(k, _cloneDeep(v)));
			return copy;
		}
	
		// Handle: Object
		if (item instanceof Object) {
			let copy: Indexed = {};
	
			// Handle: Object.symbol
			Object.getOwnPropertySymbols(item).forEach(s => (copy[s.toString()] = _cloneDeep(item[s.toString()])));
	
			// Handle: Object.name (other)
			Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k])));
	
			return copy;
		}
	
		throw new Error(`Unable to copy object: ${item}`);
	})(obj);
}

/*
function queryStringify(data:Record<string, any>={}):string{
	if(Object.keys(data).length==0) return '';
	let out='';
	for(let key in data) out+='&'+key+'='+data[key].toString();
	return '?'+out.substring(1);
}

function queryStringify<StringIndexed extends Record<string, any>>(data: StringIndexed, prefix: string = ''): string {
	if(typeof data !== 'object' || data===null) throw new Error('input must be an object');
	let res='';
	for(const key in data){
		if(typeof data[key] === 'object' && typeof data[key]!==null){
			let newPrefix;
			if(prefix.length>0) newPrefix=`${prefix}[${key}]`;
			else newPrefix=key;
			res+=queryStringify(data[key], newPrefix)+'&';
		}else{
			if(prefix.length>0) res+=`${prefix}[${key}]=${data[key]}&`;
			else res+=`${key}=${data[key]}&`;
		}
	}
	return res.substring(0, res.length-1);;
} */

const getKey=(key: string, parentKey?: string) => parentKey ? `${parentKey}[${key}]` : key;

function getParams(data: PlainObject | [], parentKey?: string) {
	const result: [string, string][] = [];

	for(const [key, value] of Object.entries(data)) {
		if (isArrayOrObject(value)) {
			result.push(...getParams(value, getKey(key, parentKey)));
		} else {
			result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
		}
	}
	return result;
}

function queryString(data: PlainObject) {
	if (!isPlainObject(data)) throw new Error('input must be an object');
	return getParams(data).map(arr => arr.join('=')).join('&');
}

export {trim, merge, setValue, addValue, isEqual, cloneDeep, cloneDeep2, queryString}
