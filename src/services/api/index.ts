import {HTTPTransport}	from './transport';
import {
	TProfile,
	TSignIn,
	TSignUp,
	TChatUsers,
	TChat,
	TPassword,
	TLogin,
} from "./types";

const headers={"Content-Type": "application/json"};

export class BaseAPI {
	apiInstance: HTTPTransport;
	constructor(url: string) {this.apiInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2'+url)}
	// На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
	create() {throw new Error('Not implemented');}
	request() {throw new Error('Not implemented');}
	update() {throw new Error('Not implemented');}
	delete() {throw new Error('Not implemented');}
}

export class AuthAPI extends BaseAPI {
	constructor() {super("/auth")}
	signin=(data: TSignIn)=>this.apiInstance.post("/signin", {data, headers});
	signup=(data: TSignUp)=>this.apiInstance.post("/signup", {data, headers});
	getUser=()=>this.apiInstance.get("/user");
	logout=()=>this.apiInstance.post("/logout");
}

export class ChatAPI extends BaseAPI {
	constructor() {super("/chats")}
	getChatsInfo=()=>this.apiInstance.get("", {headers});
	createChat=(data: TChat)=>this.apiInstance.post("", {data, headers});
	deleteChat=(data: {chatId: number})=>this.apiInstance.delete("", {data, headers});
	updateChatAvatar=(data: FormData)=>this.apiInstance.put("/avatar", {data});
	addUsers=(data: TChatUsers)=>this.apiInstance.put("/users", {data, headers});
	getUsers=(data: {id: number})=>this.apiInstance.get(`/${data.id}/users`, {data, headers});
	removeUsers=(data: TChatUsers)=>this.apiInstance.delete("/users", {data, headers});
	getToken=(chatId: number)=>this.apiInstance.post(`/token/${chatId}`, {headers});
}

export class UserAPI extends BaseAPI {
	constructor() {super("/user")}
	updateProfile=(data: TProfile)=>this.apiInstance.put("/profile", {data, headers});
	updatePassword=(data: TPassword)=>this.apiInstance.put("/password", {data, headers});
	updateAvatar=(data: FormData)=>this.apiInstance.put("/profile/avatar", {data});
	searchUsers=(data: TLogin)=>this.apiInstance.post("/search", {data, headers});
}
