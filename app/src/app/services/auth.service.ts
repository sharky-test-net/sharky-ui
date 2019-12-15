import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

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
    private router: Router,
    private http: HttpClient,
  ) { }

  login(code: string): void {
    console.log('login');
    this.http
      .get<AuthResponse>(environment.apiServerURL + 'login?code=' + code)
      .subscribe(userInfo => {
        localStorage.setItem('token', userInfo.token);
        localStorage.setItem('user', JSON.stringify({ email: userInfo.email, username: userInfo.name }));
        this.router.navigate(['/']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
