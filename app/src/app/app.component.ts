import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import axios from 'axios';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  title = 'sharky-ui';
  clientID = environment.gitHubClientID;

  userEmail = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.code) {
        axios
          .get(environment.apiServerURL + 'login?code=' + params.code)
          .then(res => {
            this.userEmail = res.data.email;
            this.router.navigate(['/']);
          })
          .catch(console.error);
      }
    });
  }

  githubSignIn(): void { }
}
