import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Link from 'src/app/model/Link.model';
import Tag from 'src/app/model/Tag.model';
import { LinksServiceService } from 'src/app/services/links-service/links-service.service';

@Component({
  selector: 'app-new-link-panel',
  templateUrl: './new-link-panel.component.html',
  styleUrls: ['./new-link-panel.component.css']
})
export class NewLinkPanelComponent implements OnInit {

  linkColor = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
  crossColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color');

  @Output() exitPanelEmitter:EventEmitter<string> = new EventEmitter<string>();
  link:Link = new Link(0,'','','',[]);

  newLinkForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private linksService:LinksServiceService) { 
    this.link.tags = this.linksService.selectedNewLinkTags;
  }

  ngOnInit(): void {

  }

  removeTag(tag:Tag) {
    const index = this.link.tags.indexOf(tag);
    if (index !== -1) {
      tag.selected = false;
      this.link.tags.splice(index,1);
    }
  }

  onSubmit() {
    this.link.name = this.newLinkForm.value.name;
    this.link.url = this.newLinkForm.value.url;
    this.link.imageUrl = this.newLinkForm.value.image;
    this.link.tags = this.link.tags.slice()
    this.linksService.links.push(this.link);


    // ADD LINK API !!!!!!!!!!
    this.exitPanelEmitter.emit('links');
  }

  cancel() {
    this.exitPanelEmitter.emit('links');
  }

}
