import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Link from 'src/app/model/Link.model';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {

  @Input() checkTags:boolean = false;
  @Input() panel:string;// can be 'links' , 'newLink' , 'googleSearch'

  @Output() changePanelEmitter:EventEmitter<string> = new EventEmitter<string>();

  editedLink!:Link
  edit!:boolean

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
    console.log(this.panel)
  }

  changePanel(panel:string) {
    this.editedLink = new Link(0,'','','',[]);
    this.edit = false;
    this.panel = panel;
    this.changePanelEmitter.emit(panel);
  }

  openEditLinkPanel(link:Link) {
    this.editedLink = link;
    this.edit = true;
    this.panel = 'newLink';
    this.changePanelEmitter.emit('newLink');
  }

}
