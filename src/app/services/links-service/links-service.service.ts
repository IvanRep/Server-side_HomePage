import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Link from 'src/app/model/Link.model';
import Tag from 'src/app/model/Tag.model';

@Injectable({
  providedIn: 'root'
})
export class LinksServiceService {

  links:Link[] = [new Link(0,'Nombre del Link','Url','image',[]),new Link(0,'Nombre del Link','Url','image',[])];
  tags:Tag[] = [new Tag(0,'Etiqueta'),new Tag(1,'Etiqueta'),new Tag(2,'Etiqueta')];

  //This arrays contains the Tags that have been selected by the user 
  selectedFilterTags:Tag[] = []; //Filters apllied to links
  selectedNewLinkTags:Tag[] = []; //New Link's Tags

  constructor(private http:HttpClient) { }

}
