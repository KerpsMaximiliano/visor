import { Component, OnInit } from '@angular/core';
import { UsuarioRolRefact } from 'src/app/interfaces/usuarioRolRefact';
import { UsuarioService } from 'src/app/services/i2t/usuario-rol.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
export interface Usuario {
  id_usuario: string,
  nombre_usuario: string,
  nombre: string,
  apellido: string,
  nombre_rol: Array<String>,
  //Resto de variables que pide el CU 12
  conocimientos: Array<String>,
  preferencias: Array<string>,
  proyectos_actuales: Array<string>,
  tareas_completadas_tec: Array<string>,
  proyectos_anteriores: Array<String>,
  empresas: Array<String>,
  instituciones: Array<string>,
  carreras: Array<String>
}

// Necesario para poder importar el icono de linkedin
const LINKEDIN_ICONO = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
  <path fill="currentColor" d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
  </svg>
`;

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})

export class EquipoComponent implements OnInit {

  usuariosRest: Array<UsuarioRolRefact> = [];
  usuarios: Array<Usuario> = [];

  constructor(
    private _usuarioService: UsuarioService,
    private _iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {

    _iconRegistry.addSvgIconLiteral('linkedin', sanitizer.bypassSecurityTrustHtml(LINKEDIN_ICONO));

  }

  ngOnInit(): void {
    this._usuarioService.getUsuariosRefact().subscribe(respuesta => {
      this.usuariosRest = respuesta.dataset;
      this.organizarUsuarios();
    });
  }

  /**
   * Metodo que permite organizar los usuarios con los datos correctos para mostrarlos en las tarjetas, recorriendo el arreglo de usuarios de la api segun los ids unicos.
   * 1) Almacena los roles de cada usuario que estaba repetido en un arreglo de roles.
   * 2) Recupera uno de los usuarios con ese id para crear un nuevo usuario, que luego es pusheado al arreglo de usuarios que se mostrará en las tarjetas. Para crearlo, utiliza todos los datos del usuario recuperado, salvo el campo nombre_rol, que es completado con el arreglo de roles obtenido en el pto 1.
   * 
   */
  organizarUsuarios() {
    let ids = this.recuperarIdsUnicos();
    ids.forEach(id => {
      // 1)
      let roles: string[] = [];
      this.usuariosRest.forEach(uR => {
        if (uR.id_usuario == id) {
          roles.push(uR.nombre_rol);
        }
      })
      // 2)
      const usuarioRAux = this.usuariosRest.find(({ id_usuario }) => {
        return id_usuario === id;
      })

      if (usuarioRAux !== undefined) {
        this.usuarios.push({
          id_usuario: id,
          nombre_usuario: usuarioRAux["nombre_usuario"],
          nombre: usuarioRAux["nombre"],
          apellido: usuarioRAux["apellido"],
          nombre_rol: roles,
          conocimientos: usuarioRAux["conocimientos"],
          preferencias: usuarioRAux["preferencias"],
          proyectos_actuales: usuarioRAux["proyectos_actuales"],
          tareas_completadas_tec: usuarioRAux["tareas_completadas_tec"],
          proyectos_anteriores: usuarioRAux["proyectos_anteriores"],
          empresas: usuarioRAux["empresas"],
          instituciones: usuarioRAux["instituciones"],
          carreras: usuarioRAux["carreras"]
        })
      }
    })
    console.log(this.usuarios)

    // Organiza los usuarios albafeticamente por nombre
    this.usuarios.sort((a: Usuario, b: Usuario) => {
      if (a.nombre > b.nombre){
        return 1;
      }else{
        return -1;
      }
    })
  }

  /**
   * Metodo que sirve para recuperar los ids unicos dentro del arreglo de usuarios traidos desde la api.
   * Los usuarios traidos desde la api estan repetidos porque cada uno puede almacenar solo un rol, por eso se crea esta funcion para, primero, filtrar los ids de usuario unicos dentro del primer arreglo de usuarios.
   * 
   * @returns ids string[]
   */
  recuperarIdsUnicos() {
    let ids: string[] = [];

    this.usuariosRest.forEach(uR => {
      if (!ids.includes(uR.id_usuario)) {
        ids.push(uR.id_usuario);
      }
    });

    return ids;
  }
}




// Funciones de prueba antes de traer los usuarios desde el service

/* auxiliarGeneracion(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}


getUsuarios() {
  for (let i = 0; i < 10; i++) {
    let numeroUsuario = this.auxiliarGeneracion(1, 6);
    let usuario: UsuarioRolRefact = {
      id_usuario: `${numeroUsuario}`,
      nombre_usuario: `usuario${numeroUsuario * 111}`,
      nombre: `Nombre ${numeroUsuario}`,
      apellido: `Apellido ${numeroUsuario}`,
      nombre_rol: `Rol ${this.auxiliarGeneracion(1, 6) * 111}`,
      conocimientos: [`Conocimiento 0`, `Conocimiento 1`],
      preferencias: [`Preferencia 0`, `Preferencia 1`],
      proyectos_actuales: [`Proyecto actual 0`, `Proyecto actual 1`],
      tareas_completadas_tec: [`Tareas completadas 0`, `Tareas completadas 1`],
      proyectos_anteriores: [`Proyecto anterior 0`, `Proyecto anterior 1`],
      empresas: [`Empresa 0`, `Empresa 1`],
      instituciones: [`Institucion 0`, `Institucion 1`],
      carreras: [`Carrera 0`, `Carrera 1`]
    }
    this.usuariosRest.push(usuario);
  }
} */