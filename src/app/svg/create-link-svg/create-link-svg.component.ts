import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-link-svg',
  templateUrl: './create-link-svg.component.svg',
  styleUrls: ['./create-link-svg.component.css']
})
export class CreateLinkSvgComponent implements OnInit {

  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
