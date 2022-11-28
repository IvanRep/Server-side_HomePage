import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import SearchEngine from 'src/app/model/SearchEngine.model';

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

  constructor(private route: ActivatedRoute, private router: Router) { }

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
    if (!(event.key === 'Enter')) return;
    
    if (!event.ctrlKey) {
      this.onSubmit();
    } else {
      let win = window.open(this.engine.url+'?'+this.engine.searchParameter+'='+this.searchForm.value.search, '_blank');
    }
  }

  cancelSearch() {
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
}
