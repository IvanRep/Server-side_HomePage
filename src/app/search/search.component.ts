import { Component, ElementRef, Input, OnInit, Query, ViewChild } from '@angular/core';
import { SearchServiceService } from '../search-service/search-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() isEditMode:boolean = false;
  
  search_engine:string = 'https://www.google.com/search';
  activeEngineImg:string = 'http://google.es/favicon.ico';
  suggestions:string[] = [];
  deployed:boolean = false;

  @ViewChild('queryInput') queryInput!:ElementRef;
  @ViewChild('languageCode') languageInput!:ElementRef;
  @ViewChild('suggestionsRef') suggestionsRef!:ElementRef;

  constructor(private searchService:SearchServiceService) { }

  ngOnInit(): void {

    //Creo un event listener para comprobar si se pulsa el enter en una sugerencia del cuadro de sugerencias
    document.addEventListener('keyup', (event:KeyboardEvent) => {
      if (this.deployed && event.key == 'Enter') { //SI el cuadro de sugerencias esta abierto y se pulsa enter simulo un click
        if (document.activeElement) {
          const focusedElement = (<HTMLLIElement>document.activeElement);
          focusedElement.click();
        } 
      }
    });

  }

  /* 
  Recibe como parametro un string con la dirección url del motor de busqueda seleccionado y modifica el atributo search_engine
  */
  setSearchEngine(engine:any) {
    this.activeEngineImg = engine.img;

    if (engine.url.match(/.*duckduckgo.*/))
      this.search_engine = engine.url;
    else if (engine.url.match(/.*youtube.*/))
      this.search_engine = engine.url+'/results';
    else
      this.search_engine = engine.url+'/search';    
  }

  showSuggestions() {
    const query = (<HTMLInputElement>this.queryInput.nativeElement).value;
    const languageCode = (<HTMLInputElement>this.languageInput.nativeElement).value;

    if (query.length === 0) {
      this.suggestions = [];
      this.deployed = false;
      return;
    } 

    this.searchService.getSearchSuggestions(query,languageCode).subscribe((data:any) => {
      this.deployed = true;
      const suggestionsDiv = (<HTMLDivElement>this.suggestionsRef.nativeElement);
      const searchBar = (<HTMLInputElement>this.queryInput.nativeElement);

      suggestionsDiv.style.top = searchBar.getBoundingClientRect().bottom + "px";

      this.suggestions = data[1];
      
    })
  }

  setSuggestion(suggestion:string) {
    const query = (<HTMLInputElement>this.queryInput.nativeElement);
    query.value = suggestion;
    query.focus();

    this.showSuggestions();
  }

}
