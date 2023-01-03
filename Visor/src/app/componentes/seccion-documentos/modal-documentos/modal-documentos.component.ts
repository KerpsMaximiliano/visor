import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { DocumentoService } from 'src/app/services/i2t/documento.service';
import { SeccionDocumentosComponent } from '../seccion-documentos.component';
import { Inject } from '@angular/core';
import { RestService } from 'src/app/services/i2t/rest.service';
import { MatTableDataSource } from '@angular/material/table';

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
    { valor: "PlanProyecto", descripcion: "Plan de Proyecto"},
    { valor: "Requerimientos", descripcion: "Requerimientos"},
    { valor: "CasodeUso", descripcion: "Caso de Uso"},
    { valor: "DespliegueProcesoProduccion", descripcion: "Proceso de despliegue"},
    { valor: "Arquitectura", descripcion: "Arquitectura"},
    { valor: "EstimacionCasodeUso", descripcion: "Estimacion Caso de Uso"},
    { valor: "IdentificacionNecesidades", descripcion: "Identificación de necesidades"},
    { valor: "GestiondeCambios", descripcion: "Gestion de Cambios"},
    { valor: "Estimaciondecambios", descripcion: "Estimación de cambios"},
  ];

  estados = [
    { valor: "Active", descripcion: "Publicado"},
    { valor: "Draft", descripcion: "Borrador"},
    { valor: "Expired", descripcion: "Eliminado"}
  ];

  /* estados = [
    "Publicado",
    "Borrador",
    "Eliminado"
  ]; */

  camposIncompletos!: boolean;

  proyectos = [];
  tablaProyectos : any;

  constructor(private _documentService: DocumentoService, public dialog: MatDialogRef<SeccionDocumentosComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public _restService: RestService) {}
  
  ngOnInit(): void {
    
    document.getElementById("titulo")!.innerText = this.data.titulo;

    this.formulario = new FormGroup({
      archivo: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      proyectoAsociado: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      fechaPublicacion: new FormControl(null, Validators.required),
      fechaCaducidad: new FormControl(null),
      asignadoA: new FormControl(null, Validators.required)
    });
    
    console.log("tiene id: "+this.verificarSiTieneId())
    if(this.verificarSiTieneId()){
      this.formulario.controls["nombre"].setValue(this.data.nombre);
      this.formulario.controls["proyectoAsociado"].setValue(this.data.proyectoAsociado);
      this.formulario.controls["tipo"].setValue(this.data.tipo);
      this.formulario.controls["estado"].setValue(this.data.estado);
      this.formulario.controls["fechaPublicacion"].setValue(this.data.fechaPublicacion);
      this.formulario.controls["fechaCaducidad"].setValue(this.data.fechaCaducidad);
      this.formulario.controls["asignadoA"].setValue(this.data.asignadoA);
    }

    this._documentService.getProyectos().subscribe((resp : any) =>{
      console.log(resp.dataset);
      this.proyectos = resp.dataset;
    });

  }

  /**
   * Metodo que permite adjuntar un archivo haciendo click en un boton y no directamente en el input
   * 
   * @param event 
   */

  adjuntar(event: Event){
    event.preventDefault();
    document.getElementById("adjuntar")?.click();
  }

  mostrarNombre(event: Event){
    const target = event.target as HTMLInputElement;
    if(target.files && target.files.length > 0){
      document.getElementById("nombreArchivo")!.innerText = target.files[0].name;
    }
  }
  
  /**
   * Metodo que checkea si el formulario esta completo, y luego agrega el documento
   * 
   * @param event 
   * @returns true si esta completo, false si no lo esta.
   */
  formularioCompleto(event: Event){
    event.preventDefault();
    if(
      this.formulario.get("archivo")?.hasError("required") || 
      this.formulario.get("nombre")?.hasError("required") ||
      this.formulario.get("proyectoAsociado")?.hasError("required") || 
      this.formulario.get("tipo")?.hasError("required") || 
      this.formulario.get("estado")?.hasError("required") || 
      this.formulario.get("fechaPublicacion")?.hasError("required") || 
      this.formulario.get("fechaCaducidad")?.hasError("required") || 
      this.formulario.get("asignadoA")?.hasError("required")
    ){
      console.log("campos incompletos")
      this.camposIncompletos = true;
    }else{
      this.camposIncompletos = false;
      console.log("campos completos")
      this.agregarDocumento();
      this.dialog.close();
      
    }
    return this.camposIncompletos;
  }

  /**
   * Metodo que agrega el documento
   */
  agregarDocumento(){
    let pathArchivo: Array<string> = this.formulario.controls["archivo"].value.split("\\");

    let usuario = this.formulario.controls["asignadoA"].value;
    console.log(usuario)

    let jsbody = {
      par_modo: "",
      pID_DOCUMENTO: this.data.id,
      pFilename: pathArchivo.pop(),
      pDocument_name: this.formulario.controls["nombre"].value,
      ptipo: this.obtenerValor(this.formulario.controls["tipo"].value, this.tipos),
      pStatus_id: this.obtenerValor(this.formulario.controls["estado"].value, this.estados),
      /* pActive_date: this.formulario.controls["fechaPublicacion"].value,
      pExp_date: this.formulario.controls["fechaCaducidad"].value, */
      pID_CASE: this.formulario.controls["proyectoAsociado"].value,
      pAssigned_user_id: usuario
    };

    if(this.verificarSiTieneId()){
      jsbody.par_modo = "U";
    }else{
      jsbody.par_modo = "I";
    }
    
    this._documentService.getIdUsuario(usuario).subscribe(respuesta => {
      console.log("El id del usuario de nombre "+respuesta.dataset[0].user_name+" es "+respuesta.dataset[0].id);

      /* this.proyectos.forEach((proyecto: any) => {
        if(jsbody.pID_CASE == proyecto.nombre_proyecto){
          console.log("coincide nombre de proyecto")
          jsbody.pID_CASE = proyecto.id_proyecto;
        }else{
          console.log("no coincide nombre proyecto");
        }
      }) */
      
      jsbody.pAssigned_user_id = respuesta.dataset[0].id;
      
      let body = JSON.stringify(jsbody);
      console.log(body);

      return this._documentService.ABMDocumento(body).subscribe( respuesta => {
        console.log(typeof(respuesta))
        /* window.location.reload(); */
      });
    })

    
  }

  compararItems(objeto1: any, objeto2: any){
    console.log("objeto1 " + objeto1)
    console.log("objeto2 " + objeto2)
    return objeto1 == objeto2;
  }

  obtenerValor(descripcion: string, array: any){
    let encontro = false;
    let cont = 0;
    do{
      if(array[cont].descripcion == descripcion){
        encontro = true;
      }else{
        cont++;
      }
      
    }while(encontro==false);


    return array[cont].valor;

    /* this.tipos.forEach( tipo =>{
      if(tipo.descripcion == descripcion){
        console.log("Encontro")
        return tipo.valor;
      }else{
        console.log("No encontro")
        return undefined;
      }
    }) */
  }

  verificarSiTieneId(){
    if(this.data.id){
      return true;
    }else{
      return false;
    }
  }
}
