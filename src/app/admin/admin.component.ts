import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _chatService: ChatService, public _auth: AuthService, private messageService: MessageService) { }

  users

  ngOnInit() {
    this._auth.getUsers()
      .subscribe((response) => {
        this.users = response
    })
  }

  deleteUser(id){
    this._auth.deleteUser(id).subscribe((response) => {
        this._auth.getUsers().subscribe((response) => {
            this.users = response
        })
      })
  }

  deleteMessages(){
    this._auth.deleteMessages().subscribe((response) => {
        this._chatService.socket.emit('message')
      })
  }

  blacklistUser(id){
    this._auth.blacklistUser(id).subscribe((response) => {
        this._auth.getUsers().subscribe((response) => {
            this.users = response
        })
      })
  }

  deleteBlacklist(id){
    this._auth.deleteBlacklist(id).subscribe((response) => {
        this._auth.getUsers().subscribe((response) => {
            this.users = response
        })
      })
  }

}
