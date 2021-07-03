import { Injectable } from '@angular/core';
import { io } from "socket.io-client";

@Injectable({
	providedIn: 'root'
})
export class SocketService {

	URL = "http://localhost:3000"
	socket = io(this.URL, { autoConnect: false })

	isConnected = false

	constructor() { }

	connect(type: string) {
		this.socket.auth = { type };
		this.socket.connect();
	}

	beginLyric(data: any) {
		var body = JSON.parse(JSON.stringify(data))
		body.content = undefined
		this.socket.emit("lyric:begin", body)
	}

	broadcastLyric(data: any) {
		this.socket.emit("lyric:update", data)
	}



}
