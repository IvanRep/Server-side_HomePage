import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import Tag from 'src/app/model/Tag.model';
import { LinksServiceService } from 'src/app/services/links-service/links-service.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit, OnChanges {

  @Input() panel = "links";

  @Output() selectTagEmitter:EventEmitter<void> = new EventEmitter<void>();
  filteredTags:Tag[]
  selectedTags:Tag[];

  constructor(private linksService:LinksServiceService) { 
    this.filteredTags = linksService.tags.slice();
    this.selectedTags = this.linksService.selectedFilterTags;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.panel.currentValue === changes.panel.previousValue) return;
    
    //If the active main panel is newLink the tags will be stored in selectedNewLinkTags to add them to the new link.
    if (changes.panel.currentValue === "newLink") {
      this.selectedTags = this.linksService.selectedNewLinkTags;
      this.linksService.selectedFilterTags.forEach( (tag:Tag) => {
        tag.selected = false;
      });

    //Otherwise the menu will be used to filter the links by the tags selected in selectedFilterTags.
    } 
    if (changes.panel.currentValue === "links") {
      this.selectedTags = this.linksService.selectedFilterTags;
      this.linksService.selectedFilterTags.forEach( (tag:Tag) => {
        tag.selected = true;
      });
      this.linksService.selectedNewLinkTags.forEach( (tag:Tag) => {
        tag.selected = false;
      });
    }
  }

  ngOnInit(): void {

    document.querySelector('app-main-menu')?.addEventListener('mousedown', (ev:any) => {
      this.openGeneralTagsOptions(ev)});

  }

  filterTags(filter:string) {
    this.filteredTags = [];
    this.linksService.tags.forEach((value:Tag, index:number) => {
      if (value.name.toLowerCase().startsWith(filter.toLowerCase())) {
        this.filteredTags.push(value);
      }
    })
  }
  selectTag(event:MouseEvent, tag:Tag) {

    if (event.button == 2) {
      this.openOneTagOptions(event, tag);
      return;
    }

    //If the control key is not press it clear the selected Tags
    if (!event.ctrlKey && this.panel === 'links') {
      this.selectedTags.forEach((value:Tag) => {
        value.selected = false;
      });
      this.selectedTags.length = 0;
    }
    //If the tag exists in the array it delete it ,else it add it
    let tagIndex = this.selectedTags.indexOf(tag);
    if (tagIndex === -1) {
      this.selectedTags.push(tag);
      tag.selected = true;
    } else {
      this.selectedTags.splice(tagIndex,1);
      tag.selected = false;
    }

    this.selectTagEmitter.emit();
  }

  openOneTagOptions(event:MouseEvent,tag:Tag) {
    event.stopPropagation();
    //Close ContextMenu if it is open
    const settings = document.getElementById('contextMenu');
    if (settings) {
      document.body.removeChild(settings);
      return;
    }
    //Create ContextMenu
    const ul = document.createElement('ul');
    ul.id = 'contextMenu';
    ul.style.position = 'absolute';
    ul.style.display = 'block';
    ul.style.top = event.clientY + 'px';
    ul.style.left = event.clientX + 'px';

    //Set tag as default tag
    let li = document.createElement('li');
    li.textContent = 'Etiqueta por Defecto';
    li.classList.add('separator');
    li.onmousedown = (event)=>{ this.setDefaultTag(event, tag) };
    ul.appendChild(li);


    //Edit tag's name
    li = document.createElement('li');
    li.textContent = 'Editar Etiqueta';
    li.onmousedown = (event)=>{ this.editTag(event, tag) };
    ul.appendChild(li);

    //Delete tag
    li = document.createElement('li');
    li.textContent = 'Borrar Etiqueta';
    li.classList.add('delete');
    li.classList.add('separator');
    li.onmousedown = (event)=>{ this.deleteTag(event, tag) };
    ul.appendChild(li);

    //New Tag
    li = document.createElement('li');
    li.textContent = 'Nueva Etiqueta';
    li.onmousedown = (event)=>{ this.createTag(event, this.filteredTags) };
    ul.appendChild(li);
    
    document.body.appendChild(ul);

    console.log('1-> cl: '+ul.offsetLeft+' ww: '+window.innerWidth)

    //Prevents contextMenu from exiting the screen 
    if (ul.clientWidth + ul.offsetLeft > window.innerWidth) {
     ul.style.left = (window.innerWidth - (ul.clientWidth + 10)) + 'px';
    }
    if (ul.clientHeight + ul.offsetTop > window.innerHeight) {
      ul.style.top = (window.innerHeight - (ul.clientHeight + 10)) + 'px';
    }
  }

  openGeneralTagsOptions(event:MouseEvent) {
    event.stopImmediatePropagation()
    const settings = document.getElementById('contextMenu');
    if (settings) {
      document.body.removeChild(settings);
      return;
    }

    if (event.button === 2) {
      const ul = document.createElement('ul');
      ul.id = 'contextMenu';
      ul.style.position = 'absolute';
      ul.style.display = 'block';
      ul.style.top = event.clientY + 'px';
      ul.style.left = event.clientX + 'px';

      //New Tag
      const li = document.createElement('li');
      li.textContent = 'Nueva Pestaña';
      li.onmousedown = (event)=>{ this.createTag(event, this.filteredTags) };
      ul.appendChild(li);
      
      document.body.appendChild(ul);

      //Prevents contextMenu from exiting the screen 
      if (ul.clientWidth + ul.offsetLeft > window.innerWidth) {
        ul.style.left = (window.innerWidth - (ul.clientWidth + 10)) + 'px';
      }
      if (ul.clientHeight + ul.offsetTop > window.innerHeight) {
        ul.style.top = (window.innerHeight - (ul.clientHeight + 10)) + 'px';
      }
    }
  }

  createTag(event:MouseEvent, tags:Tag[]) {
    event.preventDefault();
    if (event.button !== 0) return;


    const id = tags.length>0 ? tags[tags.length-1].id+1 : 0;
    tags.push(new Tag(id,'',false,false,true));

    setTimeout(() => {
      const div = (<HTMLDivElement>document.querySelector('div#tagdiv'+id));
      div.focus()});
  }

  editTag(event:MouseEvent, tag:Tag) {
    event.preventDefault();
    if (event.button === 0) {
      tag.editable = true;
    }
  }

  saveTag(tag:Tag,filter:string) {
    if (tag.editable) {
      const div = (<HTMLDivElement>document.querySelector('div#tagdiv'+this.filteredTags[this.filteredTags.length-1].id));
      tag.name = div.textContent || '';
      div.textContent = tag.name;
      if (tag.name.length === 0) {
        const index = this.filteredTags.indexOf(tag);
        if (index !== -1)
          this.filteredTags.splice(index);
        return;
      } 
      tag.name.trim();
      tag.name.charAt(0).toUpperCase();
      tag.editable = false;

      if (this.linksService.tags.includes(tag)) {
        //CHANGE NAME API !!!!!!
      } else {
        this.linksService.tags.push(tag);
        //SAVE TAG API !!!!!!!
      }

      this.linksService.saveLocalTags() // SAVE TAGS lOCAL

      this.filterTags(filter);
    }

    
  }

  discardTag(event:KeyboardEvent, tag:Tag) {
    if (event.key === "Enter") {
      (<HTMLDivElement>event.currentTarget).blur();
    }
    if (event.key === "Escape") {
      const index = this.filteredTags.indexOf(tag);
      if (index !== -1)
        this.filteredTags.splice(index);
    }
  }

  deleteTag(event:MouseEvent, tag:Tag) {
    event.preventDefault();
    if (event.button !== 0) return;
    
    let index = this.filteredTags.indexOf(tag);
    if (index !== -1)
      this.filteredTags.splice(index);
    
    index = this.linksService.tags.indexOf(tag);
    if (index !== -1)
      this.linksService.tags.splice(index);
  
    index = this.selectedTags.indexOf(tag);
    if (index !== -1)
      this.selectedTags.splice(index);
    
    this.linksService.saveLocalTags() // SAVE TAGS lOCAL
    this.linksService.saveLocalLinks() // SAVE LINKS lOCAL
    //DELETE TAGS OF LINKS
    //DELETE TAG API !!!!!!!!
  }

  setDefaultTag(event:MouseEvent, tag:Tag) {
    event.preventDefault();
    if (event.button === 0) {
      
      this.linksService.tags.forEach( (value) => {
        if (value.selectedByDefault)
          value.selectedByDefault = false;
      });
      
      tag.selectedByDefault = true;

      this.linksService.saveLocalTags() // SAVE TAGS lOCAL
      //SET DEFAULT TAG API !!!!!!
      //CHANGE OLD DEFAULT TAG API !!!!!

    }

  }
}
