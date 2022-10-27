import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-save',
  templateUrl: './svg-save.component.svg',
  styleUrls: ['./svg-save.component.css']
})
export class SvgSaveComponent implements OnInit {

  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
