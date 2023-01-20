import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { DocumentoService } from 'src/app/services/i2t/documento.service';
import { SeccionDocumentosComponent } from '../seccion-documentos.component';
import { Inject } from '@angular/core';
import { RestService } from 'src/app/services/i2t/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { TareaService } from 'src/app/services/i2t/tarea.service';
import { UploadArchivoService } from 'src/app/services/i2t/upload-archivo.service';

@Component({
  selector: 'app-modal-documentos',
  templateUrl: './modal-documentos.component.html',
  styleUrls: ['./modal-documentos.component.css']
})
export class ModalDocumentosComponent implements OnInit {

  formulario!: FormGroup;

  /* tipos = [
    "a. Identificación de necesidades",
    "b. Plan de proyecto",
    "c. Requerimientos",
    "d. Estimación de tareas",
    "e. Product backlog",
    "f. Sprint backlog",
    "g. Documento",
    "h. Propuesta funcional",
    "i. Arquitectura",
    "j. Caso de uso",
    "k. Requerimiento de configuración",
    "l. Boceto/Maqueta",
    "m. Nota de desarrollo",
    "n. Plan de pruebas",
    "o. Caso de prueba",
    "p. Ciclo/corrida",
    "q. Incidencia",
    "r. Proceso de despliegue",
    "s. Requerimientos de cambios"
  ] */

  tipos = [
    { valor: "PlanProyecto", descripcion: "Plan de Proyecto" },
    { valor: "Requerimientos", descripcion: "Requerimientos" },
    { valor: "CasodeUso", descripcion: "Caso de Uso" },
    { valor: "DespliegueProcesoProduccion", descripcion: "Proceso de despliegue" },
    { valor: "Arquitectura", descripcion: "Arquitectura" },
    { valor: "EstimacionCasodeUso", descripcion: "Estimacion Caso de Uso" },
    { valor: "IdentificacionNecesidades", descripcion: "Identificación de necesidades" },
    { valor: "GestiondeCambios", descripcion: "Gestion de Cambios" },
    { valor: "Estimaciondecambios", descripcion: "Estimación de cambios" },
  ];

  estados = [
    { valor: "Active", descripcion: "Publicado" },
    { valor: "Draft", descripcion: "Borrador" },
    { valor: "Expired", descripcion: "Eliminado" }
  ];

  /* estados = [
    "Publicado",
    "Borrador",
    "Eliminado"
  ]; */

  camposIncompletos!: boolean;

  proyectosCompletos = [];
  proyectos = [];
  tablaProyectos: any;
  columnas: string[] = ['nombre'];
  estiloTablaProyectos = "mostrarTabla";
  valorInputProyecto: string = '';
  archivo!: File;

  constructor(
    private _documentService: DocumentoService, 
    private _tareaService: TareaService, 
    private _uploadArchivoService: UploadArchivoService,
    public dialog: MatDialogRef<SeccionDocumentosComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public _restService: RestService
    ) { }

  ngOnInit(): void {

    document.getElementById("titulo")!.innerText = this.data.titulo; // Cambia segun se haya tocado el boton para editar o crear un documento

    this.formulario = new FormGroup({
      archivo: new FormControl(null),
      nombreArchivo: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      proyectoAsociado: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      fechaPublicacion: new FormControl(null, Validators.required),
      fechaCaducidad: new FormControl(null),
      asignadoA: new FormControl(null, Validators.required)
    });

    console.log("tiene id: " + this.verificarSiTieneId())
    if (this.verificarSiTieneId()) {
      this.formulario.controls["nombre"].setValue(this.data.nombre);
      this.formulario.controls["nombreArchivo"].setValue(this.data.filename);
      this.valorInputProyecto = this.data.proyectoAsociado; // como tiene asociado un ngModel, sin hacer esto no se completa el valor del campo
      this.formulario.controls["proyectoAsociado"].setValue(this.data.proyectoAsociado); // esto es necesario para que reconozca el proyecto y recupere su id
      this.formulario.controls["tipo"].setValue(this.data.tipo);
      this.formulario.controls["estado"].setValue(this.data.estado);
      this.formulario.controls["fechaPublicacion"].setValue(this.formatearFechaEntrante(this.data.fechaPublicacion));
      this.formulario.controls["fechaCaducidad"].setValue(this.formatearFechaEntrante(this.data.fechaCaducidad));
      this.formulario.controls["asignadoA"].setValue(this.data.asignadoA);

    }

    this._documentService.getTodosLosProyectos().subscribe(respuesta => {
      this.proyectosCompletos = respuesta.dataset;
      console.log(this.proyectosCompletos);
    })

  }

