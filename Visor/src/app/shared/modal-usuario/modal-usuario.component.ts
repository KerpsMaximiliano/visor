import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioRol } from 'src/app/interfaces/usuario-rol';
import { UsuarioRolRefact } from 'src/app/interfaces/usuarioRolRefact';
import { LoginService } from 'src/app/services/i2t/login.service';
import { UsuarioService } from 'src/app/services/i2t/usuario-rol.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalUsuarioComponent>,
    private _loginService: LoginService,
    private _usuarioService: UsuarioService,
    @ Inject(MAT_DIALOG_DATA) public data: Usuario) {}

    usuarios!:UsuarioRol [];
    nombreU!:string;
    usuarioR:UsuarioRolRefact []=[];
    rol!:string;

  ngOnInit(): void {
    console.log(this._usuarioService.getUsuarios());
    console.log(this.dialogRef.componentInstance.data.usuario)
    this.usuarios = this._usuarioService.getUsuarios();
    console.log(this.usuarios);
    this.buscarUsuario();
    console.log(this._usuarioService.getUsuariosRefact());
    this.nombreU = this.dialogRef.componentInstance.data.usuario;
    this._usuarioService.getUsuariosRefact().subscribe(res=>{
      console.log(res);
      this.usuarioR = res.dataset;
      console.log(this.usuarioR);
      this.buscarRolUsuario();
    });
    
    this.buscarRolUsuario();
    
  }

  buscarUsuario(){
    
    this.usuarios.forEach(u=>{
      if(u.nombre == this.dialogRef.componentInstance.data.usuario){
        console.log("Encontrado")
      }
    })
  }

  buscarRolUsuario(){
    this.usuarioR.forEach(u=>{
      
      if(u.nombre != null && u.apellido!= null ){
        let nombreC:string = u.nombre.concat(" ").concat(u.apellido);
        if(nombreC == this.nombreU){
          this.rol = u.nombre_rol;
        }
      }
    })
  }
  

  closeDialog(){
    this.dialogRef.close(false);
  }

}
