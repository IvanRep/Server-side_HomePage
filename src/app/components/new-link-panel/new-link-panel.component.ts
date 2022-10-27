import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Link from 'src/app/model/Link.model';
import { LinksServiceService } from 'src/app/services/links-service/links-service.service';

@Component({
  selector: 'app-new-link-panel',
  templateUrl: './new-link-panel.component.html',
  styleUrls: ['./new-link-panel.component.css']
})
export class NewLinkPanelComponent implements OnInit {

  @Output() exitPanelEmitter:EventEmitter<string> = new EventEmitter<string>();
  link:Link = new Link(0,'','','',[]);

  newLinkForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private linksService:LinksServiceService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.link.name = this.newLinkForm.value.name;
    this.link.url = this.newLinkForm.value.url;
    this.link.imageUrl = this.newLinkForm.value.image;
    this.linksService.links.push(this.link);


    // ADD LINK API !!!!!!!!!!
    this.exitPanelEmitter.emit('links');
  }

  cancel() {
    this.exitPanelEmitter.emit('links');
  }

}
