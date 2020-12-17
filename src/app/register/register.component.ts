import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  messages
  registerUserData = {"email": null, "password": null}

  constructor(private _auth: AuthService, private _router: Router, private cookieService: CookieService, private messageService: MessageService) {  }

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
  }

  registerUser() {
    this.messageService.clearMessages()
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          this._auth.userSubject.next(res.email)
          this._auth.userIdSubject.next(res._id)
          this.cookieService.set("jwt", res.jwtBearerToken, null, null,null, null, "Strict")
          this.cookieService.set("refreshtoken", res.jwtBearerRefreshToken, null, null,null, null, "Strict")
          this._router.navigate(['/chat'])
        },
        err => {
          if (err.error.customError){
            this.messageService.sendMessage(err.error.customError,"danger")
          } else {
            this.messageService.sendMessage("DB-Connection failed","danger")
          }
        }
      )
  }

}
