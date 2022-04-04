import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import calculateVW from '../functions/calculateVW';
import { IconLinkComponent } from '../icon-link/icon-link.component';
import { Folder } from '../link/folder.model';
import { Link } from '../link/link.model';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit, OnChanges {

  @Input() icon_links:any[] = [];
  @Input() isEditMode:boolean = false;
  @Input() filters:boolean = false;

  @Output() newLinkEmitter = new EventEmitter<HTMLButtonElement>();
  @Output() editLinkEmitter = new EventEmitter<any>();
  @Output() deleteLinkEmitter = new EventEmitter<HTMLButtonElement>();

  foldersOpen:boolean[] = [];
  selectedFolder!:any; 
  showScroll = true;
  @ViewChildren(IconLinkComponent)
  iconLinkComponent!: QueryList<IconLinkComponent>;
  @ViewChild('right')
  rightButton!:ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.foldersOpen.fill(false,0,this.icon_links.length);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const main = (<HTMLDivElement>document.querySelector('.icons main'));
    //Mostrar u Ocultar flechas de desplazamiento
    if (this.rightButton) {
      if (this.icon_links.length > 4) 
        this.rightButton.nativeElement.style.display = 'block';
      else {
        this.rightButton.nativeElement.style.display = 'none';
      }
    }
  }

  openFolder(options:any = {open: false, index: 0}) {
    this.showScroll = !options.open;

    for (let i = 0; i<this.icon_links.length;i++) {
      if (i == options.index) {
        options.open ? this.selectedFolder = this.icon_links[i] : this.selectedFolder = null;
        return;
      }
    }

  }

  //Ejecutado al hacer scroll en el main, recorre todos los iconos, y ejecuta el metodo updatePosition para actualizar la posición de los links de carpetas
  updatePosition() {
    this.openFolder() //Cierro todas las carpetas;
    this.iconLinkComponent.forEach(item => {
      if (item.link.getFolder()!=0) {
        item.updatePosition();
      }
    });
  }

}
