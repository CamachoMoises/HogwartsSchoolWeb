import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'a6s-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() toogleSidebarForMe: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  ngOnInit(): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
  toogleSideBar() {
    this.toogleSidebarForMe.emit();
  }
  closeSideBar():void {
    this.toogleSidebarForMe.emit();
  }
}
