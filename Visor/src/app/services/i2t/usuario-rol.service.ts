import { Injectable } from '@angular/core';
import { UsuarioRol } from '../../interfaces/usuario-rol';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private rest: RestService) { }

  usuariosSP: UsuarioRol[] = [];

  iniciarUsuarios() {
    this.usuariosSP = [];
    this.getUsuariosRefact().subscribe(
      (response: any) => {
        console.log(response.dataset)
        let cont = 0;
        response.dataset.forEach((user: any) => {
          cont++;
          if (user.nombre_rol == 'Analista Funcional') {
            user.nombre_rol = 'Administrador';
          }
          this.usuariosSP.push({id: cont, id_usuario: user.id_usuario, usuario: user.nombre_usuario, nombre: user.nombre+" "+user.apellido, rol: user.nombre_rol});
        });
    });
  }

  getUsuariosRefact() {
    let jsbody: string = JSON.stringify({
      par_modo : 'G'
    });
    return this.rest.callProcedimientoVisor(jsbody, "RolesUsuario");
  }

  getUsuarios() {
    return this.usuariosSP;
  }

  getRoles() {
    return this.rest.callQueryVisor('roles');
  }

  setRolUsuario(idRol: string, idUsuario: string) {
    let jsbody: string = JSON.stringify({
      par_modo : 'U',
      id_rol : idRol,
      id_usuario : idUsuario
    });
    return this.rest.callProcedimientoVisor(jsbody, "RolesUsuario");
  }

}