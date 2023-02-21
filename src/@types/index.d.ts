declare module '*.tmpl' {
	const content: string
	export default content
}

declare module '*.svg' {
	const content: string
	export default content
}

declare module "*.module.css";

declare type Indexed<T=any>={[k in (string | symbol)]: T};
