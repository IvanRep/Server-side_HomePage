import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = "";

  constructor(private http: HttpClient) {
    this.http.get("/settings.json",{responseType:'json'}).subscribe((settings:any) => {this.url = settings.api_url+"/users.php"});
  }

  /* Devuelve el usuario si sus credenciales existen en la base de datos */
  login(user:User) {
    return this.http.get(this.url+'?name='+user.getName()+'&password='+user.getPassword(),{responseType: 'json'});
  }

  /* Metodo usado para guardar los datos de un nuevo usuario en la base de datos */
  newUser(user:User) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(user);
    return this.http.post(this.url,body,{headers, responseType: 'json'}); 
  }

  /* Borra el usuario pasado como parametro de la base de datos */
  deleteUser(user:User) {
    return this.http.delete(this.url+'?id='+user.getId(),{responseType: 'json'});
  }

}
