import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'a6s-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toogleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
   }

  ngOnInit(): void {
  }
  toogleSideBar() {
    this.toogleSidebarForMe.emit();
  }

}
