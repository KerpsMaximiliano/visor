import { Component, Inject, OnInit } from '@angular/core';
import { Document } from './Class/document';
import { SeccionDocumentosComponent } from '../../componentes/seccion-documentos/seccion-documentos.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FiltroService } from '../../services/i2t/filtro.service';
import { MatSelectChange } from '@angular/material/select';
import { DocumentoService } from 'src/app/services/i2t/documento.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modal-filtro-documentos',
  templateUrl: './modal-filtro-documentos.component.html',
  styleUrls: ['./modal-filtro-documentos.component.css']
})
export class ModalFiltroDocumentosComponent implements OnInit {

  // categorys: string[] = ['General', 'Diseño','Desarrollo','Testing','Implementacion','Mantenimiento'];
  categorys: string[]
  types: string[];  
  conditions: string[];

  categorySelected: any;
  statusSelected: any;
  typeSelected: any;
  typeOfDocuments: any;
  numeroDocumento = '';
  // categoria?:string;
  idUsuario = '';
  result = {numero:'', nombre: '', categoria: '', tipo: '', asignadoA: '', estado: '',fechaPublicacionDesde: '', fechaPublicacionHasta: '', fechaCaducidadDesde: '', fechaCaducidadHasta: '' ,filtrar: true, limpiar: false}
  save_search_id = '';

  constructor(public documentInstance: Document, public dialogRef: MatDialogRef<SeccionDocumentosComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public _filtroService: FiltroService, public documentService:DocumentoService) {
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
    // this.categorySelected = this.result.categoria;
    console.log('categoriaON',this.data.categoria);
    console.log('typeON',this.data.tipo);
    
    this.result.fechaPublicacionDesde = this.data.fechaPublicacionDesde;
    this.result.fechaPublicacionHasta = this.data.fechaPublicacionHasta;
    this.result.fechaCaducidadDesde = this.data.fechaCaducidadDesde;
    this.result.fechaCaducidadHasta = this.data.fechaCaducidadHasta;
    this.save_search_id = this.data.search_id;
    // console.log('savesearch',this.save_search_id);
  }


  /**
   * Método que limpia los campos del filtro.
   */
  limpiarFiltro(): void{
    this.result.nombre = '';
    this.result.numero = '';
    this.result.asignadoA = '';
    this.statusSelected = '';
    this.result.categoria = '';
    this.typeOfDocuments = '';
    this.result.fechaPublicacionDesde = '';
    this.result.fechaPublicacionHasta = '';
    this.result.fechaCaducidadHasta = '';
    this.result.fechaCaducidadDesde = '';
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
      this.result.fechaPublicacionDesde = this.data.fechaPublicacionDesde;
      this.result.fechaPublicacionHasta = this.data.fechaPublicacionHasta;
      this.result.fechaCaducidadDesde = this.data.fechaCaducidadDesde;
      this.result.fechaPublicacionHasta = this.data.fechaPublicacionHasta;
      this.result.filtrar = false;
      this.dialogRef.close(this.result);
    } else {
      this.result.nombre = '';
      this.result.numero = '';
      this.result.asignadoA = '';
      this.result.estado = '';
      this.result.categoria = '';
      this.result.tipo = '';
      this.result.fechaPublicacionDesde = '';
      this.result.fechaPublicacionHasta = '';
      this.result.fechaCaducidadDesde = '';
      this.result.fechaCaducidadHasta = '';
      this.result.limpiar = true;
      this.result.filtrar = true;
      this.dialogRef.close(this.result);  
    }
  }

  /**
   * Método que guarda la información de busqueda proporcionada en el filtro.
   */
  guardarFiltro(): void {
    // this.documentService.getIdUsuario(this.result.asignadoA).subscribe(response => {
    //   this.idUsuario = response.dataset[0].id
    //   console.log('id',this.idUsuario);
    // })
  
   console.log('categoriaaplicar',this.result.categoria);
   
    console.log('this.idUsuario',this.idUsuario);
    console.log('resytknombre',this.data.nombre);
    // this.categoria = undefined
    const contenido: string = JSON.stringify({
      numero: this.result.numero,
      nombre: this.result.nombre,
      categoria: this.result.categoria,
      tipo: this.result.tipo,
      asignadoA: this.result.asignadoA,
      estado: this.result.estado,
      fechaPublicacionDesde: this.result.fechaPublicacionDesde,
      fechaPublicacionHasta: this.result.fechaPublicacionHasta,
      fechaCaducidadDesde: this.result.fechaCaducidadDesde,
      fechaCaducidadHasta: this.result.fechaCaducidadHasta,
    });
    
    const encodedData = btoa(contenido);
  
    

    if (this.save_search_id == '') {
      this._filtroService.insertFiltro(
        localStorage.getItem('userId')!,
        'documentos',
        // 'filtro_numero_nombre_tipo_asignadoA_estado_categoria_fechaPublicacionDesde_fechaPublicacionHasta_fechaCaducidadDesde_fechaCaducidadHasta',
        'filtro_numero_nombre_categoria_tipo_asignadoA_estado_fechaPublicacionDesde_fechaPublicacionHasta_fechaCaducidadDesde_fechaCaducidadHasta',
        encodedData,
        'Filtra los documentos por las 10 caracteristicas principales').subscribe((rsp: any) => {
          console.log('Filtro guardado: ', rsp);
        });
    } else {
      this._filtroService.updateFiltro(this.save_search_id, encodedData).subscribe((rsp: any) => {
        console.log('Filtro actualizado: ', rsp);
      });
    }
    console.log('asignado',this.idUsuario)
    // console.log('typeSelected',this.data.tipo)
    console.log('type',this.result.tipo)
    console.log('statusSelected',this.data.estado)
    console.log('categoriasd',this.result.categoria);
 

    // contenido.asignadoA.stringify = this.idUsuario
    // this.documentService.getDocumentosFiltrarCategoria(this.result.categoria).subscribe(response => {
    //   // // response.dataset
    //   let respuesta
    //   respuesta = response
    //   this.dialogRef.close(respuesta)
    //   // console.log('response',response)
    // })
    this.documentService.getDocumentosFiltro(this.result.nombre,this.result.tipo,this.result.categoria,this.result.asignadoA,this.result.fechaPublicacionDesde,this.result.fechaPublicacionHasta,this.result.fechaCaducidadDesde,this.result.fechaCaducidadHasta).subscribe(response => {
      // this.documentService.getDocumentosFiltro(contenido).subscribe(response => {
       
        // response.dataset
        let respuesta
        respuesta = response
        this.dialogRef.close(respuesta)
        console.log('response',response.dataset)
      })
    
 
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

  selectCategory(event:MatSelectChange){
    console.log('selectCategoria',event.source.triggerValue);
   
    
    this.result.categoria = event.source.triggerValue
    console.log('select category',this.result.categoria);
  }

  selectTipo(event:MatSelectChange){
    console.log('selectTipo',event.source.triggerValue);
    this.result.tipo = event.source.triggerValue
  }
  selectEstado(event:MatSelectChange){
    console.log('selectEstado',event.source.triggerValue);
    this.result.estado = event.source.triggerValue
  }



}
