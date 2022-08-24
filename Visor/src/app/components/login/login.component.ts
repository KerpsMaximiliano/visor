import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  mensajeErrorContrasenia: string;
  mensajeErrorUsuario: string;
  visibilidadMensajeUsuario: boolean;
  visibilidadMensajeContrasenia: boolean;

  constructor() {
    this.form = new FormGroup ({
      user: new FormControl(''),
      password: new FormControl('')
    });
    this.mensajeErrorContrasenia = "La contraseña ingresada no es correcta";
    this.mensajeErrorUsuario = "El usuario ingresado no es válido";
    this.visibilidadMensajeContrasenia = false;
    this.visibilidadMensajeUsuario = false;
  }

  ngOnInit(): void {}

  verificarCredenciales(){
    //Cambia las visibilidades porque no hay forma por el momento de comprobar credenciales.
    this.visibilidadMensajeUsuario = false;
    this.visibilidadMensajeContrasenia = true;  
  }

}
