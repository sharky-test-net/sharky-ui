import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators'; import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-github-login',
  templateUrl: './github-login.component.html',
  styleUrls: ['./github-login.component.scss']
})
export class GithubLoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('GithubLoginComponent :: constructor');
  }

  oldParamsCode = null

  ngOnInit() {
    console.log('GithubLoginComponent :: ngOnInit');
    this.route.queryParams
      .subscribe((params) => {
        if (params.code && params.code !== this.oldParamsCode) {
          console.log('GithubLoginComponent :: queryParams :: params.code changed');

          this.oldParamsCode = params.code;
          this.authService.login(params.code);
        }
      });
  }

}
