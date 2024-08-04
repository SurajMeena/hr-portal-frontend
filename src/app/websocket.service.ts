import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://127.0.0.1:8000/ws/task_update/');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.message);
    };
  }

  sendMessage(message: string) {
    console.log("sending message", message);
    this.socket.send(JSON.stringify({ message }));
  }
}
