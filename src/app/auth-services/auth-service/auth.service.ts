import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {StorageService} from "../storage-service/storage.service";

const BASIC_URL = ['http://localhost:8081/'];
export const AUTH_HEADER = "authorization"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private storage: StorageService
              ) { }

  signup(signupRequest:any):Observable<any>{
    return this.http.post<any>(BASIC_URL + "sign-up",signupRequest);
  }

  login(email:string,password:string): Observable<any> {
    return this.http.post<any>(BASIC_URL + "authentication", {
      email,
      password
    }, { observe: 'response' })
      .pipe(
        tap(__ => this.log("User Authentication")),
        map((res: HttpResponse<any>) => {
          this.storage.saveUser(res.body);

          // Check if the AUTH_HEADER is present in the response headers
          const bearerToken = res.headers.get(AUTH_HEADER);
          if (bearerToken) {
            // Extract the token from the header
            const tokenLength = bearerToken.length;
            const extractedBearerToken = bearerToken.substring(7, tokenLength);

            // Save the extracted token to storage
            this.storage.saveToken(extractedBearerToken);
          } else {
            // Handle the case where AUTH_HEADER is not present in the response headers
            console.error("Bearer token not found in headers");
            // You might want to throw an error or take appropriate action in this case
          }

          return res;
        })
      );
  }


  log(message:string){
    console.log("User Auth Service" + message);
  }
}
