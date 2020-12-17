import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket;

  serverUrl = environment.serverUrl
  private url = this.serverUrl
  private _chatUrl = this.serverUrl + "/api/posts";

  // private url = 'http://chat.gubler-it.com:3000';
  // private _chatUrl = "http://chat.gubler-it.com:3000/api/posts";

  // private url = 'http://localhost:3000';
  // private _chatUrl = "http://localhost:3000/api/posts";

  constructor(private http: HttpClient) { 
    this.socket = io(this.url);
  }

  getPosts() {
    return this.http.get<any>(this._chatUrl)
  }

  postMessage(message) {
    // console.log(message)
    this.socket.emit('message', message);
    return this.http.post<any>(this._chatUrl, message)
  }

  deleteMessage(id) {
    return this.http.delete<any>(this._chatUrl + "/" + id)
  }

  getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }


}
