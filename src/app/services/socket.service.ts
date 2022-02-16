import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { TweetDtoIn } from '../model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // webSocketEndPoint: string = 'http://localhost:8080/api';
  // topic: string = "/api/user/tweets";
  // stompClient: any;
  // _connect() {
  //   console.log("Initialize WebSocket Connection");
  //   let ws = new SockJS(this.webSocketEndPoint);
  //   this.stompClient = Stomp.over(ws);
  //   const _this = this;
  //   _this.stompClient.connect({}, function (frame: any) {
  //     _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
  //       _this.onMessageReceived(sdkEvent);
  //     });
  //     //_this.stompClient.reconnect_delay = 2000;
  //   }, (error: any) => {
  //     console.log("errorCallBack -> " + error)
  //     setTimeout(this._connect, 5000);
  //   });
  // };

  // _disconnect() {
  //   if (this.stompClient !== null) {
  //     this.stompClient.disconnect();
  //   }
  //   console.log("Disconnected");
  // }

  // _send() {
  //   console.log("calling logout api via web socket");
  //   let usernameLogged = JSON.parse(localStorage.getItem('user') as string);
  //   this.stompClient.send("/api/user", {}, JSON.stringify(usernameLogged.username));
  // }

  // onMessageReceived(tweets: TweetDtoIn[]) {
  //   console.log("Message Recieved from Server :: " + tweets);
  // }
}
