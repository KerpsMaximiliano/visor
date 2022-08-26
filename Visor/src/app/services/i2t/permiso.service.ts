import { Injectable } from '@angular/core';
import { Permiso } from 'src/app/interfaces/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  permisos: Permiso[] = [
    { permiso: 'Puede cambiar los roles por usuario', supervisor: false, operativo: false, administrador: true },
    { permiso: 'Puede cambiar los permisos', supervisor: false, operativo: false, administrador: true },
    { permiso: 'Agregar tareas', supervisor: true, operativo: false, administrador: true },
    { permiso: 'Modificar tareas', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Eliminar tareas', supervisor: true, operativo: false, administrador: true },
    { permiso: 'Agregar actividades', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Modificar actividades', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Eliminar actividades', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Agregar proyectos', supervisor: true, operativo: false, administrador: true },
    { permiso: 'Modificar proyectos', supervisor: true, operativo: false, administrador: true },
    { permiso: 'Eliminar proyectos', supervisor: false, operativo: false, administrador: true },
    { permiso: 'Agregar sprints', supervisor: true, operativo: false, administrador: true },
    { permiso: 'Modificar sprints', supervisor: true, operativo: false, administrador: true },
    { permiso: 'Eliminar sprints', supervisor: true, operativo: false, administrador: true },
    { permiso: 'Agregar des. wiki', supervisor: false, operativo: false, administrador: true },
    { permiso: 'Modificar des. wiki', supervisor: true, operativo: false, administrador: true },
    { permiso: 'Eliminar des. wiki', supervisor: false, operativo: false, administrador: true },
    { permiso: 'Agregar documentos', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Modificar documentos', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Eliminar documentos', supervisor: true, operativo: false, administrador: true },
    { permiso: 'Vista analista funcional', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Vista analista técnico', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Vista desarrollador', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Vista analista QA', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Vista tester', supervisor: true, operativo: true, administrador: true },
    { permiso: 'Vista project manager', supervisor: true, operativo: false, administrador: true }
  ];

  getPermisos() {
    return this.permisos;
}

}