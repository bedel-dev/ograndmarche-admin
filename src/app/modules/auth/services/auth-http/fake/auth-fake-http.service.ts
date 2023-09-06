import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from '../../../models/user.model';
import { AuthModel } from '../../../models/auth.model';
import { UsersTable } from '../../../../../_fake/users.table';
import { environment } from '../../../../../../environments/environment';
import { GlobalConstants } from 'src/app/common/global-constants';

const API_USERS_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(email: string, password: string): Observable<any> {
    const notFoundError = new Error('Not Found');
    if (!email || !password) {
      return of(notFoundError);
    }

    return this.gologinUsers(email, password).pipe(
      map((result: UserModel[]) => {
        //console.log(result)
        if (result.length <= 0) {
          return notFoundError;
        }

        const user = result.find((u) => {
          return (
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
          );
        });
        if (!user) {
          return notFoundError;
        }

        const auth = new AuthModel();
        auth.token = user.token;
        auth.status = user.status;
      //  auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
        return auth;
      })
    );
  }

  createUser(user: UserModel): Observable<any> {
    user.role = "2"; // Manager
    user.token = 'auth-token-' + Math.random();
    user.status = 'auth-token-' + Math.random();
   // user.message = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
    user.urlprofile = './assets/media/avatars/300-1.jpg';

    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((result: UserModel[]) => {
        const user = result.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        return user !== undefined;
      })
    );
  }

  getUserByToken(token: string): Observable<UserModel | undefined> {
    const user = UsersTable.users.find((u: UserModel) => {
      return u.token === token;
    });

    if (!user) {
      return of(undefined);
    }

    return of(user);
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(API_USERS_URL);
  }

  gologinUsers(email: string, password: string): Observable<UserModel[]> {


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
    console.log(GlobalConstants.api_auth)
    console.log(body)

    return this.http.post<UserModel[]>(GlobalConstants.api_auth,body,{
          headers: headers,
    });
  }
}
