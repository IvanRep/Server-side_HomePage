import { ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import Link from 'src/app/model/Link.model';
import Tag from 'src/app/model/Tag.model';
import { LinksServiceService } from 'src/app/services/links-service/links-service.service';

@Component({
  selector: 'app-links-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './links-panel.component.html',
  styleUrls: ['./links-panel.component.css']
})
export class LinksPanelComponent implements OnInit, OnChanges {

  @Input() view:string = 'simple-link';
  @Input() reload:boolean = false;
  @Input() checkTags:boolean = false;
  @Output() newLinkEmitter:EventEmitter<string> = new EventEmitter<string>();
  @Output() editLinkEmitter:EventEmitter<Link> = new EventEmitter<Link>();
  filteredLinks:Link[]

  constructor(private linksService:LinksServiceService) {
    this.newLinkEmitter = new EventEmitter<string>();
    this.filteredLinks = [];
  }

  ngOnInit(): void {
    this.filterLinks();

    document.querySelector('app-links-panel')?.addEventListener('mousedown', (ev:any) => {
      this.openGeneralLinksOptions(ev)});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterLinks();
  }

  filterLinks() {
    // if no tag is selected, all links are added to the filteredLinks
    if (this.linksService.selectedFilterTags.length === 0) {
      this.filteredLinks = this.linksService.links.slice();
      return;
    }

    // if not, clear the array and add the links that contain at least one selected Tag 
    this.filteredLinks = [];
    this.linksService.links.forEach((link:Link) => {
      let validLink:boolean = true; // Check if the link contains all selected tags
      for (let tag of this.linksService.selectedFilterTags) {

        if (!link.tags.includes(tag)) {
          validLink = false;
          break;
        }
      }
      if (validLink) this.filteredLinks.push(link); //If the link contains all selected tags, it is added

    });
  }

  openGeneralLinksOptions(event:MouseEvent) {
    event.stopImmediatePropagation()
    const settings = document.getElementById('contextMenu');
    if (settings) {
      document.body.removeChild(settings);
      return;
    }
    const confirmMenu = (<HTMLDivElement>document.querySelector('app-confirm-menu'));
    if (confirmMenu) {
      confirmMenu.style.visibility = 'hidden';
      confirmMenu.style.opacity = '0';
    }

    if (event.button === 2) {
      const ul = document.createElement('ul');
      ul.id = 'contextMenu';
      ul.style.position = 'absolute';
      ul.style.display = 'block';
      ul.style.top = event.clientY + 'px';
      ul.style.left = event.clientX + 'px';

      //New Link
      const li = document.createElement('li');
      li.textContent = 'Nuevo Link';
      li.onmousedown = (event)=>{ this.newLinkEmitter.emit('newLink')};
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


  openOneLinkOptions(event:MouseEvent,link:Link) {
    event.stopPropagation();
    //Close ContextMenu if it is open
    const settings = document.getElementById('contextMenu');
    if (settings) {
      document.body.removeChild(settings);
      return;
    }
    const confirmMenu = (<HTMLDivElement>document.querySelector('app-confirm-menu'));
    if (confirmMenu) {
      confirmMenu.style.visibility = 'hidden';
      confirmMenu.style.opacity = '0';
    }
    if (event.button !== 2) return;

    //Create ContextMenu
    const ul = document.createElement('ul');
    ul.id = 'contextMenu';
    ul.style.position = 'absolute';
    ul.style.display = 'block';
    ul.style.top = event.clientY + 'px';
    ul.style.left = event.clientX + 'px';

    //Edit Link
    let li = document.createElement('li');
    li.textContent = 'Editar Link';
    li.onmousedown = (event)=>{ this.editLinkEmitter.emit(link) };
    ul.appendChild(li);

    //Delete Link
    li = document.createElement('li');
    li.textContent = 'Eliminar Link';
    li.classList.add('delete');
    li.classList.add('separator');
    li.onmousedown = (event)=>{ this.deleteLink(event, link) };
    ul.appendChild(li);

    //New Link
    li = document.createElement('li');
    li.textContent = 'Nueva Link';
    li.onmousedown = (event)=>{ this.newLinkEmitter.emit('newLink') };
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

  deleteLink(event:MouseEvent, link:Link) {
    event.preventDefault();
    if (event.button !== 0) return;
    
    let index = this.filteredLinks.indexOf(link);
    if (index !== -1)
      this.filteredLinks.splice(index,1);
    
    index = this.linksService.links.indexOf(link);
    if (index !== -1) {
      this.linksService.links.splice(index,1);

      this.linksService.saveLocalLinks() // SAVE LINKS lOCAL
    }
    
    //DELETE LINK API !!!!!!!!
  }

}
