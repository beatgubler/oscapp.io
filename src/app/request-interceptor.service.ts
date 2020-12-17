import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const cloned = req.clone({
        headers: req.headers.set("authorization", "Bearer " + this.cookieService.get("jwt")).set("refreshtoken", "Bearer " + this.cookieService.get("refreshtoken"))
    });
    // console.log(cloned)
    return next.handle(cloned).pipe(
      catchError(response => {
        if (response.status === 401) {
          this.cookieService.set("jwt", response.error.newToken, null, null,null, null, "Strict");
          this.cookieService.set("refreshtoken", response.error.newRefreshToken, null, null,null, null, "Strict");
          return next.handle(cloned.clone({
            headers: req.headers.set("authorization", "Bearer " + this.cookieService.get("jwt")).set("refreshtoken", "Bearer " + this.cookieService.get("refreshtoken"))
          }));
        }
        console.log(response)
      })
    )
  }

  constructor(private _auth: AuthService,  private cookieService: CookieService) { }
}
