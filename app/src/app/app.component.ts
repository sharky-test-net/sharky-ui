import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  title = 'sharky-ui';
  clientID = '4f7a518f8ff6d9afa025';
  clientSecret = 'c19036a51a44f03a22febc327b80ca78c14cbc1c';

  userEmail = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.code) {
        axios
          .get('http://localhost:8080/login?code=' + params.code)
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
