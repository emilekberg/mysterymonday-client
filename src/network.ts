import * as SocketIOClient from "socket.io-client";
// TODO: remove this once typescript is fixed
// @ts-ignore
import io from "socket.io-client";

export class Network {
	public readonly socket: SocketIOClient.Socket;
	public get isConnected(): boolean {
		return this.connected;
	}
	public get isLoggedIn(): boolean {
		return this.authenticated;
	}
	public get name(): string {
		return this.username;
	}
	private connected: boolean;
	private authenticated: boolean;
	private username: string;
	constructor() {
		this.username = "";
		this.connected = false;
		this.authenticated = false;
		this.socket = io("http://localhost:8080");
		this.socket.on("connect", this.onConnect);
		this.socket.on("login", this.onLogin);
		this.socket.on("login-session", this.onLogin);
	}
	protected onConnect = () => {
		this.connected = true;
	}
	protected onLogin = (data: {status: string, username: string}) => {
		if(data.status !== "ok") {
			return;
		}
		this.username = data.username;
		this.authenticated = true;
	}
}

const instance = new Network();
export default instance;
