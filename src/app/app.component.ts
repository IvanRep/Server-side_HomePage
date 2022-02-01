import { Component, OnInit } from '@angular/core';
import { Link } from './link/link.model';
import { PopUpWindow } from './pop-up-window/popup-window.model';
import calculateVW from './functions/calculateVW';
import { User } from './user/user.model';
import { LinkService } from './link/link.service';
import { Folder } from './link/folder.model';
import { Target } from './link/target.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HomePage';

  user:User = new User();
  search_engine:string = 'https://www.google.com';

  isEditMode:boolean = false;
  isListLink:boolean = false;
  icon_links:Target[] = [];
  list_links:Target[] = [];

  filters:boolean = false;
  
  constructor(private linkService:LinkService) {}

  ngOnInit() {
    this.getUser();
    this.linkService.getLinks(this.user).subscribe(links => {
      this.getLinks(links);

      // Si el usuario es el por defecto (no se ha iniciado sesión) o no se han cargado correctamente los links, los intenta cargar desde el almacenamiento local del usuario
      if (this.user.getId() == 0 || (this.icon_links.length == 0 && this.list_links.length == 0)) {
        const links  = this.linkService.localLoad(); 
        if (links) this.getLinks(links);
      }
    });

    //Al cerrarse la página guardo en local los datos de la sesión
    window.addEventListener('unload',() => {this.linkService.localSave(this.list_links,this.icon_links)});

    //

  }

  /* Comprueba si hay un usuario guardado en el equipo e inicia la sesion con él */
  getUser() {
    const user_id = localStorage.getItem('user_id');
    const user_name = localStorage.getItem('user_name');
    if (user_id && user_name) {
      this.user.setId(parseInt(user_id));
      this.user.setName(user_name);
    }
  }
  
  /* Guarda los datos del usuario logueado en el equipo local y obtiene de la base de datos sus links guardados */
  userLogin(user:User) {
    this.user = user;
    localStorage.setItem('user_id',this.user.getId().toString());
    localStorage.setItem('user_name',this.user.getName());

    this.linkService.getLinks(this.user).subscribe(links => {this.getLinks(links)});
  }

  /* Cierra la sesión del usuario y vacia todos los arrays */
  closeSesion() {
    localStorage.removeItem('user_id'); 
    localStorage.removeItem('user_name');
    this.user = new User();
    this.icon_links = [];
    this.list_links = [];
  }

  /* Recorre el array pasado como parametro con todos los Links, y los ordena en dos array dependiendo de su tipo */
  getLinks(links:any) {
    this.icon_links = [];
    this.list_links = [];
    for (let link of links) {
      let savedLink
      if (link.folder == 0) { 
        savedLink = new Link(link.type,link.number_link,link.url,link.visible_url,link.folder,link.name,link.user_id,link.id,true) 
      } else {
        let savedFolderLinks:Link[] = [];
        for (let folderLink of link.links) {
          savedFolderLinks.push(new Link(link.type,link.number_link,folderLink.url,folderLink.visible_url,0,folderLink.name,link.user_id,folderLink.id,true));
        }
        savedLink = new Folder(link.type,link.number_link,link.folder,link.name,savedFolderLinks.slice(),link.user_id,link.id,true);
        console.log(savedLink.getLinks());
      }
      if (link.type == 'ICON') {
        this.icon_links.push(savedLink);
      } else {
        this.list_links.push(savedLink);
      }
    }
  }

  editLink(oldLink:any,type:string) {
    if (oldLink[1] != -1) type = 'FOLDER';
    const popup = new PopUpWindow({
      isCancelButton: true,
      isTitle: false,
      isBody: true,
      body: [''],
      confirmMethod: () => {
          
          let textUrl;
          !url.value.trim().startsWith('http://') && !url.value.trim().startsWith('https://') ? textUrl = 'http://'+url.value.trim() : textUrl = url.value.trim();  
          let link = new Link(type,oldLink[0].getNumberLink(),textUrl,img.src,0,name.value,this.user.getId(),oldLink[0].getId(),true);
          //Dependiendo del tipo del link lo añado a una lista diferente
          if (type == 'FOLDER') {
            const link = new Link(type,oldLink[0].getNumberLink(),textUrl,img.src,0,name.value,this.user.getId(),oldLink[0].getLinks()[oldLink[1]].getId(),true);
            oldLink[0].getLinks().splice(oldLink[1],1,link); //Añado el nuevo link a la carpeta
            //Creo un nuevo folder para que angular vea que ha cambiado la dirección de memoria y actualice sus datos
            const folder = new Folder(oldLink[0].getType(),oldLink[0].getNumberLink(),oldLink[0].getFolder(),oldLink[0].getName(),oldLink[0].getLinks(),oldLink[0].getUserId(),oldLink[0].getId(),true);
            oldLink[0].getType() == 'ICON' ?
            this.icon_links[oldLink[0].getNumberLink()] = folder : this.list_links[oldLink[0].getNumberLink()] = folder
          } else {
            type == 'ICON' ? 
            this.icon_links[oldLink[0].getNumberLink()] = link : this.list_links[oldLink[0].getNumberLink()] = link;
          }
      },
      width: ['20vw','20vw'],
      height: ['calc(100px + 12vh)','calc(10px + 15vh)'],
    });
    popup.printWindow();

    const name = (<HTMLInputElement>document.querySelector('input#name'));
    const url = (<HTMLInputElement>document.querySelector('input#url'));
    const img = (<HTMLInputElement>document.querySelector('img#newLinkImg'));
    
    if (type == 'FOLDER') {
      const  folder = (<Folder>oldLink[0]);
      name.value = folder.getLinks()[oldLink[1]].getName();
      url.value = folder.getLinks()[oldLink[1]].getUrl();
      img.src = folder.getLinks()[oldLink[1]].getVisibleUrl();
    } else {
      name.value = oldLink[0].getName();
      url.value = oldLink[0].getUrl();
      img.src = oldLink[0].getVisibleUrl();
    }
  }

    /* 
  Recibe un booleano
  Modifica el valor del atributo isNewLink (usado para mostrar el fomulario para añadir nuevos enlaces)
  */
  createNewLink(button:HTMLButtonElement,type:string) {
    const bodyLink = '';

    const bodyFolder = `
    
    <input type="text" id="name" name="name" placeholder=" " autocomplete="n"/>
    <label for="name">Nombre</label>`;
    

    const popup = new PopUpWindow({
      isCancelButton: true,
      isTitle: false,
      isBody: true,
      isOptions: true,
      options: ['Nuevo Link',' Nueva Carpeta'],
      body: [bodyLink,bodyFolder],
      confirmMethod: () => {this.saveLink(parseInt(button.value),type)},
      width: ['20vw','20vw'],
      height: ['calc(100px + 12vh)','calc(10px + 15vh)'],
    });
    // const rect = (<HTMLButtonElement>button).getBoundingClientRect();
    
    // const top = (rect.bottom)+'px';
    // const left = (rect.left - calculateVW(20)/2 + (rect.right - rect.left))+'px'
    // popup.printWindow(top,left);
    popup.printWindow();
  }


  /*
  Guarda los datos del nuevo link en el array correspondiente
  */
  saveLink(position:number,type:string) {
    if (!position) position = 0;
    const option = (<HTMLButtonElement>document.querySelector('div.alert-options'));
    let link;
    const name = (<HTMLInputElement>document.querySelector('input#name'));
    const url = (<HTMLInputElement>document.querySelector('input#url'));
    const img = (<HTMLInputElement>document.querySelector('img#newLinkImg'));
    if (option.getAttribute('option') == '0') {
      let textUrl;
      !url.value.trim().startsWith('http://') && !url.value.trim().startsWith('https://') ? textUrl = 'http://'+url.value.trim() : textUrl = url.value.trim();  
      link = new Link(type,position+1,textUrl,img.src,0,name.value,this.user.getId());
    } else {
      
      link = new Folder(type,position+1,1,name.value,[],this.user.getId());
    } 
    //Dependiendo del tipo del link lo añado a una lista diferente
    type == 'ICON' ? 
      this.icon_links.splice(position+1,0,link) 
      : this.list_links.splice(position+1,0,link);
  }


  deleteLink(button:HTMLButtonElement,type:string) {
    const body = "¿Seguro que quieres eliminar el link?";

    const popup = new PopUpWindow({
      isCancelButton: true,
      isTitle: true,
      isBody: true,
      title: 'Borrar Enlace',
      body: [body],
      confirmMethod: () => {this.delete(parseInt(button.value),type)},
      width: '20vw',
    });
    const rect = (<HTMLButtonElement>button).getBoundingClientRect();
    
    const top = (rect.bottom)+'px';
    const left = (rect.left - calculateVW(20)/2 + (rect.right - rect.left))+'px'
  
    popup.printWindow(top,left);
  }

  delete(position:number,type:string) {
    if (type == 'ICON') {
      this.linkService.deleteLink(this.icon_links[position])?.subscribe();
      this.icon_links.splice(position,1);
    } else {
      this.linkService.deleteLink(this.list_links[position])?.subscribe();
      this.list_links.splice(position,1);
    }
  }

  showOnly(option:number) {
    this.linkService.getLinks(this.user).subscribe(links => {
      this.getLinks(links);
      const icon_links_copy = this.icon_links.slice();
      const list_links_copy = this.list_links.slice();
      switch(option) {
        case 0:
          this.filters = false;
          break;
        case 1:
          this.filters = true;
          this.icon_links = [];
          icon_links_copy.forEach((value) => {
            if (value.getFolder() != 0) this.icon_links.push(value);
          });
          this.list_links = [];
          list_links_copy.forEach((value) => {
            if (value.getFolder() != 0) this.list_links.push(value);
          });
          break;
        case 2:
          this.filters = true;
          this.icon_links = [];
          icon_links_copy.forEach((value) => {
            if (value.getFolder() == 0) this.icon_links.push(value);
          });
          this.list_links = [];
          list_links_copy.forEach((value) => {
            if (value.getFolder() == 0) this.list_links.push(value);
          });
          break;
      }
    });
  }

  /* 
  Recibe como parametro un string con la dirección url del motor de busqueda seleccionado y modifica el atributo search_engine
  */
  setSearchEngine(engine:string) {
    if (engine.match(/.*duckduckgo.*/))
      this.search_engine = engine;
    else if (engine.match(/.*youtube.*/))
      this.search_engine = engine+'/results';
    else
      this.search_engine = engine+'/search';
    
  }

  /*
  Detiene la propagación del evento para que no llegue a los elementos padre
  (Usado para evitar el cierre del formulario al clickearlo)
  */
  stopPropagation(event:Event) {
    event.stopPropagation();
  }

  /*
  Rota el valor del atributo isEditMode entre true y false (para activar y desactivar el modo edición) 
  */
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  /* 
  */
  openListLink() {
    this.isListLink = true;
  }

  /*
  Cierra la barra lateral
  */
  closeAside() {
    this.isListLink = false;
  }
}
