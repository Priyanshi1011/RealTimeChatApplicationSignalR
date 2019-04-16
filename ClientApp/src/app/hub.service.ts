import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private _hubConnection: HubConnection;

  message = '';
  messages: string[] = [];
  myMessage: string[] = [];

  constructor() {
    this.initHub();
  }
  private initHub() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/chatHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    this._hubConnection.on('getId', (sender: string) => { });

    this._hubConnection.on('setStatus', (sender: string, status: boolean) => { });

    this._hubConnection.on('removeStatus', (sender: string) => { });

    this._hubConnection.on('Send', (sender: string, receivedMessage: string, date: string) => {
      this.message = `${sender}:${receivedMessage},${date}`;

      this.messages.push(this.message);
      this.message = '';
    });

    this._hubConnection.on('sendToMe', (sender: string, receivedMessage: string, date: string) => {
      this.message = `${sender}:${receivedMessage},${date}`;

      this.myMessage.push(this.message);
      this.message = '';
    });

  }

  getConnId(sender: string) {
    this._hubConnection.invoke('getId', sender);
    //.catch(err => console.error(err));
  }

  sendMessage(sender: string, receiver: string, senderConnId: string, ConnectionId: string, msg: string, date: string) {
    //this.messages = [];
    this._hubConnection.invoke('Send', sender, receiver, senderConnId, ConnectionId, msg, date);
    return this.messages;
  }

  sendToMe(sender: string, senderConnId: string, msg: string, date: string) {
    this._hubConnection.invoke('sendToMe', sender, senderConnId, msg, date);
    return this.myMessage;
  }

  setStatus(sender: string, status: boolean) {
    this._hubConnection.invoke('setStatus', sender, status);
  }

  removeStatus(sender: string) {
    this._hubConnection.invoke('removeStatus', sender);
  }
}
