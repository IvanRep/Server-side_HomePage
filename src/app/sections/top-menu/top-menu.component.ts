import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Tag from 'src/app/model/Tag.model';
import { LinksServiceService } from 'src/app/services/links-service/links-service.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {


  @Output() reloadEmitter:EventEmitter<void> = new EventEmitter<void>(); 

  constructor(private linksService:LinksServiceService) { }

  ngOnInit(): void {
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
    a.setAttribute('download', this.linksService.user+'_localsave.json');

    a.style.display = 'none';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  }

  onClickUpload() {
    //Create ContextMenu
    const div = document.createElement('div');
    div.id = 'contextMenu';
    div.style.position = 'absolute';
    div.style.display = 'block';
    div.style.top = '0';
    div.style.left = '0';
    div.style.right = '0';
    div.style.bottom = '0';
    div.style.margin = 'auto';
    div.style.maxHeight = '10vw';
    div.style.width = '20vw';
    div.style.maxWidth = '20vw';
    div.style.display = 'grid'
    div.style.gridTemplateAreas = "'ti ti' 'in iy'"
    div.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color');
    div.style.borderRadius = '25px';
    
    const title = document.createElement('div');
    title.style.margin = 'auto';
    title.style.gridArea = 'ti';
    title.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
    title.textContent = '¿Quieres sobrescribir los datos?';
    
    div.appendChild(title);

    const inputN = document.createElement('input');
    inputN.style.gridArea = 'in';
    inputN.style.color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color');
    inputN.style.textAlign = 'center';
    inputN.style.fontSize = '20px';
    inputN.style.width = '100%'
    inputN.classList.add('pointer');
    inputN.value = 'Añadir Links';
    inputN.onmousedown = (ev:MouseEvent) => {ev.preventDefault(); ev.stopImmediatePropagation(); this.uploadJSON(false); document.body.removeChild(div);};
    div.appendChild(inputN)

    const inputY = document.createElement('input');
    inputY.style.gridArea = 'iy';
    inputY.style.color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-background-color');
    inputY.style.textAlign = 'center';
    inputY.style.fontSize = '20px';
    inputY.style.width = '100%'
    inputY.classList.add('pointer');
    inputY.value = 'Sobrescribir Links';
    inputY.onmousedown = (ev:MouseEvent) => { ev.preventDefault(); ev.stopImmediatePropagation(); this.uploadJSON(true); document.body.removeChild(div);};
    div.appendChild(inputY);

    document.body.appendChild(div);
  }

  uploadJSON(overwrite:boolean) {
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
          if (overwrite) {
            this.linksService.links.length = 0;
            this.linksService.tags.length = 0;
          }

          this.linksService.loadData(json.Links,json.Tags);
          this.linksService.saveLocalLinks();
          this.linksService.saveLocalTags();
          //Reload links and tags
          this.reloadEmitter.emit();
          
        },
        () => {
          console.log('rejected')
        });
      }
    })

  }

}
