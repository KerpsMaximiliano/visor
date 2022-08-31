import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog'
import { ModalenviarcorreoComponent } from '../../componentes/shared/modales/modal-enviar-correo/modal-enviar-correo.component';
import { LoginService } from '../../interfaces/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:FormControl = new FormControl("", Validators.required);
  password:FormControl = new FormControl("", Validators.required);

  mensajeError: string;
  visibilidadMensaje: boolean;

  constructor(public dialog: MatDialog, public loginService: LoginService) {
    this.mensajeError= "El usuario y/o contraseña no son correctos";
    this.visibilidadMensaje = false;
  }

  ngOnInit(): void {}
  
  comprobarCredenciales(){
    let username: string = String(this.user.value)
    let password: string = String(this.password.value)
    console.log(username);
    switch (this.loginService.verificarCredenciales(username, password)){
      case 1:
        this.visibilidadMensaje = false;
        break;
      case 2:
        this.visibilidadMensaje = true;
        break;
      case 3:
        this.visibilidadMensaje = true;
        break;

      case 4:
        this.visibilidadMensaje = true;
        break;
      }
  }

  openModal(){
    this.dialog.open(ModalenviarcorreoComponent);   
  }
}
