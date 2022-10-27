import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-copy-link',
  templateUrl: './svg-copy-link.component.svg',
  styleUrls: ['./svg-copy-link.component.css']
})
export class SvgCopyLinkComponent implements OnInit {

  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
