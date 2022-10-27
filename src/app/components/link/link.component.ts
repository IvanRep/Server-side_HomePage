import { Component, Input, OnInit } from '@angular/core';
import Link from 'src/app/model/Link.model';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input() link!:Link;
  buttonsColor:string[] = [
    getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color'),
    getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color'),
    getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color')
  ];
  linkHover:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  colorHover(enter:boolean, link:number) {
    if (enter) {
      this.buttonsColor[link] = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
      if (link === 0) this.linkHover = true;
    }
    else {
      this.buttonsColor[link] = getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color');
      if (link === 0) this.linkHover = false;
    }
  }

  onClick(event:MouseEvent,url:string) {
    if (event.button === 0) {
      let win = window.open(url,'_self');
    } else
    if (event.button === 1) {
      this.openNewTab(url);
    }
  }

  openNewTab(url:string) {
    let win = window.open(url, '_blank');
  }

  copyUrl(url:string) {
    let aux = document.createElement('input');
    aux.setAttribute('value', url);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
  }

}
