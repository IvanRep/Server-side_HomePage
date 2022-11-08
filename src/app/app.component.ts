import { Component, OnInit } from '@angular/core';
import calculateVW from './functions/calculateVW';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HomePage';

  checkTags:boolean = false;
  reload:boolean = false;
  panel:string = 'links';
  linkView:string = 'simple-link' // can be 'simple-link', 'compressed-link', 'logo-link'

  constructor() {}

  ngOnInit() {
    document.onmousedown = this.hideMenu;
    document.oncontextmenu = () => {return false};
  }

  hideMenu() {
    const menu = document.getElementById('contextMenu');
    if (menu) {
      document.body.removeChild(menu);
      return;
    }
  }

}
