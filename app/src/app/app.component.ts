import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor() {
    console.log('AppComponent :: constructor');
  }

  ngOnInit() {
    console.log('AppComponent :: ngOnInit');
  }

  ngOnDestroy() {
    console.log('AppComponent :: ngOnDestroy');
  }

}
