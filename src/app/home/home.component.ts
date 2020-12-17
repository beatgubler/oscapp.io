import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user

  constructor(private _auth: AuthService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._auth.user.subscribe(user => this.user = user)
  }

}
