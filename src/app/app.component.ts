import { Component } from '@angular/core';

@Component({
  selector: 'a6s-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sideBarOpen = false;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
