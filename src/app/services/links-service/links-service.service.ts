import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Link from 'src/app/model/Link.model';
import Tag from 'src/app/model/Tag.model';

@Injectable({
  providedIn: 'root'
})
export class LinksServiceService {

  user = 'local'
  links:Link[] = [];
  tags:Tag[] = [];

  //This arrays contains the Tags that have been selected by the user 
  selectedFilterTags:Tag[] = []; //Filters apllied to links
  selectedNewLinkTags:Tag[] = []; //New Link's Tags

  constructor(private http:HttpClient) {

    const links = localStorage.getItem(this.user+'Links');
    const tags = localStorage.getItem(this.user+'Tags');
    if (links && tags) {
      this.loadData(JSON.parse(links), JSON.parse(tags));
    }

  }

  saveLocalLinks() {

    this.sortLinks();
    localStorage.setItem(this.user+'Links',JSON.stringify(this.links));    
  }

  saveLocalTags() {

    this.sortTags();    
    localStorage.setItem(this.user+'Tags',JSON.stringify(this.tags));
  }

  loadData(links:any, tags:any) {
    for (let tag of tags) {
      const currentTag = new Tag(tag.id,tag.name,tag.selectedByDefault,false,false,tag.creationDate);
      if (currentTag.selectedByDefault) {
        currentTag.selected = true;
        this.selectedFilterTags.push(currentTag);
      }
      this.tags.push(currentTag);

    }
    for (let link of links) {
      let selectedTags = [];
      for (let linkTag of link.tags) {
        for (let tag of this.tags) {
          if (linkTag.name === tag.name) {
            selectedTags.push(tag);
            break;
          }
        }
      }
      this.links.push(new Link(link.id,link.name,link.url,link.imageUrl,selectedTags,link.creationDate))
    }

    this.sortTags();
    this.sortLinks();
  }

  sortTags() {
    this.tags.sort((a:Tag, b:Tag) => {

      for (let i = 0; i<a.name.length; i++) {
        if (i >= b.name.length) return 1;

        if (a.name.toLowerCase().charCodeAt(i) === b.name.toLowerCase().charCodeAt(i)) continue;

        if (a.name.toLowerCase().charCodeAt(i) < b.name.toLowerCase().charCodeAt(i)) return -1;
        
        if (a.name.toLowerCase().charCodeAt(i) > b.name.toLowerCase().charCodeAt(i)) return 1;  
      }

      return 0;
      
    });
  }

  sortLinks() {
    this.links.sort((a:Link, b:Link) => {

      for (let i = 0; i<a.name.length; i++) {
        if (i >= b.name.length) return 1;

        if (a.name.toLowerCase().charCodeAt(i) === b.name.toLowerCase().charCodeAt(i)) continue;

        if (a.name.toLowerCase().charCodeAt(i) < b.name.toLowerCase().charCodeAt(i)) return -1;
        
        if (a.name.toLowerCase().charCodeAt(i) > b.name.toLowerCase().charCodeAt(i)) return 1;  
      }

      return 0;
      
    });
  }

}
