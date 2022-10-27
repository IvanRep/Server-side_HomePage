import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-tags',
  templateUrl: './svg-tags.component.svg',
  styleUrls: ['./svg-tags.component.css']
})
export class SvgTagsComponent implements OnInit {

  @Input() fillColor = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
