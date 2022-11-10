import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  @Output() linkViewEmitter:EventEmitter<string> = new EventEmitter<string>();

  fillButtonsColor:string[] = [
    getComputedStyle(document.documentElement).getPropertyValue('--main-background-color'),
    getComputedStyle(document.documentElement).getPropertyValue('--main-background-color'),
    getComputedStyle(document.documentElement).getPropertyValue('--main-background-color')]

  constructor() { }

  ngOnInit(): void {
  }
  
  onHover(enter:boolean, button:number) {
    if (enter) {
      this.fillButtonsColor[button] = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    } else {
      this.fillButtonsColor[button] = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
    }
  }

  changeView(view:string, selectedButton:HTMLButtonElement) {
    const previousButton = (<HTMLButtonElement>document.querySelector('button.viewSelected'));
    if (previousButton) previousButton.classList.remove('viewSelected');

    selectedButton.classList.add('viewSelected');
    this.linkViewEmitter.emit(view);
  }

}
