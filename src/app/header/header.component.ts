import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user

  constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute, public _auth: AuthService, private _router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.user = user
      if (user === "admin") {
        this._auth.isAdmin = true
      }
    })

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.changeTitle(event.url)
      }
    })
  }

  logoutUser() {
    this._auth.logoutUser()
  }

  changeTitle(url) {
    var titleBase = " - oscapp.io"
    switch(url) {
      case "/login":
        var title = "Login" + titleBase
        break
      case "/register":
        var title = "Register" + titleBase
        break
      case "/chat":
        var title = "Chat" + titleBase
        break
      case "/settings":
        var title = "Settings" + titleBase
        break
      case "/admin":
        var title = "Admin" + titleBase
        break
      case "/home":
        var title = "Home" + titleBase
        break
      default:
        var title = "oscapp.io - MEAN Opensource Chat Application"
    }
    this.titleService.setTitle(title)
  }
  
}
