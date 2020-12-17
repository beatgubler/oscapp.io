import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = environment.serverUrl

  private _registerUrl = this.serverUrl + "/api/register";
  private _loginUrl = this.serverUrl + "/api/login"
  private _settingsUrl = this.serverUrl + "/api/settings"
  private _adminUrl = this.serverUrl + "/api/admin"
  private _tokenUrl = this.serverUrl + "/api/token"
  private _tokenRefreshUrl = this.serverUrl + "/api/tokenRefresh"

  public userSubject = new BehaviorSubject<string>(null);
  public user = this.userSubject.asObservable();
  
  public userIdSubject = new BehaviorSubject<string>(null);
  public userId = this.userIdSubject.asObservable();

  public roleSubject = new BehaviorSubject<string>(null);
  public role = this.roleSubject.asObservable();

  public isAdmin
  public loggedIn

  constructor(private http: HttpClient, private _router: Router, private cookieService: CookieService) { }

  public get currentUserValue(){
    return this.userSubject.value;
  }

  public get currentRoleValue(){
    return this.roleSubject.value;
  }

  token(){
    // console.log(data)
    return this.http.get<any>(this._tokenUrl)
  }

  tokenRefresh(){
    return this.http.get<any>(this._tokenRefreshUrl)
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    this.cookieService.delete("jwt")
    this.userSubject.next(null);
    this.isAdmin = false;
    this._router.navigate(['/']);
  }

  changeUser(newUser) {
    this.userSubject.next(newUser);
  }

  changeUserId(newUser) {
    this.userIdSubject.next(newUser);
  }

// Settings ---------------------------------------------------

  getSettings() {
    return this.http.get<any>(this._settingsUrl + "/")
  }

  setEmail(userId, settingsData) {
    return this.http.post<any>(this._settingsUrl + "/email/" + userId, {email: settingsData})
  }

  setPassword(userId, settingsData) {
    return this.http.post<any>(this._settingsUrl + "/password/" + userId, {password: settingsData})
  }

  uploadAvatar(settingsData) {
    const formData: FormData = new FormData();
    formData.append('file', settingsData, settingsData.name)
    return this.http.post<any>(this._settingsUrl + "/avatar/", formData)
  }


// Admin ---------------------------------------------------

  getUsers() {
    return this.http.get<any>(this._adminUrl + "/users/")
  }

  getBlacklist() {
    return this.http.get<any>(this._adminUrl + "/blacklist/")
  }

  blacklistUser(userId) {
    return this.http.post<any>(this._adminUrl + "/blacklist/", {userId})
  }

  deleteBlacklist(userId) {
    return this.http.delete<any>(this._adminUrl + "/blacklist/" + userId)
  }

  deleteUser(userId) {
    return this.http.delete<any>(this._adminUrl + "/users/" + userId)
  }

  deleteMessages() {
    return this.http.delete<any>(this._adminUrl + "/messages/")
  }
  
}
