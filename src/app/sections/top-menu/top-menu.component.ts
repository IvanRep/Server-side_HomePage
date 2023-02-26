import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmMenuInterface } from 'src/app/components/confirm-menu/confirm-menu.interface';
import Tag from 'src/app/model/Tag.model';
import { LinksServiceService } from 'src/app/services/links-service/links-service.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit, ConfirmMenuInterface {


  @Output() reloadEmitter:EventEmitter<void> = new EventEmitter<void>();

  fillButtonsColor:string[] = [
    getComputedStyle(document.documentElement).getPropertyValue('--main-background-color'),
    getComputedStyle(document.documentElement).getPropertyValue('--main-background-color')
  ];

  @ViewChild('ConfirmMenu') confirmMenu!:ElementRef;

  constructor(public linksService:LinksServiceService) {}

  ngOnInit(): void {
    const menu = (<HTMLDivElement>document.querySelector('app-confirm-menu'))
    menu.onmousedown = (event:MouseEvent) => {event.stopImmediatePropagation(); event.preventDefault();}
  }

  downloadJSON() {

    const tags = this.linksService.tags.slice();
    tags.forEach( (tag:Tag) => {
      tag.selected = false;
      tag.selectedByDefault = false;
    })

    const json = {
      Links: this.linksService.links,
      Tags: tags
    }

    let a = document.createElement('a');
    a.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json)));
    a.setAttribute('download', this.linksService.user.name+'_localsave.json');

    a.style.display = 'none';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  }

  onClickUpload() {
    //Show ContextMenu
    const menu = (<HTMLDivElement>document.querySelector('app-confirm-menu'))
    menu.style.visibility = "visible";
    menu.style.opacity = "1";
  }

  mainFunction() {
    this.linksService.links.length = 0;
    this.linksService.tags.length = 0;
    this.secondaryFunction();
  }

  secondaryFunction() {
    let input = document.createElement('input');
    input.setAttribute('type','file');
    input.setAttribute('accept','application/json');
    input.style.display = 'none';

    document.body.appendChild(input);

    input.click();
    input.addEventListener('change', (ev) => {
      console.table(input.files)
      if (input.files && input.files[0].type === 'application/json') {
        input.files[0].text().then( (value) => {

          const json = JSON.parse(value);


          this.linksService.loadData(json.Links,json.Tags);
          this.linksService.saveLocalLinks();
          this.linksService.saveLocalTags();
          //Reload links and tags
          this.reloadEmitter.emit();

          const menu = (<HTMLDivElement>document.querySelector('app-confirm-menu'))
          menu.style.visibility = "hidden";
          menu.style.opacity = "0";
        },
        () => {
          console.error('rejected')
        });
      }
    })
  }

  onHover(enter:boolean, button:number) {
    if (enter) {
      this.fillButtonsColor[button] = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    } else {
      this.fillButtonsColor[button] = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
    }
  }

}
