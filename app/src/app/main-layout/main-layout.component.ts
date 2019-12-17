import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

export interface AuthEvent {
  type: 'login' | 'logout';
  payload: any;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    console.log('MainLayoutComponent :: constructor');
  }

  title = 'sharky-ui';
  clientID = environment.gitHubClientID;
  currentUser = null;

  ngOnInit() {
    console.log('MainLayoutComponent :: ngOnInit');

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
    console.log('MainLayoutComponent :: ngOnDestroy');

    this.authService.authSubject.unsubscribe();
  }

  onUserLogin(currentUser) {
    console.log('MainLayoutComponent :: onUserLogin');

    this.currentUser = currentUser;
    this.router.navigate(['/']);
  }

  onUserLogout() {
    console.log('MainLayoutComponent :: onUserLogout');

    this.currentUser = null;
    this.router.navigate(['/']);
  }

}
