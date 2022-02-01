import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { Folder } from './folder.model';
import { Link } from './link.model';
import { Target } from './target.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  url = "http://192.168.1.56/HomePage/php/links.php";
  folderUrl = "http://192.168.1.56/HomePage/php/folders.php";

  constructor(private http:HttpClient) { }

  
  /* Devuelve todos los links del usuario pasado como parametro */
  getLinks(user:User) {
    return this.http.get(this.url+'?user_id='+user.getId(),{responseType: 'json'});
  }

  /* Metodo usado para guardar los datos de un nuevo link en la base de datos */
  newLink(link:any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(link);
    return this.http.post(this.url,body,{headers, responseType: 'json'}); 
  }

  /* Guarda los datos de un nuevo link y su carpeta padre en la base de datos */
  newFolderLink(link:any,folder_id:number) {
    if (link.getUserId() == 0)
      return;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(link);
    return this.http.post(this. folderUrl+'?folder_id='+folder_id,body,{headers, responseType: 'json'}); 
  }

  /* Devuelve todos los links de una carpeta */
  getFolderLinks(link:Target) {
    if (link.getUserId() != 0)
      return this.http.get(this.folderUrl+'?folder_id='+link.getId(),{responseType: 'json'});
    return
  }

  /* Modifica la posición del link en la base de datos */
  updateLink(target:Target) {
    if (target instanceof Link) {
      const link = (<Link>target);
      return this.http.put(this.url+'?id='+target.getId()+'&number_link='+target.getNumberLink()+'&name='+link.getName()+'&url='+link.getUrl()+'&visible_url='+link.getVisibleUrl(),{responseType: 'json'});
    }
    const folder = (<Folder>target)
    const links = JSON.stringify(folder.getLinks());
    return this.http.put(this.url+'?id='+target.getId()+'&number_link='+target.getNumberLink()+'&links='+links,{responseType: 'json'});
  }

  /* Borra el usuario pasado como parametro de la base de datos */
  deleteLink(target:Target) {
    if (target.getUserId() != 0)
      return this.http.delete(this.url+'?id='+target.getId(),{responseType: 'json'});
    return;
  }

  /* Borra el link pasado como parametro (el link tiene que ser de dentro de una carpeta) */
  deleteFolderLink(link:Link) {
    return this.http.delete(this.folderUrl+'?id='+link.getId(),{responseType: 'json'});
  }

  /* Guarda los datos de la sesión en almacenamiento local del usuario */
  localSave(list_links:Target[], icon_links:Target[]) {
    const links = icon_links.concat(list_links);
    window.localStorage.setItem('links',JSON.stringify(links));
  }

  /* Devuelve los datos guardados en el almacenamiento local del usuario */
  localLoad() {
    const links = window.localStorage.getItem('links');
    if (links)
      return <Target[]>JSON.parse(links);
    return null;
  }


}
