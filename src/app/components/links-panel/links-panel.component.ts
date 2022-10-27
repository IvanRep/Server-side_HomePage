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

  @Input() checkTags:boolean = false;
  @Output() newLinkEmitter:EventEmitter<string> = new EventEmitter<string>();
  filteredLinks:Link[]

  constructor(private linksService:LinksServiceService) {
    this.filteredLinks = [];
  }

  ngOnInit(): void {
    this.filterLinks();

    document.querySelector('app-main-panel')?.addEventListener('mousedown', (ev:any) => {
      this.openGeneralLinksOptions(ev)});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterLinks();
    console.log(changes)
  }

  filterLinks() {
    // if no tag is selected, all links are added to the filteredLinks
    if (this.linksService.selectedTags.length === 0) {
      this.filteredLinks = this.linksService.links.slice();
      return;
    }

    // if not, clear the array and add the links that contain at least one selected Tag 
    this.filteredLinks = [];
    this.linksService.links.forEach((link:Link) => {
      link.tags.forEach((tag:Tag) => {
        if (this.linksService.selectedTags.includes(tag)) {
          this.filteredLinks.push(link);
        }
      });
    });
  }

  openGeneralLinksOptions(event:MouseEvent) {
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

      //New Link
      const li = document.createElement('li');
      li.textContent = 'Nuevo Link';
      li.onmousedown = ()=>{ this.newLinkEmitter.emit('newLink')};
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

}
