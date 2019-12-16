import { environment } from './../../environments/environment';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  constructor(
    public authService: AuthService) { }

  title = 'sharky-ui';
  clientID = environment.gitHubClientID;
  currentUser = null;

  ngOnInit() {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
  }

}
