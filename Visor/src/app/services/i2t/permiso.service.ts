import { Injectable } from '@angular/core';
import { Permiso } from 'src/app/interfaces/permiso';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(private rest: RestService) { }

  permisosOld: Permiso[] = [
    { id: 1, nombre: 'Cambiar permisos de roles', supervisor: false, operativo: false, administrador: true },
    { id: 2, nombre: 'Cambiar roles de usuarios', supervisor: false, operativo: false, administrador: true },
    { id: 3, nombre: 'Agregar tareas', supervisor: true, operativo: false, administrador: true },
    { id: 4, nombre: 'Modificar tareas', supervisor: true, operativo: true, administrador: true },
    { id: 5, nombre: 'Eliminar tareas', supervisor: true, operativo: false, administrador: true },
    { id: 6, nombre: 'Agregar actividades', supervisor: true, operativo: true, administrador: true },
    { id: 7, nombre: 'Modificar actividades', supervisor: true, operativo: true, administrador: true },
    { id: 8, nombre: 'Eliminar actividades', supervisor: true, operativo: true, administrador: true },
    { id: 9, nombre: 'Agregar proyectos', supervisor: true, operativo: false, administrador: true },
    { id: 10, nombre: 'Modificar proyectos', supervisor: true, operativo: false, administrador: true },
    { id: 11, nombre: 'Eliminar proyectos', supervisor: false, operativo: false, administrador: true },
    { id: 12, nombre: 'Agregar sprints', supervisor: true, operativo: false, administrador: true },
    { id: 13, nombre: 'Modificar sprints', supervisor: true, operativo: false, administrador: true },
    { id: 14, nombre: 'Eliminar sprints', supervisor: true, operativo: false, administrador: true },
    { id: 15, nombre: 'Agregar des wiki', supervisor: false, operativo: false, administrador: true },
    { id: 16, nombre: 'Modificar des wiki', supervisor: true, operativo: false, administrador: true },
    { id: 17, nombre: 'Eliminar des wiki', supervisor: false, operativo: false, administrador: true },
    { id: 18, nombre: 'Agregar documentos', supervisor: true, operativo: true, administrador: true },
    { id: 19, nombre: 'Modificar documentos', supervisor: true, operativo: true, administrador: true },
    { id: 20, nombre: 'Eliminar documentos', supervisor: true, operativo: false, administrador: true },
    { id: 21, nombre: 'Vista analista funcional', supervisor: true, operativo: true, administrador: true },
    { id: 22, nombre: 'Vista analista técnico', supervisor: true, operativo: true, administrador: true },
    { id: 23, nombre: 'Vista desarrollador', supervisor: true, operativo: true, administrador: true },
    { id: 24, nombre: 'Vista analista QA', supervisor: true, operativo: true, administrador: true },
    { id: 25, nombre: 'Vista tester', supervisor: true, operativo: true, administrador: true },
    { id: 26, nombre: 'Vista project manager', supervisor: true, operativo: false, administrador: true }
  ];

  permisosSP: any[] = [];

  permisos: Permiso[] = [];

  iniciarPermisos() {
    this.permisosSP = [];
    this.getPermisosRefact().subscribe(
      (response: any) => {
        let cont = 0;
        console.log(response.dataset)
        response.dataset.forEach((permiso: any) => {
          cont++;
          this.permisosSP.push({
            id: cont,
            id_rol: permiso.id_rol,
            nombre_rol: permiso.nombre_rol,
            codigo_funcion: permiso.codigo_funcion,
            funcion: permiso.funcion
          });
          /* this.permisos.push({
            id: cont,
            nombre: permiso.funcion,
            supervisor: false,
            operativo: false,
            administrador: false
          }); */
        });
    });
    /* this.permisosSP.forEach(permiso => {
      this.permisos.forEach(element => {
        if (permiso.funcion != element.nombre) {
          this.permisos.push(permiso);
        }
      });
    });
    console.log(this.permisos) */
  }
  
  getPermisosRefact() {
    return this.rest.callQueryVisor('v_funciones_por_rol');
  }

  getPermisosSP() {
    return this.permisosSP;
  }

  getPermisos() {
    return this.permisosOld;
  }

}