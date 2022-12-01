import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http:HttpClient) { }

  getSearchSuggestions(query:string) {

    return this.http.jsonp('http://suggestqueries.google.com/complete/search?client=firefox&q='+query, 'callback');
  }

  getWebImages(url:string) {
    this.http.jsonp(url,'callback').subscribe( (data:any) => {

      console.log(data);
      //const doc = data.documentElement;
    });
  }

}
