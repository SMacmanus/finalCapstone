import { Component, OnInit } from '@angular/core';
declare const script1: any;

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    script1();
  }

}
