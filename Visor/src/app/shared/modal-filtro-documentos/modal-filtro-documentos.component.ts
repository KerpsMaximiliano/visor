import { Component, Inject, OnInit } from '@angular/core';
import { Document } from './Class/document';
import { SeccionDocumentosComponent } from '../../componentes/seccion-documentos/seccion-documentos.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FiltroService } from '../../services/i2t/filtro.service';

@Component({
  selector: 'app-modal-filtro-documentos',
  templateUrl: './modal-filtro-documentos.component.html',
  styleUrls: ['./modal-filtro-documentos.component.css']
})
export class ModalFiltroDocumentosComponent implements OnInit {

  categorys: string[];
  types: string[];  
  conditions: string[];

  categorySelected: any;
  statusSelected: any;
  typeSelected: any;

  result = {numero: '', nombre: '', asignadoA: '', estado: '', tipo: '', categoria: '', fechaPublicacion: '', fechaCaducidad: '', filtrar: true, limpiar: false}
  save_search_id = '';

  constructor(public documentInstance: Document, public dialogRef: MatDialogRef<SeccionDocumentosComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public _filtroService: FiltroService) {
    //Utilizan una instancia de la clase Documents para acceder a la información contenida.
    this.categorys = this.documentInstance.categorys;
    this.types = this.documentInstance.typeOfDocuments;
    this.conditions = this.documentInstance.conditions;
  }

  ngOnInit(): void {
    this.result.numero = this.data.numero;
    this.result.nombre = this.data.nombre;
    this.result.asignadoA = this.data.asignadoA;
    this.result.estado = this.data.estado;
    this.result.tipo = this.data.tipo;
    this.result.categoria = this.data.categoria;
    this.result.fechaPublicacion = this.data.fechaPublicacion;
    this.result.fechaCaducidad = this.data.fechaCaducidad;
    this.save_search_id = this.data.search_id;
  }


  /**
   * Método que limpia los campos del filtro.
   */
  limpiarFiltro(): void {
    this.result.nombre = '';
    this.result.numero = '';
    this.result.asignadoA = '';
    this.result.estado = '';
    this.result.categoria = '';
    this.result.tipo = '';
    this.result.fechaPublicacion = '';
    this.result.fechaPublicacion = '';
    this.result.limpiar = true;
    this._filtroService.deleteFiltro(this.save_search_id).subscribe((rsp: any) => {
      console.log('Filtro eliminado: ', rsp);
    });
  }

  /**
   * Método que cancela la busqueda del filtro
   */
  cancelarBusqueda(): void {
    if (this.result.limpiar == false) {
      this.result.nombre = this.data.nombre;
      this.result.numero = this.data.numero;
      this.result.tipo = this.data.tipo;
      this.result.asignadoA = this.data.asignadoA;
      this.result.estado = this.data.estado;
      this.result.categoria = this.data.categoria;
      this.result.fechaPublicacion = this.data.fechaPublicacion;
      this.result.fechaCaducidad = this.data.fechaCaducidad;
      this.result.filtrar = false;
      this.dialogRef.close(this.result);
    } else {
      this.result.nombre = '';
      this.result.numero = '';
      this.result.asignadoA = '';
      this.result.estado = '';
      this.result.categoria = '';
      this.result.tipo = '';
      this.result.fechaPublicacion = '';
      this.result.fechaPublicacion = '';
      this.result.limpiar = true;
      this.result.filtrar = true;
      this.dialogRef.close(this.result);  
    }
  }

  /**
   * Método que guarda la información de busqueda proporcionada en el filtro.
   */
  guardarFiltro(): void {
    const contenido: string = JSON.stringify({
      nombre: this.result.nombre,
      numero: this.result.numero,
      tipo: this.typeSelected,
      asignadoA: this.result.asignadoA,
      estado: this.statusSelected,
      categoria: this.categorySelected,
      fechaPublicacion: this.result.fechaPublicacion,
      fechaCaducidad: this.result.fechaCaducidad
    });
    const encodedData = btoa(contenido);
    if (this.save_search_id == '') {
      this._filtroService.insertFiltro(
        localStorage.getItem('userId')!,
        'documentos',
        'filtro_numero_nombre_tipo_asignadoA_estado_categoria_fechaPublicacion_fechaCaducidad',
        encodedData,
        'Filtra los documentos por las 8 caracteristicas principales').subscribe((rsp: any) => {
          console.log('Filtro guardado: ', rsp);
        });
    } else {
      this._filtroService.updateFiltro(this.save_search_id, encodedData).subscribe((rsp: any) => {
        console.log('Filtro actualizado: ', rsp);
      });
    }
    console.log(this.categorySelected)
  }

  /**
   * Método que valida que la tecla pulsada sea enter.
   * 
   * @param e KeyboardEvent
   */
    validarTecla(e: KeyboardEvent): void{
    if(e.key == "Enter"){
      this.guardarFiltro();
      this.dialogRef.close(this.result);
    }
  }


}
