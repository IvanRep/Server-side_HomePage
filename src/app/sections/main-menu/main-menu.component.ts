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
  @Input() reload = false;

  @Output() selectTagEmitter:EventEmitter<void> = new EventEmitter<void>();
  filteredTags:Tag[]
  selectedTags:Tag[];

  constructor(private linksService:LinksServiceService) { 
    this.filteredTags = linksService.tags.slice();
    this.selectedTags = this.linksService.selectedFilterTags;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.panel && changes.panel.currentValue !== changes.panel.previousValue) {
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
        this.linksService.selectedNewLinkTags.forEach( (tag:Tag) => {
          tag.selected = false;
        });
        this.linksService.selectedFilterTags.forEach( (tag:Tag) => {
          tag.selected = true;
        });
      }
    }

    if (changes.reload && changes.reload.currentValue !== changes.reload.previousValue) {
      this.filterTags('');
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

    if (tag.editable) return;

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
    li.textContent = tag.selectedByDefault ? 'Deseleccionar por Defecto' : 'Etiqueta por Defecto';
    if (tag.selectedByDefault) li.classList.add('delete');
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
      li.textContent = 'Nueva Etiqueta';
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

    let id = 0;
    //Set max id
    tags.forEach((tag:Tag) => {
      if (tag.id >= id) 
        id = tag.id + 1;
    });

    tags.push(new Tag(id,'',false,false,true));

    setTimeout(() => {
      const div = (<HTMLDivElement>document.querySelector('div#tagdiv'+id));
      div.classList.add('new');
      div.focus()},100);
  }

  editTag(event:MouseEvent, tag:Tag) {
    event.preventDefault();
    if (event.button === 0) {
      tag.editable = true;
      setTimeout(() => {
        const div = (<HTMLDivElement>document.querySelector('div#tagdiv'+tag.id));
        div.focus()},100);
    }
  }

  saveTag(div:HTMLDivElement,tag:Tag,filter:string) {
    if (tag.editable) {
      tag.name = div.textContent || '';
      div.textContent = tag.name;
      if (tag.name.length === 0 || this.checkIfTagExists(tag)) {
        const index = this.filteredTags.indexOf(tag);
        if (index !== -1 && div.classList.contains('new')) //Delete tag if it is a new Tag
          this.filteredTags.splice(index,1);
        return;
      }

      tag.name.trim();
      tag.name = tag.name.charAt(0).toUpperCase() + tag.name.substring(1);
      div.textContent = tag.name;
      tag.editable = false;
      div.classList.remove('new');

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

  checkIfTagExists(tag:Tag) {
    for (let value of this.linksService.tags) {
      if (tag.name === value.name && tag.id !== value.id) {
        return true;
      }
    }

    return false;
  }

  discardTag(event:KeyboardEvent, tag:Tag) {
    if (event.key === "Enter") {
      (<HTMLDivElement>event.currentTarget).blur();
    }
    if (event.key === "Escape") {
      tag.editable = false;

      const index = this.filteredTags.indexOf(tag);
      if (index !== -1 && (<HTMLDivElement>event.currentTarget).classList.contains('new'))  //Delete tag if it is a new Tag
        this.filteredTags.splice(index,1);
    }
  }

  deleteTag(event:MouseEvent, tag:Tag) {
    event.preventDefault();
    if (event.button !== 0) return;
    
    let index = this.filteredTags.indexOf(tag);
    if (index !== -1)
      this.filteredTags.splice(index,1);
    
    index = this.linksService.tags.indexOf(tag);
    if (index !== -1)
      this.linksService.tags.splice(index,1);
  
    index = this.selectedTags.indexOf(tag);
    if (index !== -1)
      this.selectedTags.splice(index,1);
    
    this.linksService.saveLocalTags() // SAVE TAGS lOCAL
    this.linksService.saveLocalLinks() // SAVE LINKS lOCAL

    this.linksService.loadData(this.linksService.links.slice(), this.linksService.tags.slice(), true);
    this.filterTags('');
    this.selectTagEmitter.emit();
    //DELETE TAGS OF LINKS
    //DELETE TAG API !!!!!!!!
  }

  setDefaultTag(event:MouseEvent, tag:Tag) {
    event.preventDefault();
    if (event.button !== 0) return;
    
    if (tag.selectedByDefault) {
      this.linksService.tags.forEach( (value) => {
        if (value.selectedByDefault)
          value.selectedByDefault = false;
      });
    } else {
      this.linksService.tags.forEach( (value) => {
        if (value.selectedByDefault)
          value.selectedByDefault = false;
      });

      tag.selectedByDefault = true;
    }
    
      this.linksService.saveLocalTags() // SAVE TAGS lOCAL
      //SET DEFAULT TAG API !!!!!!
      //CHANGE OLD DEFAULT TAG API !!!!!
  }
}
