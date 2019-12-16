import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

export interface User {
  email: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(
    private http: HttpClient,
  ) {
    this.authSubject = new Subject();
  }

  authSubject;

  login(code: string): void {
    this.http
      .get<AuthResponse>(environment.apiServerURL + 'login?code=' + code)
      .subscribe(userInfo => {
        localStorage.setItem('token', userInfo.token);
        localStorage.setItem('user', JSON.stringify({ email: userInfo.email, username: userInfo.name }));
        this.authSubject.next({ type: 'login', payload: { email: userInfo.email, username: userInfo.name } });
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authSubject.next({ type: 'logout', payload: null });
  }

}
