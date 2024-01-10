import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BASIC_URL = ['http://localhost:8081/']

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signupRequest:any):Observable<any>{
    return this.http.post<any>(BASIC_URL + "sign-up",signupRequest);
  }

  login(loginRequest:any):Observable<any>{
    return this.http.post<any>(BASIC_URL + "authentication",loginRequest);
  }
}
