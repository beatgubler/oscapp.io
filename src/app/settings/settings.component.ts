import { environment } from '../../environments/environment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from '../chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  serverUrl = environment.serverUrl
  messages
  settingsData = {"email": null, "password": null, "avatar": 1}
  user
  userId
  selectedFile = null
  uploadText = "Choose file"
  private subscription$: Subscription

  constructor(private _chatService: ChatService, private cookieService: CookieService, public _auth: AuthService, private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessage()
      .subscribe(
        res => {
          if (res) {
            this.messages.push(res)
          } else {
            this.messages = []
          }
        },
        err => {
          console.log(err)
        }
    )

    this._auth.user.subscribe(user => this.user = user)
    this._auth.userId.subscribe(userId => { this.userId = userId })
    this.subscription$ = this._auth.getSettings().subscribe((response) => {
      this.settingsData.email = response.email
      this.settingsData.avatar = response.avatar
    })
  }

  changeEmail(){
    // console.log(this.settingsData.email)
    if(confirm("Are you sure you want to update your email/username?")) {
      this._auth.setEmail(this.userId, this.settingsData.email).subscribe(response => {
        if (response) {
          console.log(response)
          this.cookieService.set("jwt", response.jwtBearerToken)
          this.cookieService.set("refreshtoken", response.jwtBearerRefreshToken)
          this._auth.changeUser(response.email)
          this._chatService.socket.emit('message')
          this.messageService.clearMessages()
          this.messageService.sendMessage("Username change successful","success")
        } else {
          this.messageService.clearMessages()
          this.messageService.sendMessage("Username already exists","danger")
        }
      });
    }
    
  }

  changePassword(){
    if(confirm("Are you sure you want to update your password?")) {
      this._auth.setPassword(this.userId, this.settingsData.password).subscribe(response => {
        if (response) {
          this.messageService.clearMessages()
          this.messageService.sendMessage("Password change successful","success")
        } else {
          this.messageService.sendMessage("Unknown error when changing the password","danger")
        }
      });
    }
  }
  
  onUpload() {
    if(confirm("Are you sure you want to update your avatar?")) {
      this._auth.uploadAvatar(this.selectedFile).subscribe(
        response => {
         if (response) {
          this.settingsData.avatar = response.avatar
          this._chatService.socket.emit('message')
            this.messageService.clearMessages()
            this.messageService.sendMessage("Avatar change successful","success")
          } else {
            this.messageService.clearMessages()
            this.messageService.sendMessage("Wrong filetype or size too big","danger")
          }
        }, 
        error => {
          this.messageService.clearMessages()
          this.messageService.sendMessage(error.error,"danger")
        });
    }
    
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0]
    if (this.selectedFile) {
      this.uploadText = this.selectedFile.name
    } else {
      this.uploadText = "Choose file"
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe()
  }

}
