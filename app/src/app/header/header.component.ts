import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { environment } from './../../environments/environment';

export interface AuthEvent {
  type: 'login' | 'logout';
  payload: any;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  clientID = environment.gitHubClientID;
  currentUser = null;

  constructor(
    private router: Router,
    private userService: UserService,
    public authService: AuthService,
  ) {
    console.log('HeaderComponent :: contructor');
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.authService.authSubject.subscribe((authEvent: AuthEvent) => {
      switch (authEvent.type) {
        case 'login':
          console.log('MainLayoutComponent :: authEvent :: login');
          this.onUserLogin(authEvent.payload);
          break;
        case 'logout':
          console.log('MainLayoutComponent :: authEvent :: logout');
          this.onUserLogout();
          break;
      }
    });
  }

  ngOnDestroy() {
    this.authService.authSubject.unsubscribe();
  }

  onUserLogin(currentUser) {
    this.currentUser = currentUser;
    this.router.navigate(['/user']);
  }

  onUserLogout() {
    this.currentUser = null;
    this.router.navigate(['/']);
  }

}
