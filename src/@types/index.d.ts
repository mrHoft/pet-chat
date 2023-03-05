declare module '*.tmpl' {
	const content: string;
	export default content;
}

declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.ico' {
	const content: any;
	export default content;
}

declare module '*.module.css';

declare type Indexed<T=any>={[key in (string | symbol)]: T};

declare type ReadonlyDeep<T>={
	readonly [P in keyof T]:
	T[P] extends (infer U)[] ? ReadonlyDeep<U>[] :
	T[P] extends object ? ReadonlyDeep<T[P]> :
	T[P];
};
