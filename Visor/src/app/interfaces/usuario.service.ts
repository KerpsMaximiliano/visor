import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuario[] = [
    { usuario: 'igirod', nombre: 'Ignacio Girod', rol: 'Administrador' },
    { usuario: 'fghio', nombre: 'Facundo Ghio Serra', rol: 'Operativo' },
    { usuario: 'folivera', nombre: 'Fabio Daniel Olivera', rol: 'Operativo' },
    { usuario: 'fcorvalan', nombre: 'Franco Corvalan', rol: 'Supervisor' },
    { usuario: 'glaner', nombre: 'Gian Laner', rol: 'Operativo' },
    { usuario: 'pmacagno', nombre: 'Patricio Macagno', rol: 'Supervisor' },
    { usuario: 'aescandon', nombre: 'Augusto Escandon', rol: 'Operativo' }
  ];

  getUsuarios() {
    return this.usuarios;
}

}