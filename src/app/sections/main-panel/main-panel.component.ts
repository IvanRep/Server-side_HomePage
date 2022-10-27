import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {

  @Input() checkTags:boolean = false;
  @Input() panel:string // can be 'links' , 'newLink' , 'googleSearch'

  constructor() {
    this.panel = 'links';
  }

  ngOnInit(): void {
    this.checkGoogleSearch();
  }

  checkGoogleSearch() {
    let url = window.location.href;
    if (url.split('/')[3].startsWith('search') || url.split('/')[3].startsWith('#gsc'))
      this.panel = 'googleSearch'
  }

}
