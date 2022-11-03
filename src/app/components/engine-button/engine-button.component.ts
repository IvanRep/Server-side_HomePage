import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import SearchEngine from 'src/app/model/SearchEngine.model';

@Component({
  selector: 'app-engine-button',
  templateUrl: './engine-button.component.html',
  styleUrls: ['./engine-button.component.css']
})
export class EngineButtonComponent implements OnInit {

  @Output() engineEmitter:EventEmitter<SearchEngine> = new EventEmitter<SearchEngine>();

  engines:SearchEngine[] = [
    new SearchEngine('google','https://google.com/search','q','https://www.google.com/favicon.ico'),
    new SearchEngine('you','https://you.com/search','q','https://you.com/_next/image?url=%2Fimages%2Fydc-logo-lightdarkmode.svg&w=256&q=75'),
    new SearchEngine('youtube','https://www.youtube.com/results','search_query','https://cdn-icons-png.flaticon.com/512/1384/1384060.png')
  ]

  selectedEngine:number = 0;


  constructor() { }

  ngOnInit(): void {
  }

  changeEngine(event:WheelEvent) {
    if (event.deltaY > 0) {
      this.selectedEngine = this.selectedEngine >= this.engines.length ? 0 : this.selectedEngine+1;
    }

    if (event.deltaY < 0) {
      this.selectedEngine = this.selectedEngine <= 0 ? this.engines.length-1 : this.selectedEngine-1;
    }
    
    this.engineEmitter.emit(this.engines[this.selectedEngine]);
  }

}
