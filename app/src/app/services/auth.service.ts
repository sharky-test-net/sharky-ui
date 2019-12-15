import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserService } from './user.service';
// import { IUserResponse } from './../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.isAuthenticated = !!localStorage.getItem('user');
  }

  login(code: string): void {
    console.log('login');
    this.http
      .get<HttpResponse<{email: string}>>(environment.apiServerURL + 'login?code=' + code)
      .pipe(
        map(res => console.log('----->', res))
      )
      .subscribe(res => {
        // this.userEmail = res.data.email;
        this.router.navigate(['/']);
      });
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

}
