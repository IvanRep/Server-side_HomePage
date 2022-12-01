import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import SearchEngine from 'src/app/model/SearchEngine.model';
import { SearchServiceService } from 'src/app/services/search-service/search-service.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() setSearchWindowEmitter:EventEmitter<string> = new EventEmitter<string>(); // Should emit 'search'

  engine:SearchEngine = new SearchEngine('Google','https://google.com/search','q','https://www.google.com/favicon.ico');

  searchForm:FormGroup = new FormGroup({
    search: new FormControl(''),
    languageCode: new FormControl('es'),
  })

  deployed:boolean = false;
  suggestions:string[] = [];

  @ViewChild('queryInput') queryInput!:ElementRef;
  @ViewChild('searchBtn') searchBtn!:ElementRef;
  @ViewChild('suggestionsRef') suggestionsRef!:ElementRef;


  constructor(private searchService:SearchServiceService) { }

  ngOnInit(): void {
    let url = window.location.href;
    if (url.split('/')[3].startsWith('search') || url.split('/')[3].startsWith('#gsc') || url.split('#gsc')[1] != undefined) {
      this.searchForm.setValue({search: url.substring(url.indexOf('q=')+2).replace(/&[A-z=.&0-9]*/,''), languageCode: 'es'});
    }
  }

  paste(event:MouseEvent) {
    if (event.button === 2) {
      navigator.clipboard.readText().then((clipText) =>
        (<HTMLInputElement>event.target).value = clipText);
    }
  }

  newTabSearch(event:KeyboardEvent) {
    this.closeSuggestions();
    if (!(event.key === 'Enter')) return;
    
    if (!event.ctrlKey) {
      this.onSubmit();
    } else {
      let win = window.open(this.engine.url+'?'+this.engine.searchParameter+'='+this.searchForm.value.search, '_blank');
    }
  }

  cancelSearch() {
    this.showSuggestions();
    if (this.searchForm.value.search.length !== 0) return;

    if (location.href.includes('#')) location.href = location.href.split('#')[0] + '#';
    this.setSearchWindowEmitter.emit('links');
  }

  onSubmit() {
    if (this.searchForm.value.search.length === 0) return;
    if (this.engine.name === 'Google') {
      location.href = location.href.split('#')[0] + '#gsc.q=' + this.searchForm.value.search;
      this.setSearchWindowEmitter.emit('googleSearch');
      // setTimeout(() => location.reload());
  
      // #gsc.tab=0&gsc.q=HOLA&gsc.page=1
    } else {
      let win = window.open(this.engine.url+'?'+this.engine.searchParameter+'='+this.searchForm.value.search, '_blank');
    }
  
  }


  showSuggestions() {
    if (this.closeSuggestions()) return;

    this.searchService.getSearchSuggestions(this.searchForm.value.search).subscribe((data:any) => {
      this.deployed = true;
      const suggestionsDiv = (<HTMLDivElement>this.suggestionsRef.nativeElement);
      const searchBar = (<HTMLInputElement>this.queryInput.nativeElement);
      const searchButton = (<HTMLInputElement>this.searchBtn.nativeElement);

      suggestionsDiv.style.top = searchBar.getBoundingClientRect().bottom + "px";
      suggestionsDiv.style.width = searchBar.getBoundingClientRect().width + (searchButton.getBoundingClientRect().width * 2) + "px";

      this.suggestions = data[1];
      
    })
  }

  closeSuggestions() {
    if (this.searchForm.value.search.length === 0) {
      this.suggestions = [];
      this.deployed = false;
      return true;
    }
    return false;
  }

  setSuggestion(suggestion:string) {
    const query = (<HTMLInputElement>this.queryInput.nativeElement);
    this.searchForm.setValue({search: suggestion, languageCode: 'es'});
    query.focus();

    this.showSuggestions();
  }
}
