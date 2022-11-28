import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import Link from 'src/app/model/Link.model';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit, OnChanges {

  @Input() reload:boolean = false;
  @Input() checkTags:boolean = false;
  @Input() panel:string;// can be 'links' , 'newLink' , 'googleSearch'
  @Input() linkView:string = 'simple-link' // can be 'simple-link', 'compressed-link', 'logo-link'

  @Output() changePanelEmitter:EventEmitter<string> = new EventEmitter<string>();

  editedLink!:Link
  edit!:boolean

  googleScript:HTMLScriptElement = document.createElement('script');

  constructor() {
    this.panel = 'googleSearch';

    this.googleScript.type = 'text/javascript';
    this.googleScript.src = 'https://cse.google.com/cse.js?cx=604b402d27db449ed';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.panel)
    if (!changes.panel.firstChange && changes.panel.previousValue !== changes.panel.currentValue && changes.panel.currentValue === 'googleSearch') {
      this.checkGoogleSearch();
      console.log('entrando')
    }
  }

  ngOnInit(): void {
    this.checkGoogleSearch();
  }

  checkGoogleSearch() {
    let url = window.location.href;
    if (!(url.split('/')[3].startsWith('#gsc') || url.split('#gsc')[1] != undefined)) {
      this.changePanelEmitter.emit('links')
      if (document.head.lastElementChild === this.googleScript) document.head.removeChild(this.googleScript);
    } else {
      console.log(this.panel);
      document.head.appendChild(this.googleScript);
    }
  }

  changePanel(panel:string) {
    this.editedLink = new Link(0,'','','',[]);
    this.edit = false;
    this.panel = panel;
    this.changePanelEmitter.emit(panel);
  }

  openEditLinkPanel(link:Link) {
    this.editedLink = link;
    console.log(this.editedLink)
    this.edit = true;
    this.panel = 'newLink';
    this.changePanelEmitter.emit('newLink');
  }

}
