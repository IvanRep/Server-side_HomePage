import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input() reversed = false;
  @Input() filters = true;

  @Output() filterEmitter:EventEmitter<number> = new EventEmitter<number>();

  selectedOption:number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (!changes.filters?.currentValue) {
        document.querySelector('.selected')?.classList.remove('selected');
        this.selectedOption = 0;
      }
  }

  filter(button:HTMLButtonElement,option:number) {
    if (this.selectedOption == option) option = 0;
    this.selectedOption = option;
    document.querySelector('.selected')?.classList.remove('selected');
    if (option!= 0) button.classList.add('selected');
    this.filters = true;
    this.filterEmitter.emit(option);
  }

}
