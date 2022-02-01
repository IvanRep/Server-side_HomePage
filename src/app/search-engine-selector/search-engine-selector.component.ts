import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-engine-selector',
  templateUrl: './search-engine-selector.component.html',
  styleUrls: ['./search-engine-selector.component.css']
})
export class SearchEngineSelectorComponent implements OnInit {

  constructor() { }

  @Input() isEditMode:boolean = false;
  @Output() activeEngineEmitter:EventEmitter<string> = new EventEmitter<string>();
  isOpen:boolean = false;

  activeEngine = {url: 'http://google.es', img: 'http://google.es/favicon.ico'};

  engines = [
    {url: 'https://bing.com/', img: 'https://bing.com/favicon.ico'},
    {url: 'https://you.com/', img: 'https://you.com/favicon.ico'},
    {url: 'https://youtube.com/', img: 'https://youtube.com/favicon.ico'}];

  ngOnInit(): void {
  }

  openEngines() {
    this.isOpen = !this.isOpen;
  }
  
  changeActiveEngine(engine:number) {
    if (!this.isOpen) return; //Evito que se pueda cambiar de engine mientras se cierrar los botones

    this.activeEngine = this.engines.splice(engine,1,this.activeEngine)[0];
    this.activeEngineEmitter.emit(this.activeEngine.url);
    this.isOpen = false;
  }

  changeImg(event:Event,engine:number) {
    event.stopPropagation();
    this.engines[engine].img = 'https://www.google.com/s2/favicons?domain='+this.engines[engine].url;
  }
}
