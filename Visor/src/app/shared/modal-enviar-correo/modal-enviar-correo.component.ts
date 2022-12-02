import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { LoginService } from '../../services/i2t/login.service';
import { Usuario } from '../../interfaces/usuario';

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

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private _loginService: LoginService) {
    this.mensajeErrorCorreo = "El usuario y/o correo ingresados no son válidos. Contactesé con el administrador del sitio";
    this.visibilidadMensajeCorreo = true;
  }

  ngOnInit(): void {}

  enviarCorreo(){
    let objetoTemporal: Usuario ={
      usuario: String(this.user.value),
      password: '',
      email: String(this.email.value)
    }
    console.log(objetoTemporal.usuario)
    console.log(objetoTemporal.email)
    this._loginService.enviarCorreo(objetoTemporal).subscribe((resp: any) => {
      console.log(resp)
      if(resp.returnset[0].RCode == 1){
        console.log("Se ejecutó correctamente");
        setTimeout('window.alert("Se ha enviado un email con las instrucciones")', 500);
      }
    });
    this.dialogRef.close();
  }
}
