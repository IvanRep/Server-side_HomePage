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

    localStorage.setItem(this.user+'Links',JSON.stringify(this.links));
  }

  saveLocalTags() {
    
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
  }

}
