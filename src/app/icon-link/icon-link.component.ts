import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Link } from '../link/link.model';
import { LinkService } from '../link/link.service';
import calculateVW from '../functions/calculateVW';
import calculateVH from '../functions/calculateVH';
import { PopUpWindow } from '../pop-up-window/popup-window.model';
import { Folder } from '../link/folder.model';

@Component({
  selector: 'app-icon-link',
  templateUrl: './icon-link.component.html',
  styleUrls: ['./icon-link.component.css']
})
export class IconLinkComponent implements OnInit, OnChanges {

  @Input() link:any = null;
  @Input() index:number = 0;
  @Input() hasFatherFolder:boolean = false;

  @Input() isEditMode:boolean = false;
  cantDelete:boolean = false;
  @Input() filters:boolean = false;
  @Input() showLinks:boolean = false;

  @Output() newLinkEmitter = new EventEmitter<HTMLButtonElement>();
  @Output() editLinkEmitter = new EventEmitter<any>();
  @Output() deleteLinkEmitter = new EventEmitter<HTMLButtonElement>();
  @Output() isOpenFolderEmitter = new EventEmitter<{index:number,open:boolean}>();

  @ViewChild('folder') folder!:ElementRef;
  @ViewChild('folderLinks') folderLinks!:ElementRef;

  constructor(private linkService: LinkService) { }

  ngOnInit(): void {
    //Actualizo la posición del link
    this.link.setNumberLink(this.index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.filters) {
      //Actualizo la posición del link
      this.link.setNumberLink(this.index);

      if (this.link.getUserId() != 0 && !this.hasFatherFolder) { //Si el usuario a iniciado sesión
        //Actualizo el link en la base de datos y si no existe lo guardo
        if (this.link.getIsSaved()) {
          this.linkService.updateLink(this.link).subscribe();
        } else {
          this.linkService.newLink(this.link).subscribe();
          this.link.setIsSaved(true);
        }
      }
    }
    //Carpetas creadas por administrador
    if(this.link.getUserId() == -1) {
      this.cantDelete = true;
    }
  }

  /* Si no esta activado el modo editar redirige al usuario al link
     Si está activado envía un evento para editar el link */
  clickLink(event:MouseEvent) {
    if (!this.isEditMode) {
      if (event.button == 0) 
        window.location.href = this.link.getUrl();
      else if (event.button == 1) {
        let actualWindow = document.defaultView;
        open(this.link.getUrl(),'_blank',"");
      } else {
        this.openSettings()
      }
    } else {
      this.editLinkEmitter.emit([this.link,-1]);
    }
  }

  openSettings() {
    alert("Abriendo opciones... :D")
  }

  clickFolderLink(event:MouseEvent,link:number) {
    if (!this.isEditMode) {
      if (event.button == 0) 
        window.location.href = this.link.getLinks()[link].getUrl();
      else if (event.button == 1)
        window.open(this.link.getLinks()[link].getUrl(),'_blank');
    }
  }

  //Actualiza la posición de los links de una carpeta, para situarlos debajo de esta
  updatePosition() {
    if (this.showLinks) this.showLinks = false;
    const position = this.folder.nativeElement.getBoundingClientRect();

    this.folderLinks.nativeElement.style.left = position.left-calculateVW(0.25)+'px';
  }

  //Despliega los links de la carpeta
  showFolder() {
    this.isOpenFolderEmitter.emit({index: this.index, open: !this.showLinks});
  }

  // Abre una ventana emergente para añadir un nuevo link a la carpeta
  addLinkPopUp(event:Event) {
    event.stopPropagation();
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
  
    popup.printWindow();
  }


  //Guarda el nuevo link en la carpeta
  addLinktoFolder() {
    const name = (<HTMLInputElement>document.querySelector('input#name'));
    const url = (<HTMLInputElement>document.querySelector('input#url'));
    const img = (<HTMLInputElement>document.querySelector('img#newLinkImg'));

    let textUrl;
    !url.value.trim().startsWith('http://') && !url.value.trim().startsWith('https://') ? textUrl = 'http://'+url.value.trim() : textUrl = url.value.trim(); 

    const link = new Link('ICON',0,textUrl,img.src,0,name.value,this.link.getUserId(),0);
    this.link.addLink(link);
    this.linkService.newFolderLink(link,this.link.getId())?.subscribe( () => {

        this.linkService.getFolderLinks(this.link)?.subscribe((links) => {
          //Relleno el array del folder con todos los datos de los links, incluido el nuevo
          const folderLinks:Link[] = [];
          for (let link of <any>links) {
            folderLinks.push(new Link('ICON',0,link.url,link.visible_url,0,link.name,this.link.getUserId(),link.id,true));
          }
          this.link.setLinks(folderLinks);
        }); 

    });
  }
  editFolderLink(link:number) {
    this.editLinkEmitter.emit([this.link,link]);
  }

  /* Borra un link de la carpeta */
  deleteFolderLink(event:Event,button:HTMLButtonElement) {
    event.stopPropagation();
    this.linkService.deleteFolderLink((<Folder>this.link).removeLink(parseInt(button.value))).subscribe();
  }

  //Emite un evento para crear un nuevo link
  createNewLink(button:HTMLButtonElement) {
    this.newLinkEmitter.emit(button);
  }

  // Emite un evento para borrar el link
  deleteLink(button:HTMLButtonElement) {
    this.deleteLinkEmitter.emit(button);
  }

  setDefaultImage(event:Event) {
    const img = <HTMLImageElement>event.currentTarget
    if (img.parentElement)
      img.parentElement.innerHTML = `
      <div style="
      font-weight:bolder; 
      place-self:center; 
      text-overflow: ellipsis; 
      overflow: hidden; 
      width: 130px">
        ${this.link.name}
      </div>`;
  }

}
