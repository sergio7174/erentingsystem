/* service to work with Server (Http protocol to GET, POST, PUT ,...) */
import { HttpClient } from '@angular/common/http';
/* because its a service */
import { Injectable } from '@angular/core';
/* environment file where some var inf is set to the system */
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /****Server URL direction **/
  serverURL = environment.serverURL
    /***where to use HTTP protocol */
  constructor(private http: HttpClient) { }
  /**** service login */
  login(authModel: any) {
    return this.http.post(`${this.serverURL}api/auth/login`, authModel)}

   /*** service register */
    register(UserModel:any){
    console.log(UserModel)
    return this.http.post(`${this.serverURL}api/auth/SignUp`, UserModel)
  }
}
