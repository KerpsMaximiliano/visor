import { Injectable } from '@angular/core';
import { UsuarioRol } from '../../interfaces/usuario-rol';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private rest: RestService) { }

  usuarios: UsuarioRol[] = [
    { id: 1, usuario: 'igirod', nombre: 'Ignacio Girod', rol: 'Administrador' },
    { id: 2, usuario: 'fghio', nombre: 'Facundo Ghio Serra', rol: 'Supervisor' },
    { id: 3, usuario: 'folivera', nombre: 'Fabio Daniel Olivera', rol: 'Operativo' },
    { id: 4, usuario: 'fcorvalan', nombre: 'Franco Corvalan', rol: 'Operativo' },
    { id: 5, usuario: 'glaner', nombre: 'Gian Laner', rol: 'Operativo' },
    { id: 6, usuario: 'pmacagno', nombre: 'Patricio Hernan Macagno', rol: 'Supervisor' },
    { id: 7, usuario: 'aescandon', nombre: 'Augusto Hernan Escandon', rol: 'Operativo' },
    { id: 8, usuario: 'fgauchat', nombre: 'Federico Gauchat', rol: 'Operativo' },
    { id: 9, usuario: 'fcaldaroni', nombre: 'Franco Bruno Caldaroni', rol: 'Operativo' },
    { id: 10, usuario: 'ffriggeri', nombre: 'Franco Friggeri', rol: 'Supervisor' },
    { id: 11, usuario: 'jgarcia', nombre: 'Jeremias Garcia', rol: 'Operativo' },
    { id: 12, usuario: 'lcocuccio', nombre: 'Lucio Cesar Cocuccio', rol: 'Operativo' },
    { id: 13, usuario: 'pcorujo', nombre: 'Pablo Luis Corujo', rol: 'Operativo' },
    { id: 14, usuario: 'ldegiorgio', nombre: 'Luciano De Giorgio', rol: 'Operativo' },
    { id: 15, usuario: 'lblodorn', nombre: 'Leandro Ivan Blodorn', rol: 'Operativo' },
    { id: 16, usuario: 'mreichert', nombre: 'Maximiliano Reichert', rol: 'Operativo' },
    { id: 17, usuario: 'lrios', nombre: 'Lucas Rios', rol: 'Operativo' }
  ];

  getUsuarios() {
    let jsbody: string = JSON.stringify({
      par_modo : 'G'
    });
    return this.rest.callProcedimientoVisor(jsbody, "RolesUsuario");
  }

  getUsuariosold() {
    return this.usuarios;
  }

  getRoles() {
    return this.rest.callQueryVisor('roles');
  }

  getFuncionesPorRol() {
    return this.rest.callQueryVisor('v_funciones_por_rol');
  }

}