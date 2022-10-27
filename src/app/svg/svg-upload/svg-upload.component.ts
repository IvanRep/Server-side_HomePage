import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-upload',
  templateUrl: './svg-upload.component.svg',
  styleUrls: ['./svg-upload.component.css']
})
export class SvgUploadComponent implements OnInit {

  @Input() fill:string = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
