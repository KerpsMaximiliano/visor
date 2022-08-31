import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalcontraseniaComponent } from 'src/app/shared/modal-contrasenia/modalcontrasenia.component';

@Component({
  selector: 'app-recuperarcontrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarcontraseniaComponent implements OnInit {

  password:FormControl = new FormControl("", Validators.required);
  confirmPassword:FormControl = new FormControl("", Validators.required);
  mensajeErrorContrasenia: string;
  visibilidadMensajeContrasenia: boolean;

  constructor(public dialog: MatDialog) {
    this.mensajeErrorContrasenia = "Las contraseñas no coinciden";
    this.visibilidadMensajeContrasenia = false;
  }

  ngOnInit(): void {}

  enviarCorreo(){
    //Cambia las visibilidades porque no hay forma por el momento de comprobar credenciales.
    this.openModal();
  }

  verificarContrasenias(){
    let username: string = String(this.password.value)
    let password: string = String(this.confirmPassword.value)
    if(String(this.password.value) != String(this.confirmPassword.value)){
      this.visibilidadMensajeContrasenia = true;
    }
    else{
      this.visibilidadMensajeContrasenia = false;
      this.openModal()
    }
  }

  openModal() {
    this.dialog.open(ModalcontraseniaComponent);
  }
}
