import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http:HttpClient) { }

  getSearchSuggestions(query:string, languageCode:string) {
    let params = new HttpParams();
    params.append('output','toolbar');
    params.append('q',query);
    params.append('hl',languageCode);

    return this.http.jsonp('http://suggestqueries.google.com/complete/search?client=firefox&q='+query, 'callback');
  }

  getWebImages() {
    
  }

}
