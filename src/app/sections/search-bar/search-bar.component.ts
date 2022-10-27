import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() setSearchWindowEmitter:EventEmitter<string> = new EventEmitter<string>(); // Should emit 'search'

  searchForm:FormGroup = new FormGroup({
    search: new FormControl(''),
    languageCode: new FormControl('es'),
  })

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let url = window.location.href;
    if (url.split('/')[3].startsWith('search') || url.split('/')[3].startsWith('#gsc'))
      this.searchForm.setValue({search: url.substring(url.indexOf('q=')+2).replace(/&[A-z=.&0-9]*/,''), languageCode: 'es'});
  }

  onSubmit() {
    console.warn(this.searchForm.value);
    this.router.navigate(['search'],{ queryParams: { q: this.searchForm.value.search, page: 1, tab: 0}, });
    
    setTimeout(() => location.reload());

    console.log(this.route.queryParams)
    // #gsc.tab=0&gsc.q=HOLA&gsc.page=1
  }
}
