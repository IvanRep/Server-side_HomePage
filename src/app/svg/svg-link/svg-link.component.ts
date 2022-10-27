import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-link',
  templateUrl: './svg-link.component.svg',
  styleUrls: ['./svg-link.component.css']
})
export class SvgLinkComponent implements OnInit {

  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
