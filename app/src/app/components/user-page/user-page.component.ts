import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../common/interfaces';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/']);
    } else {
      this.http.get<User>(`${environment.apiServerURL}/user`,
        {
          params: {
            email: currentUser.email
          }
        })
        .subscribe(user => this.user = user);
    }
  }

  reissueHardwareToken() {
    this.http.post<{ token: string }>(`${environment.apiServerURL}/user/token`, {
      email: this.user.email
    })
      .subscribe(newToken => this.user.hardwareToken = newToken.token);
  }

  updateUser() {
    this.http.post<User>(`${ environment.apiServerURL }/user`, {
      email: this.user.email,
      name: this.user.name
    })
      .subscribe(newUser => this.user = newUser);
  }

}
