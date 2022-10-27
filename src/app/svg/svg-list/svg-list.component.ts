import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-list',
  templateUrl: './svg-list.component.svg',
  styleUrls: ['./svg-list.component.css']
})
export class SvgListComponent implements OnInit {

  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
