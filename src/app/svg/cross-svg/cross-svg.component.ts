import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cross-svg',
  templateUrl: './cross-svg.component.svg',
  styleUrls: ['./cross-svg.component.css']
})
export class CrossSvgComponent implements OnInit {

  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
