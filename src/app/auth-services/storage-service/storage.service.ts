import { Injectable } from '@angular/core';

const TOKEN = 'c_token';
const USER = 'c_user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveUser(user:any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  public saveToken(token: string ){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static isUserLoggedIn() {
    const token = this.getToken();
    if (token == null){
      return false;
    }
    return true;
  }

  static hasToken():boolean{
    const token = this.getToken();
    if (token == null){
      return false;
    }
    return true;
  }

  static getUser():any{
    // @ts-ignore
    return JSON.parse(localStorage.getItem(USER));
  }

  static logout() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

  static signOut() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}

//Video 2.2h
