import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../models/auth.model';
import { GlobalConstants } from 'src/app/common/global-constants';

const API_USERS_URL = `${environment.apiUrl}/auth`;
const API_USERS_LOGIN = `${environment.api_auth}/login.json`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    let user = {
      "contact":email,
      "password":password
    }
    const body=JSON.stringify(user);
    return this.http.post(GlobalConstants.api_auth+'/login.json',body,{headers: headers});
  }
  login1() {
    // this.currentUserSubject.next(this.user)
    // this.router.navigate([this.returnUrl]);
    //  this.router.navigate([this.returnUrl]);
    // this.currentUserSubject.next([]);


    //  this.isLoading = true
      const headers = new HttpHeaders()
      .append(
        'Content-Type',
        'application/json'
      );

    //   // let user = {
    //   //   "contact":"+225 0769424374",
    //   //   "password":"123"
    //   // }

      let user = {
        "contact":"+225 0769424374",
        "password":"123"
      }
      const body=JSON.stringify(user);
      console.log("je suis ici")

      var request = this.http.post(GlobalConstants.api_auth+'/login.json', body, {
        headers: headers,
      }).subscribe((users: any)=>{
        console.log("je suis ici 2")
        console.log(users)

       // this.currentUserValue?.setAuth(users)
        // this.currentUserSubject.next(users);
        // if(users['status'] =="not connected"){
        //   this.localUser = {};
        // }else if(users['status']=="Connected"){
        //   this.localUser = users;
        // }else{
        //   this.localUser = null;
        // }
        // this.router.navigate(['/']);
      },next =>{
        // console.log("next :"+next)
        // this.hasErrors = true;
      },() =>{
        // if(this.localUser!== null){
        //   console.log("this.localUser :"+this.localUser)
        //   this.hasErrors = false;
        //   this.isLoading = false
        //   this.setAuthFromLocalStorage(this.localUser)
        //   let d = localStorage.getItem('user')
        //   this.changeDetector.detectChanges();
        //   this.router.navigate(['/']);
        //  // console.log("hasError 1 egal :"+this.router.navigate([this.returnUrl]))
        // }else{
        //   this.isLoading = false
        //   this.hasErrors = true;
        //   this.state
        //   this.changeDetector.detectChanges();
        //   console.log("hasError error egal :"+this.hasErrors)
        //  // this.state
        // }
      });
  //return request;
}

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string,id:string): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(GlobalConstants.api_auth+"/getuser/"+id+".json",{headers:httpHeaders});
  }
}
