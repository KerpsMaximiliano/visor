import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-modalenviarcorreo',
  templateUrl: './modalenviarcorreo.component.html',
  styleUrls: ['./modalenviarcorreo.component.css']
})
export class ModalenviarcorreoComponent implements OnInit {

  form: FormGroup;
  mensajeErrorCorreo: string;
  visibilidadMensajeCorreo: boolean;

  constructor(public dialogRef: MatDialogRef<LoginComponent>) {
    this.form = new FormGroup ({
      user: new FormControl(''),
      correo: new FormControl('')
    });
    this.mensajeErrorCorreo = "El usuario y/o correo ingresados no son válidos. Contactesé con el administrador del sitio";
    this.visibilidadMensajeCorreo = true;
  }

  ngOnInit(): void {}

  enviarCorreo(){
    this.dialogRef.close();
   
  }
}
