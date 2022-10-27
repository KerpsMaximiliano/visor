import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog'
import { LoginService } from '../../services/i2t/login.service';
import { ModalenviarcorreoComponent } from '../../shared/modal-enviar-correo/modal-enviar-correo.component';
import { Usuario } from '../../interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variables de instancia.
  user:FormControl = new FormControl("", Validators.required);
  password:FormControl = new FormControl("", Validators.required);
  mensajeError: string;
  visibilidadMensaje: boolean;


  constructor(private _dialog: MatDialog, private _loginService: LoginService, private _router: Router) {
    this.mensajeError= "El usuario y/o contraseña no son correctos"; //Mensaje rojo
    this.visibilidadMensaje = false;
  }

  ngOnInit(): void {}
  

  /**
   * Este método sirve para comprobar las credenciales llamando a
   * los servicios correspondientes de verificación.
   */
  comprobarCredenciales(){
    let usuario: Usuario = {
      usuario: String(this.user.value),
      password: String(this.password.value)
    }
    console.log("Se ejecutó la llamada al servicio de login")
    this._loginService.obtenerToken(usuario).subscribe((resp: any) => {
      if(resp.returnset[0].RCode == 1){
        //Se almacena el token en el LocalStorage.
        localStorage.setItem('auth_token', resp.dataset[0].jwt);
        localStorage.setItem('usuario', this.user.value);
        this.visibilidadMensaje = false;
        //this._router.navigate(['vista-disenio-funcional']);
        this._router.navigate(['dashboard']);
      }
      else{
        this.visibilidadMensaje = true;
      }
    })
  }
  
  /**
   * Este método sirve para abrir el modal de enviar correo.
   */
  openModal(){
    this._dialog.open(ModalenviarcorreoComponent);   
  }
}
