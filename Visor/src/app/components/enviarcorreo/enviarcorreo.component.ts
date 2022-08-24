import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enviarcorreo',
  templateUrl: './enviarcorreo.component.html',
  styleUrls: ['./enviarcorreo.component.css']
})
export class EnviarcorreoComponent implements OnInit {

  form: FormGroup;
  mensajeErrorCorreo: string;
  visibilidadMensajeCorreo: boolean;

  constructor() {
    this.form = new FormGroup ({
      user: new FormControl(''),
      correo: new FormControl('')
    });
    this.mensajeErrorCorreo = "El usuario y/o correo ingresados no son válidos. Contactesé con el administrador del sitio";
    this.visibilidadMensajeCorreo = false;
  }

  ngOnInit(): void {}

  verificarCredenciales(){
    //Cambia las visibilidades porque no hay forma por el momento de comprobar credenciales.
    this.visibilidadMensajeCorreo = true;  
  }

}
