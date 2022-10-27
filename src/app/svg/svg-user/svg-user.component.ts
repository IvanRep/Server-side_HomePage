import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-user',
  templateUrl: './svg-user.component.svg',
  styleUrls: ['./svg-user.component.css']
})
export class SvgUserComponent implements OnInit {

  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
