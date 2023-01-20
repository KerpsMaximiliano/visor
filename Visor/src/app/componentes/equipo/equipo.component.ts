import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/i2t/usuario-rol.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { EquipoService } from 'src/app/services/i2t/equipo.service';
export interface Usuario {
  id_usuario: string,
  foto: Blob,
  nombre_usuario: string,
  nombre_rol: Array<String>,
  //Resto de variables que pide el CU 12
  conocimientos: Array<String>,
  preferencias: Array<string>,
  proyectos_actuales: Array<string>,
  tareas_completadas_tec: Array<string>,
  proyectos_anteriores: Array<String>,
  empresas: Array<String>,
  instituciones: Array<string>,
  carreras: Array<String>,
  linkedin: string
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

  usuariosRest: Array<any> = [];
  usuariosOriginal: Array<Usuario> = []; // copia del arreglo de usuarios para guardar los usuarios originales traidos por el sp
  usuarios: Array<Usuario> = [];
  roles: Array<any> = []; // Es solo para generar la tabla desplegable
  filtro = { nombre_usuario: "", rol: ""}
  labelRol = document.getElementById("rol");
  proyectosTotales = [];
  tareasTotales = [[]];

  constructor(
    private _iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private _usuarioService: UsuarioService,
    private _equipoService: EquipoService) {

    _iconRegistry.addSvgIconLiteral('linkedin', sanitizer.bypassSecurityTrustHtml(LINKEDIN_ICONO));

  }

  ngOnInit(): void {

    this._equipoService.getUsuarios().subscribe(respuesta => {
      this._usuarioService.getRoles().subscribe(r => {

        this._equipoService.getUsuarios().subscribe();
        this.roles = r.dataset;
        this.usuariosRest = respuesta.dataset;
        this.organizarUsuarios();
        this.usuariosOriginal = this.usuarios;
        document.getElementById("rol")!.innerText = "Todos";
      })
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
    ids.forEach(idUnico => {
      // 1)
      let roles: string[] = [];
      this.usuariosRest.forEach(uR => {
        if (uR.id == idUnico) {
          roles.push(uR.name_fun);
        }
      })
      
      console.log("ROLES:")
      console.log(roles)
      // 2)
      const usuarioRAux = this.usuariosRest.find(({ id }) => {
        return id === idUnico;
      })

      if (usuarioRAux !== undefined) {
        this.usuarios.push({
          id_usuario: idUnico,
          foto: usuarioRAux["photo"],
          nombre_usuario: usuarioRAux["name_user"],
          nombre_rol: roles,
          conocimientos: usuarioRAux["conocimientos_c"],
          preferencias: usuarioRAux["preferencias_c"],
          proyectos_actuales: [usuarioRAux["name_proy"]],
          tareas_completadas_tec: usuarioRAux["tareas_completadas_tec"],
          proyectos_anteriores: usuarioRAux["proyectos_anteriores"],
          empresas: usuarioRAux["empresas"],
          instituciones: usuarioRAux["instituciones"],
          carreras: usuarioRAux["carreras"],
          linkedin: this.asignarLinkedin(usuarioRAux["name_user"])
        })        
      }
    })

    // Organiza los usuarios albafeticamente por nombre
    this.usuarios.sort((a: Usuario, b: Usuario) => {
      if (a.nombre_usuario > b.nombre_usuario) {
        return 1;
      } else {
        return -1;
      }
    })

  }

  /**
   * Metodo temporal hasta que el sp disponga de los linked in de cada usuario.
   * Recorre el arreglo de links de linkedin, y si el nombre y/o el apellido coinciden en alguna parte del link, retorna ese link
   * 
   * @param nombre string
   * @param apellido string
   * @returns linkedin
   */
  asignarLinkedin(nombre: string){
    let retorno = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
    let links = [
      "https://www.linkedin.com/in/facundoghioserra/",
      "https://www.linkedin.com/in/franco-corvalan/",
      "https://www.linkedin.com/in/francofriggeri/",
      "https://www.linkedin.com/in/ignacio-girod/",
      "https://www.linkedin.com/in/luciano-de-giorgio-8582091b4/",
      "https://www.linkedin.com/in/maxi-reichert-24ba1a221/",
      "https://www.linkedin.com/in/patricio-macagno-02340922b/"
    ]

    let nombreDesglosado = nombre.toLocaleLowerCase().split(" ");
    
    links.forEach( link => {
      let coincidencias = 0;
      nombreDesglosado.forEach( n => {
        if(link.includes(n)){
          coincidencias ++;
        }
      })
      if (coincidencias >= 2){
        retorno = link;
      }
    })
    return retorno;
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
      if (!ids.includes(uR.id)) {
        ids.push(uR.id);
      }
    });
    return ids;
  }

  /**
   * Metodo que rehace la lista de usuarios que fue modificada por el filtro a su contenido de usuarios original.
   * Es llamado cuando se elije el filtro de rol "Todos". Tambien reinicia el filtro.rol a "".
   */
  limpiarFiltro(){
    this.usuarios = this.usuariosOriginal;
    this.filtro.rol="";
    document.getElementById("rol")!.innerText = "Todos";
  }

  /**
   * Metodo que almacena el rol a filtrar en el filtro y llama a la funcion filtradora.
   * Tambien cambia el contenido del label "rol" para reflejar que rol se esta filtrando.
   * 
   * @param rol string
   */
  filtrarRol(rol: string){
    this.filtro.rol = rol;
    this.filtrador(this.filtro);
    document.getElementById("rol")!.innerText = rol;
  }

  /**
   * Metodo que recupera el value del campo del buscador y lo almacena en el filtro para luego llamar a la funcion filtradora.
   * 
   * @param event Event
   */
  filtrarNombre(event: Event){
    this.filtro.nombre_usuario = (event.target as HTMLInputElement).value;
    this.filtrador(this.filtro);
  }
  
/**
 * Metodo encargado de filtrar los elementos del arreglo de usuarios segun un filtro pasado por parametro.
 * Utiliza la funcion Array.prototype.filter, que recibe un callback en el que se definen las condiciones para que el usuario actual sea almacenado o no en el arreglo de usuarios a mostrar. Si devuelve false, el usuario no es almacenado.
 * Esta es la manera de implementar el filtro de nombre y rol en simultaneo.
 * 
 * @param filtro Objeto
 */
  filtrador(filtro: any){
    this.usuarios = this.usuariosOriginal.filter(usuario => { 
      if(filtro.nombre != "" && !usuario.nombre_usuario.toLocaleLowerCase().includes(filtro.nombre_usuario.toLocaleLowerCase())){
        console.log("NOMBRE NO COINCIDE, NO SE AGREGA");
        return false;
      }
      if(filtro.rol != "" && !usuario.nombre_rol.includes(filtro.rol)){
        console.log("ROL NO COINCIDE, NO SE AGREGA");
        return false;
      }
      console.log("COINCIDE, SE AGREGA");
      return true;
    })
  }
}