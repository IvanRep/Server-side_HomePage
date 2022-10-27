import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-new-tab',
  templateUrl: './svg-new-tab.component.svg',
  styleUrls: ['./svg-new-tab.component.css']
})
export class SvgNewTabComponent implements OnInit {
 
  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
