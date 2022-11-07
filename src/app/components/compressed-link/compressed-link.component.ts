import { Component, Input, OnInit } from '@angular/core';
import Link from 'src/app/model/Link.model';

@Component({
  selector: 'app-compressed-link',
  templateUrl: './compressed-link.component.html',
  styleUrls: ['./compressed-link.component.css']
})
export class CompressedLinkComponent implements OnInit {

  @Input() link:Link = new Link(0,'','','',[]);
  buttonsColor:string = getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color');

  constructor() { }

  ngOnInit(): void {
  }

  colorHover(enter:boolean) {
    if (enter) {
      this.buttonsColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    }
    else {
      this.buttonsColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color');
    }
  }

  onClick(event:MouseEvent,url:string) {
    if (event.button === 0) {
      let win = window.open(url,'_self');
    } else
    if (event.button === 1) {
      let win = window.open(url, '_blank');
    }
  }

  copyUrl(event:MouseEvent,url:string) {
    event.stopPropagation();
    let aux = document.createElement('input');
    aux.setAttribute('value', url);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
  }


}
