import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { DocumentoService } from 'src/app/services/i2t/documento.service';
import { SeccionDocumentosComponent } from '../seccion-documentos.component';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-modal-documentos',
  templateUrl: './modal-documentos.component.html',
  styleUrls: ['./modal-documentos.component.css']
})
export class ModalDocumentosComponent implements OnInit {

  formulario!: FormGroup;
  tipos = [
    "Identificación de necesidades",
    "Plan de proyecto",
    "Requerimientos",
    "Estimación de tareas",
    "Product backlog",
    "Sprint backlog",
    "Documento",
    "Propuesta funcional",
    "Arquitectura",
    "Caso de uso",
    "Requerimiento de configuración",
    "Boceto/Maqueta",
    "Nota de desarrollo",
    "Plan de pruebas",
    "Caso de prueba",
    "Ciclo/corrida",
    "Incidencia",
    "Proceso de despliegue",
    "Requerimientos de cambios",
    "Estimación de cambios"
  ];
  estados = [
    "Publicado",
    "Borrador",
    "Eliminado"
  ];

  camposIncompletos!: boolean;

  constructor(private _documentService: DocumentoService, public dialog: MatDialogRef<SeccionDocumentosComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  
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

    if(this.data.estado != null){
      this.formulario.controls["nombre"].setValue(this.data.nombre);
      this.formulario.controls["tipo"].setValue(this.data.tipo);
      this.formulario.controls["estado"].setValue(this.data.estado);
      this.formulario.controls["fechaPublicacion"].setValue(this.data.fechaPublicacion);
      this.formulario.controls["fechaCaducidad"].setValue(this.data.fechaCaducidad);
      this.formulario.controls["asignadoA"].setValue(this.data.asignadoA);
    }
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
    console.log(this.formulario.controls["fechaPublicacion"].value)
    let pathArchivo: Array<string> = this.formulario.controls["archivo"].value.split("\\");

    let jsbody = {
      par_modo: "",
      pFilename: pathArchivo.pop(),
      pDocument_name: this.formulario.controls["nombre"].value,
      ptipo: this.formulario.controls["tipo"].value,
      pStatus_id: this.formulario.controls["estado"].value,
      /* pActive_date: this.formulario.controls["fechaPublicacion"].value,
      pExp_date: this.formulario.controls["fechaCaducidad"].value, */
      pID_CASE: this.formulario.controls["proyectoAsociado"].value,
      pAssigned_user_id: this.formulario.controls["asignadoA"].value
    };

    if(this.data.estado != null){
      jsbody.par_modo = "U"
    }else{
      jsbody.par_modo = "I"
    }

    let body = JSON.stringify(jsbody);

    console.log(body);
    return this._documentService.ABMDocumento(body).subscribe( respuesta => {
      window.location.reload();
    });
  }

  compararItems(objeto1: any, objeto2: any){
    return objeto1 == objeto2;
  }
}
