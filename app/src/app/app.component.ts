import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  title = 'sharky-ui';
  clientID = '4f7a518f8ff6d9afa025';
  clientSecret = 'c19036a51a44f03a22febc327b80ca78c14cbc1c';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.code) {
        console.log(params.code);
        axios
          .post('https://github.com/login/oauth/access_token', {
            client_id: this.clientID,
            client_secret: this.clientSecret,
            code: params.code,
            accept: 'json'
          })
          .then(res => {
            console.log('This must contain access_token: ', res);
            // get user credentials with access token:
            // axios.get('https://api.github.com/user?access_token=' + res['access_token']);
          });
      }
    });
  }

  githubSignIn(): void {}
}
