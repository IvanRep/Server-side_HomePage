import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopUpWindow } from '../pop-up-window/popup-window.model';
import { User } from './user.model';
import calculateVW from '../functions/calculateVW';
import calculateVH from '../functions/calculateVH';
import { UserService } from './user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user:User = new User();

  @Output() loginEmitter:EventEmitter<User> = new EventEmitter<User>(); 
  @Output() closeSesionEmitter:EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  openEditUsuario(button:HTMLButtonElement) {
    //Si el usuario tiene la sesión iniciada
    if (this.user.getId() != 0) {

      const popup = new PopUpWindow({
        isTitle: true,
        title: 'Buenos dias '+this.user.getName(),
        isBody: false,
        isCancelButton: false,
        confirmMethod: () => {this.closeSesionEmitter.emit()},
        confirmButtonText: 'Cerrar Sesión',
        confirmButtonBackground: '--danger-color',
        confirmButtonColor: '--main-color',
        height: ['min(150px, 20vh)'],
      });
      const rect = (<HTMLButtonElement>button).getBoundingClientRect();
      
      const top = (rect.bottom)+calculateVH(1.5)+'px';
      const left = rect.right-calculateVW(20)+'px';
      popup.printWindow(top,left);

      //Si no hay ninguna sesión iniciada
    } else {
      const body = `
        <input type="text" id="name" name="name" placeholder=" "/>
        <label for="name">Nombre</label>
        <input type="text" id="password" name="password" placeholder=" "/>
        <label for="password">Contraseña</label>
      `;
      const popup = new PopUpWindow({
        isTitle: false,
        body: [body],
        confirmButtonText: 'Iniciar Sesión',
        cancelButtonText: 'Registrarse',
        confirmMethod: () => {this.login()},
        cancelMethod: () => {this.register()},
        width: '20vw',
        height: ['max(150px, 25vh)'],
      });
      const rect = (<HTMLButtonElement>button).getBoundingClientRect();
      
      const top = (rect.bottom)+calculateVH(1.5)+'px';
      const left = rect.right-calculateVW(20)+'px';
    
      popup.printWindow(top,left);
    }
  }


  login(name:string = '',password:string = '') {
    if (name == '' && password == '') {
      name = (<HTMLInputElement>document.querySelector('input#name')).value;
      password = (<HTMLInputElement>document.querySelector('input#password')).value;
    }
    this.user.setName(name);
    this.user.setPassword(password);

    this.userService.login(this.user).subscribe((result) => {this.setUser(result)});
  }

  setUser(result:any) {
    this.user.setId(result.id)
    
    this.loginEmitter.emit(this.user);
  }

  register() {
    const name = (<HTMLInputElement>document.querySelector('input#name'));
    const password = (<HTMLInputElement>document.querySelector('input#password'));
    this.user.setName(name.value);
    this.user.setPassword(password.value);

    this.userService.newUser(this.user).subscribe(() => {this.login(name.value, password.value)});
  }

}
