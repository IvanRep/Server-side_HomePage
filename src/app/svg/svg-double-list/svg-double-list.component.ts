import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-double-list',
  templateUrl: './svg-double-list.component.svg',
  styleUrls: ['./svg-double-list.component.css']
})
export class SvgDoubleListComponent implements OnInit {

  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
