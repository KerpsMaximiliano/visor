import { Component, OnInit } from '@angular/core';
import { UsuarioRolRefact } from 'src/app/interfaces/usuarioRolRefact';
import { UsuarioService } from 'src/app/services/i2t/usuario-rol.service';
import { InicioEstadoProyectoComponent } from '../inicio/inicio-estado-proyecto/inicio-estado-proyecto.component';

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

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})

export class EquipoComponent implements OnInit {

  usuariosRest: Array<UsuarioRolRefact> = [];
  usuariosRest2: Array<any> = [];

  usuarios: Array<Usuario> = [];

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.organizarUsuarios();
    this.getUsuariosReal();
  }

  getUsuariosReal(){
    
    this._usuarioService.getUsuariosRefact().subscribe(respuesta => {
      console.log(respuesta.dataset) 
    });
    
  }

  auxiliarGeneracion(min: number, max: number) {
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





/* if(usuarioRest.id_usuario == usuario.id_usuario){
  console.log("entro en verdadero")
  usuario.nombre_rol.push(...usuarioRest.nombre_rol)
}else{
  let usuarioNuevo: Usuario = {
    id_usuario : usuarioRest.id_usuario,
    nombre_usuario : usuarioRest.nombre_usuario,
    nombre : usuarioRest.nombre,
    apellido : usuarioRest.apellido,
    nombre_rol : [usuarioRest.nombre_rol],
    conocimientos : usuarioRest.conocimientos,
    preferencias : usuarioRest.preferencias,
    proyectos_actuales : usuarioRest.proyectos_actuales,
    tareas_completadas_tec : usuarioRest.tareas_completadas_tec,
    proyectos_anteriores : usuarioRest.proyectos_anteriores,
    empresas: usuarioRest.empresas,
    instituciones: usuarioRest.instituciones,
    carreras: usuarioRest.carreras
  };
  console.log(usuarioNuevo)
  this.usuarios.push(usuarioNuevo);
} */