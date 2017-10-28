import * as SocketIOClient from "socket.io-client";
import io from "socket.io-client";

export class Network {
	public readonly socket: SocketIOClient.Socket;
	public get isConnected() {
		return this.connected;
	}
	private connected: boolean;
	constructor() {
		this.connected = false;
		this.socket = io("http://localhost:8080");
		this.socket.on("connect", () => {
			this.connected = true;
		});
	}
}

const instance = new Network();
export default instance;