  /**
   * Metodo que permite adjuntar un archivo haciendo click en un boton y no directamente en el input
   * 
   * @param event 
   */

  adjuntar(event: Event) {
    event.preventDefault();
    document.getElementById("adjuntar")?.click();
  }

  /**
   * Metodo que permite mostrar el nombre del archivo que se quiere cargar al lado del boton
   * 
   * @param event Event
   */
  mostrarNombre(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.formulario.controls["nombreArchivo"].setValue(target.files[0].name)
      this.archivo = target.files[0];
      console.log(target.files[0])
    }
  }

  /**
   * Metodo que checkea si el formulario esta completo, y luego agrega el documento
   * 
   * @param event 
   * @returns true si esta completo, false si no lo esta.
   */
  formularioCompleto(event: Event) {
    event.preventDefault();
    if (
      this.formulario.get("nombreArchivo")?.hasError("required") ||
      this.formulario.get("nombre")?.hasError("required") ||
      this.formulario.get("proyectoAsociado")?.hasError("required") ||
      this.formulario.get("tipo")?.hasError("required") ||
      this.formulario.get("estado")?.hasError("required") ||
      this.formulario.get("fechaPublicacion")?.hasError("required") ||
      this.formulario.get("fechaCaducidad")?.hasError("required") ||
      this.formulario.get("asignadoA")?.hasError("required")
    ) {
      console.log("campos incompletos")
      this.camposIncompletos = true;
    } else {
      this.camposIncompletos = false;
      console.log("campos completos")
      this.agregarDocumento();
      this.dialog.close();
    }
    return this.camposIncompletos;
  }

  /**
   * Metodo que permite agregar el documento llamando al service correspondiente.
   * Genera una variable con el nombre del archivo a cargar en el documento.
   * Genera un jsbody con los datos del formulario, verifica si debe editar o crear un documento (si tiene id o no)
   * y lo pasa al service
   */
  agregarDocumento() {

    let jsbody = {
      par_modo: "",
      pID_DOCUMENTO: this.data.id,
      pFilename: this.formulario.controls["nombreArchivo"].value,
      pDocument_name: this.formulario.controls["nombre"].value,
      ptipo: this.obtenerValor(this.formulario.controls["tipo"].value, this.tipos),
      pStatus_id: this.obtenerValor(this.formulario.controls["estado"].value, this.estados),
      pActive_date: this.formatearFecha(this.formulario.controls["fechaPublicacion"].value),
      pExp_date: this.formatearFecha(this.formulario.controls["fechaCaducidad"].value),
      pID_CASE: this.obtenerIdProyecto(this.formulario.controls["proyectoAsociado"].value),
      pAssigned_user_id: this.formulario.controls["asignadoA"].value
    };

    if (this.verificarSiTieneId()) {
      jsbody.par_modo = "U";
    } else {
      jsbody.par_modo = "I";
    }

    this._documentService.getIdUsuario(this.formulario.controls["asignadoA"].value).subscribe(respuesta => {

      jsbody.pAssigned_user_id = respuesta.dataset[0].id;

      let body = JSON.stringify(jsbody);

      this._documentService.ABMDocumento(body).subscribe(respuesta => {

        console.log(respuesta.returnset[0].RId)

        /* if(respuesta.returnset[0].RId){

          this._uploadArchivoService.subirArchivo(respuesta.returnset[0].RId, this.archivo).subscribe()

        } */

        window.location.reload();
      });
    })
  }

  /**
   * Metodo necesario para que los mat-select puedan ser "pre seleccionados" por los datos traidos por el documento
   * existente al editarlo. Si se esta creando un documento nuevo, no se usa.
   * 
   * @param objeto1 any
   * @param objeto2 any
   * @returns booleano 
   */
  compararItems(objeto1: any, objeto2: any) {
    console.log("objeto1 " + objeto1)
    console.log("objeto2 " + objeto2)
    return objeto1 == objeto2;
  }

  /**
   * Metodo que devuelve el "valor" relacionado con la "descripcion" en un arreglo de objetos que tengan ambas
   * propiedades.
   * 
   * @param descripcion string
   * @param array any (no estoy seguro que tipo de dato se le pasa)
   * @returns string
   */
  obtenerValor(descripcion: string, array: any) {
    let encontro = false;
    let cont = 0;
    do {
      if (array[cont].descripcion == descripcion) {
        encontro = true;
      } else {
        cont++;
      }

    } while (encontro == false);

    return array[cont].valor;
  }

  /**
   * Metodo que verifica si en la data traida desde el componente seccion-documentos al abrirse el modal (sea por
   * el boton editar o crear nuevo) se encuentra un id de documento, lo que significaria que debe tomar el resto
   * de datos y completar el resto de campos del formulario con esos datos.
   * 
   * @returns boolean
   */
  verificarSiTieneId() {
    if (this.data.id) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Metodo que cierra la tabla cuando se borran todos los caracteres escritos en el campo
   * 
   * @param event Event
   */
  cerrarTablaProyectos(event: Event) {
    if (this.valorInputProyecto.length == 0) {
      this.estiloTablaProyectos = 'oculto';
    }
  }

  /**
   * Metodo que genera una tabla de proyectos segun lo que se haya escrito en el campo antes de presionar enter.
   * Despliega la tabla si encuentra coincidencias en lo escrito con el nombre de algun/os proyectos.
   * 
   * @param event Event
   */
  buscarProyectos(event: Event) {

    this.valorInputProyecto = (event.target as HTMLInputElement).value;
    this._tareaService.getABMproyectoService(this.valorInputProyecto).subscribe((response: any) => { //Obtengo los proyectos
      this.proyectos = response.dataset;
      this.tablaProyectos = new MatTableDataSource(this.proyectos);
    });
    if (this.valorInputProyecto == '') {
      this.estiloTablaProyectos = 'oculto';
    }
    else {
      this.estiloTablaProyectos = 'mostrarTabla';
    }

  }
  /**
   * Metodo que permite seleccionar un proyecto de la lista desplegable y que se refleje en el campo
   * 
   * @param proyecto any (no estoy seguro que tipo de dato se le pasa)
   */
  seleccionarProyecto(proyecto: any) {
    this.valorInputProyecto = proyecto.nombre_projecto;
    this.estiloTablaProyectos = "oculto";
    this.formulario.controls["proyectoAsociado"].setValue(proyecto.nombre_projecto);
  }

  /**
   * Listener que permite tocar fuera de la tabla de proyectos desplegable para cerrarla
   */
  @HostListener('document:click', ['$event'])
  manejoClickFueraComponente() {
    if (this.estiloTablaProyectos == 'mostrarTabla') {
      this.estiloTablaProyectos = "oculto"
    }
  }

  /**
   * Metodo que busca en el array de proyectos completos el proyecto de nombre pasado por parametro,
   * y retorna su id.
   * 
   * @param nombre_proyecto string
   * @returns id string
   */
  obtenerIdProyecto(nombre_proyecto: string) {
    let encontro = false;
    let cont = 0;
    let id = 0;
    console.log(nombre_proyecto)
    console.log(this.proyectosCompletos)
    console.log("nombre proyecto: " + nombre_proyecto);

    while (encontro == false) {
      if (this.proyectosCompletos[cont]["nombre_projecto"] != nombre_proyecto) {
        cont++;
      } else {
        console.log("ENTRO VECES " + cont)
        console.log(this.proyectosCompletos[cont]["id_projecto"]);
        console.log(this.proyectosCompletos[cont]["nombre_projecto"]);
        id = this.proyectosCompletos[cont]["id_projecto"];
        encontro = true;
      }
    }

    return id;
  }

  /**
   * Metodo necesario para formatear la fecha correctamente para enviarla al service.
   * Recibe la fecha del campo Date, la convierte a string segun un formato y la devuelve
   * 
   * @param fecha Date
   * @returns nuevaFecha string
   */
  formatearFecha(fecha: Date){
    let nuevaFecha = fecha.toLocaleDateString();
    let aux = nuevaFecha.split("/");
    nuevaFecha = aux[2]+"-"+aux[1]+"-"+aux[0];

    return nuevaFecha;
  }

  /**
   * Metodo que convierte una fecha pasada como string en un objeto de tipo Date.
   * Esto es necesario para que se complete el campo en el formulario correctamente
   * 
   * @param fecha string
   * @returns nuevaFecha Date
   */
  formatearFechaEntrante(fecha : string){
    let nuevaFecha : Date = new Date(fecha.replace(/-/g, '\/').replace(/T.+/, ''));
    // Los replace con los regex son necesarios porque sino, en JS y JAVA, ocurren errores al crear un objeto Date 
    // sin una string con el formato correcto (los regex reemplazan "-" por "/" y el resto de datos de tiempo por " ")

    return nuevaFecha; 
  }
}

