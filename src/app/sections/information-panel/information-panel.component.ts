import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information-panel',
  templateUrl: './information-panel.component.html',
  styleUrls: ['./information-panel.component.css']
})
export class InformationPanelComponent implements OnInit {

  time:string = "";

  constructor() { }

  ngOnInit(): void {
    this.initializeTime();
  }

  initializeTime() {
    const date = new Date();

    this.time = this.normalizeNumbers(date.getHours()) + ":" + this.normalizeNumbers(date.getMinutes());

    setTimeout(() => this.initializeTime(),1000);
  }

  normalizeNumbers(num:number) {
    if (num<=9)
      return "0"+num;
    else
      return num.toString();
  }

}
