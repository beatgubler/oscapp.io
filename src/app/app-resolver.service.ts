import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppResolverService implements Resolve<any> {

  constructor(private http: HttpClient, private _auth: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, rdata: RouterStateSnapshot) {
    // return this._auth.token();
  }

}
