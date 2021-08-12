import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'a6s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sideBarOpen = true;
  constructor() { }

  ngOnInit(): void {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
