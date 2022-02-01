import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import calculateVW from '../functions/calculateVW';
import { Folder } from '../link/folder.model';
import { Link } from '../link/link.model';
import { LinkService } from '../link/link.service';
import { PopUpWindow } from '../pop-up-window/popup-window.model';

@Component({
  selector: 'app-list-link',
  templateUrl: './list-link.component.html',
  styleUrls: ['./list-link.component.css']
})
export class ListLinkComponent implements OnInit, OnChanges {

  @Input() link:any = new Link();
  @Input() index:number = -1;
  @Input() isEditMode:boolean = false;
  @Input() filters:boolean = false;
  @Input() showFolderLinks:boolean = false;
  @Input() haveFolder = false;

  @Output() newLinkEmitter = new EventEmitter<HTMLButtonElement>();
  @Output() deleteLinkEmitter = new EventEmitter<HTMLButtonElement>();
  @Output() isOpenFolderEmitter = new EventEmitter<{index:number, open:boolean}>();


  constructor(private linkService:LinkService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.filters) {
      //Actualizo la posición del link
      this.link.setNumberLink(this.index);
      if (this.link.getUserId() != 0) { //Si el usuario a iniciado sesión
        //Actualizo la posición del link en la base de datos y si no existe lo guardo
        if (this.link.getIsSaved()) {
          this.linkService.updateLink(this.link).subscribe();
        } else {
          this.linkService.newLink(this.link).subscribe();
          this.link.setIsSaved(true);
        }
      }
    }
  }

  setDefaultImage(event:Event,img:HTMLImageElement) {
    event.preventDefault();
    event.stopPropagation();
    img.src = '../../assets/enlace.svg';
    
  }

  //Despliega los links de la carpeta
  showFolder() {
    this.isOpenFolderEmitter.emit({index: this.index, open: !this.showFolderLinks});
  }

  // Añade un link a la carpeta
  addFolderLink(button:HTMLButtonElement) {
    if (this.link.getLinks().length > 5)
      return;
    const body = '';

    const popup = new PopUpWindow({
      isCancelButton: true,
      isTitle: false,
      isBody: true,
      body: [body],
      confirmMethod: () => {this.addLinktoFolder()},
      width: ['20vw'],
      height: ['calc(100px + 12vh)'],
    });
    // const rect = (<HTMLButtonElement>button).getBoundingClientRect();
    
    // const top = (rect.bottom)+'px';
    // const left = (rect.left - calculateVW(20)/2 + (rect.right - rect.left))+'px'
  
    // popup.printWindow(top,left);
    popup.printWindow();
  }

  addLinktoFolder() {
    const name = (<HTMLInputElement>document.querySelector('input#name'));
    const url = (<HTMLInputElement>document.querySelector('input#url'));
    const img = (<HTMLImageElement>document.querySelector('img#newLinkImg'));
    let textUrl;
    !url.value.trim().startsWith('http://') && !url.value.trim().startsWith('https://') ? textUrl = 'http://'+url.value.trim() : textUrl = url.value.trim();
    const link = new Link('LIST',0,textUrl,img.src,0,name.value,this.link.getUserId());
    if (this.link instanceof Folder) {
      (<Folder>this.link).addLink(link);
    }
    this.linkService.newFolderLink(link,this.link.getId())?.subscribe();
  }

  /* Borra un link de la carpeta */
  deleteFolderLink(button:HTMLButtonElement) {
    this.linkService.deleteFolderLink((<Folder>this.link).removeLink(parseInt(button.value))).subscribe();
  }


  createNewLink(button:HTMLButtonElement) {
    this.newLinkEmitter.emit(button);
  }

  deleteLink(button:HTMLButtonElement) {
    this.deleteLinkEmitter.emit(button);
  }



}
