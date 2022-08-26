import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog'
import { ModalcontraseniaComponent } from './modalcontrasenia/modalcontrasenia.component';

@Component({
  selector: 'app-recuperarcontrasenia',
  templateUrl: './recuperarcontrasenia.component.html',
  styleUrls: ['./recuperarcontrasenia.component.css']
})
export class RecuperarcontraseniaComponent implements OnInit {

  form: FormGroup;
  mensajeErrorContrasenia: string;
  visibilidadMensajeContrasenia: boolean;

  constructor(public dialog: MatDialog) {
    this.form = new FormGroup ({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
    this.mensajeErrorContrasenia = "Las contraseñas no coinciden";
    this.visibilidadMensajeContrasenia = false;
  }

  ngOnInit(): void {}

  verificarCredenciales(){
    //Cambia las visibilidades porque no hay forma por el momento de comprobar credenciales.
    this.visibilidadMensajeContrasenia = true;
    this.openModal();
  }

  openModal() {
    this.dialog.open(ModalcontraseniaComponent);
  }
}
