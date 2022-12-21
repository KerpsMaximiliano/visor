import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentoService } from 'src/app/services/i2t/documento.service';

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

  camposCompletos!: boolean;

  constructor(private _documentService: DocumentoService) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      archivo: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      proyectoAsociado: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      fechaPublicacion: new FormControl(null, Validators.required),
      fechaCaducidad: new FormControl(null, Validators.required),
      asignadoA: new FormControl(null, Validators.required)
    })
  }

  /* agregarDocumento(event: Event){
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
      this.camposCompletos = false;
      return this.camposCompletos;
    }


  } */


}
