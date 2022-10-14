import { Component, OnInit } from '@angular/core';
import calculateVW from './functions/calculateVW';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HomePage';
  
  constructor() {}

  ngOnInit() { }

}
