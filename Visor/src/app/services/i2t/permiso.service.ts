import { Injectable } from '@angular/core';
import { Permiso } from 'src/app/interfaces/permiso';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(private rest: RestService) { }

  permisosSP: any[] = [];

  permisos: Permiso[] = [];

  funciones: string[] = [];

  iniciarPermisos() {
    this.permisosSP = [];
    this.getPermisosRefact().subscribe(
      (response: any) => {
        let cont = 0;
        response.dataset.forEach((permiso: any) => {
          if (this.funciones.indexOf(permiso.funcion) == -1) {
            this.funciones.push(permiso.funcion);
          }
          cont++;
          this.permisosSP.push({
            id: cont,
            id_rol: permiso.id_rol,
            nombre_rol: permiso.nombre_rol,
            id_funcion: permiso.id_funcion,
            funcion: permiso.funcion,
            id_funcion_rol: permiso.id_funcion_rol
          });
        });
    });
  }
  
  getPermisosRefact() {
    let jsbody: string = JSON.stringify({
      par_modo : 'G'
    });
    return this.rest.callProcedimientoVisor(jsbody, 'FuncionesRol');
  }

  getFunciones() {
    return this.funciones;
  }

  getPermisosSP() {
    return this.permisosSP;
  }

  insertPermiso(id_funcion: string, id_rol: string) {
    let jsbody: string = JSON.stringify({
      par_modo : 'I',
      id_funcion : id_funcion,
      id_rol : id_rol
    });
    return this.rest.callProcedimientoVisor(jsbody, 'FuncionesRol');
  }

  deletePermiso(id_funcion_rol: string) {
    let jsbody: string = JSON.stringify({
      par_modo : 'D',
      id_funcion_rol : id_funcion_rol
    });
    return this.rest.callProcedimientoVisor(jsbody, 'FuncionesRol');
  }

}