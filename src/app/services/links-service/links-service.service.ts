import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Link from 'src/app/model/Link.model';
import Tag from 'src/app/model/Tag.model';
import User from 'src/app/model/User.model';
import settings from 'src/settings.json';

@Injectable({
  providedIn: 'root'
})
export class LinksServiceService {

  user:User = new User();
  links:Link[] = [];
  tags:Tag[] = [];

  //This arrays contains the Tags that have been selected by the user
  selectedFilterTags:Tag[] = []; //Filters apllied to links
  selectedNewLinkTags:Tag[] = []; //New Link's Tags

  constructor(private http:HttpClient) {

    const links = localStorage.getItem(location.href.split('#')[0]+this.user.name+'Links');
    const tags = localStorage.getItem(location.href.split('#')[0]+this.user.name+'Tags');
    if (links && tags) {
      this.loadData(JSON.parse(links), JSON.parse(tags));
    }

  }

  saveLocalLinks() {

    this.sortLinks();
    localStorage.setItem(location.href.split('#')[0]+this.user.name+'Links',JSON.stringify(this.links));
  }

  saveLocalTags() {

    this.sortTags();
    localStorage.setItem(location.href.split('#')[0]+this.user.name+'Tags',JSON.stringify(this.tags));
  }

  loadData(links:any, tags:any, reset = false) {
    if (reset) {
      this.links.length = 0;
      this.tags.length = 0;
    }
    for (let tag of tags) {
      const currentTag = new Tag(tag.id,tag.name,tag.selectedByDefault,false,false,tag.creationDate);
      if (currentTag.selectedByDefault && !reset) { //If it's not a reset, the tag selected by default is selected
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

    if (reset) { //If it's a reset, the previous selected tags will be reset
      for (let i:number = 0; i<this.selectedFilterTags.length; i++) {
        for(let tag of this.tags) {
          if (tag.name === this.selectedFilterTags[i].name) {
            tag.selected = true;
            this.selectedFilterTags[i] = tag;
            break;
          }
        }
      }
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
