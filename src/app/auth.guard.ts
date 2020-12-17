import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, public _auth: AuthService, private http: HttpClient, private _router: Router, private cookieService: CookieService) {  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._auth.currentUserValue){
      return true;
    } else {
      this._auth.token().subscribe(
        res => {
          // console.log('ok')
          // console.log(res)
          this._auth.userSubject.next(res.email)
          this._auth.userIdSubject.next(res._id)
          this.router.navigate([state.url])
        },
        err => {
          // console.log('nok')
          this.cookieService.deleteAll();
          this.router.navigate(['/'])
          return false;
        }
      )
      
    }
  }
  
}
