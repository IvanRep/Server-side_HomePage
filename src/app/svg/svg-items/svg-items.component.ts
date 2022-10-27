import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-items',
  templateUrl: './svg-items.component.svg',
  styleUrls: ['./svg-items.component.css']
})
export class SvgItemsComponent implements OnInit {

  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
