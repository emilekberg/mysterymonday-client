import * as SocketIOClient from "socket.io-client";
import io from "socket.io-client";

export class Network {
	public readonly socket: SocketIOClient.Socket;
	public get isConnected(): boolean {
		return this.connected;
	}
	public get isLoggedIn(): boolean {
		return this.authenticated;
	}
	private connected: boolean;
	private authenticated: boolean;
	constructor() {
		this.connected = false;
		this.authenticated = false;
		this.socket = io("http://localhost:8080");
		this.socket.on("connect", () => {
			this.connected = true;
		});
		this.socket.on("login", (data: any) => {
			if(data.status !== "ok") {
				return;
			}
			this.authenticated = true;
		});
		this.socket.on("login-session", (data: any) => {
			if(data.status !== "ok") {
				return;
			}
			this.authenticated = true;
		});
	}
}

const instance = new Network();
export default instance;
