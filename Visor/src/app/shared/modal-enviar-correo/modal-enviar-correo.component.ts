import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../../../components/login/login.component';

@Component({
  selector: 'app-modalenviarcorreo',
  templateUrl: './modal-enviar-correo.component.html',
  styleUrls: ['./modal-enviar-correo.component.css']
})
export class ModalenviarcorreoComponent implements OnInit {

  user:FormControl = new FormControl("", Validators.required);
  email:FormControl = new FormControl("", [Validators.required, Validators.email, Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')]);
  mensajeErrorCorreo: string;
  visibilidadMensajeCorreo: boolean;
  duracionEnSegundos: Number = 5;

  constructor(public dialogRef: MatDialogRef<LoginComponent>) {
    this.mensajeErrorCorreo = "El usuario y/o correo ingresados no son válidos. Contactesé con el administrador del sitio";
    this.visibilidadMensajeCorreo = true;
  }

  ngOnInit(): void {}

  enviarCorreo(){
    this.dialogRef.close();
    setTimeout('window.alert("Se ha enviado un email con las instrucciones")', 500);
  }
}
