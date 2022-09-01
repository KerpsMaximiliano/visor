import { Injectable } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuario[] = [
    { id: 1, usuario: 'igirod', nombre: 'Ignacio Girod', rol: 'Administrador' },
    { id: 2, usuario: 'fghio', nombre: 'Facundo Ghio Serra', rol: 'Operativo' },
    { id: 3, usuario: 'folivera', nombre: 'Fabio Daniel Olivera', rol: 'Operativo' },
    { id: 4, usuario: 'fcorvalan', nombre: 'Franco Corvalan', rol: 'Supervisor' },
    { id: 5, usuario: 'glaner', nombre: 'Gian Laner', rol: 'Operativo' },
    { id: 6, usuario: 'pmacagno', nombre: 'Patricio Macagno', rol: 'Supervisor' },
    { id: 7, usuario: 'aescandon', nombre: 'Augusto Escandon', rol: 'Operativo' }
  ];

  roles: any[] = [
    { id: 1, nombre: 'Administrador', check: true },
    { id: 2, nombre: 'Supervisor', check: true },
    { id: 3, nombre: 'Operativo', check: true }
  ];

  getUsuarios() {
    return this.usuarios;
}

  getRoles() {
    return this.roles;
  }

  cambiarRol(index: number) {
    console.log(this.usuarios[index-1]);
  }

}