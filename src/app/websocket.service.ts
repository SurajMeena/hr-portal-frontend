import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:8000/ws/task_update/');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.message);
    };
  }

  private waitForConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket.readyState === WebSocket.OPEN) {
        resolve();
      } else {
        this.socket.onopen = () => {
          resolve();
        };
        this.socket.onerror = (err) => {
          reject(err);
        };
      }
    });
  }
  async sendMessage(message: string) {
    try {
      await this.waitForConnection();
      console.log('sending message', message);
      this.socket.send(JSON.stringify({ message }));
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }
}
