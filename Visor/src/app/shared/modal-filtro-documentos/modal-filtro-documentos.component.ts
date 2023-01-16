import { Component, Inject, OnInit } from '@angular/core';
import { Document } from './Class/document';
import { SeccionDocumentosComponent } from '../../componentes/seccion-documentos/seccion-documentos.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FiltroService } from '../../services/i2t/filtro.service';
import { MatSelectChange } from '@angular/material/select';
import { DocumentoService } from 'src/app/services/i2t/documento.service';
import { finalize } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MAT_DATE_LOCALE } from '@angular/material/core/datetime/date-adapter';



@Component({
  selector: 'app-modal-filtro-documentos',
  templateUrl: './modal-filtro-documentos.component.html',
  styleUrls: ['./modal-filtro-documentos.component.css']
})


export class ModalFiltroDocumentosComponent implements OnInit {
  categorys: string[];
  estados: string[];
  types: string[] = [];
  encontrado: boolean = false;
  numeroDocumento = '';
  idUsuario = '';
  categoria?: string;
  estado?: string;
  tipo?:string;
  fechaPublicacionDesde?:string;
  fechaPublicacionHasta?:string;
  fechaCaducidadDesde?:string;
  fechaCaducidadHasta?:string;
  result = {numero:'', nombre: '', categoria: '', tipo: '', asignadoA: '', estado: '',publicacionDesde: '', publicacionHasta: '', caducidadDesde: '', caducidadHasta: '' ,filtrar: true, limpiar: false}
  save_search_id = '';

  constructor(public documentInstance: Document, public dialogRef: MatDialogRef<SeccionDocumentosComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public _filtroService: FiltroService, public documentService:DocumentoService,@Inject(MAT_DATE_LOCALE) private _locale: string, private _adapter: DateAdapter<any>) {
    //Utilizan una instancia de la clase Documents para acceder a la información contenida.
    this.categorys = this.documentInstance.categorys;
    this.estados = this.documentInstance.estados;    
    this._locale = 'es';
    this._adapter.setLocale(this._locale);
  }

  ngOnInit(): void {
    this._filtroService.getUserId(localStorage.getItem('usuario')!).subscribe((response: any) => {
    localStorage.setItem('userId', response.dataset[0].id);
    this._filtroService.selectFiltro(response.dataset[0].id, 'documentos').subscribe((resp: any) => {
      if (resp.dataset.length == 0 ) {
        } else {
          console.log('hay datos', resp);
          resp.dataset.forEach((filtro: any) => {
            if (filtro.nombre == 'filtro_numero_nombre_categoria_tipo_asignadoA_estado_fechaPublicacionDesde_fechaPublicacionHasta_fechaCaducidadDesde_fechaCaducidadHasta') {
              const contenido = JSON.parse(atob(filtro.contenido));
              console.log('contenido',contenido);
              
              this.result.numero = contenido.numero;
              this.result.nombre = contenido.nombre;
              this.categoria = contenido.categoria
              this.tipo = contenido.tipo;
              this.result.asignadoA = contenido.asignadoA;
              this.estado = contenido.estado;
              if(this.estado == "Active"){
                this.estado = "Publicado"
              }else if(this.estado == 'Draft'){
                this.estado = "Borrador"
              }else if(this.estado == "Expired"){
                this.estado = "Eliminado"
              }
              if(this.categoria != '' && this.categoria != null &&this.categoria != undefined){
              this.mostrarTipo(this.categoria)    
              }
              // this.fechaDePublicacion = contenido.fechaDePublicacion;
              this.fechaPublicacionDesde = contenido.fechaPublicacionDesde;
              this.fechaPublicacionHasta = contenido.fechaPublicacionHasta;
              // this.fechaDeCaducidad = contenido.fechaDeCaducidad;
              this.fechaCaducidadDesde = contenido.fechaCaducidadDesde;
              this.fechaCaducidadHasta = contenido.fechaCaducidadHasta;
              this.save_search_id = filtro.saved_search_id;
            }
          })
        };
      });
    });
  }


  /**
   * Método que limpia los campos del filtro.
   */
  limpiarFiltro(): void{
    this.result.numero =""
      this.result.nombre ="";
    this.categoria =='' ? null : this.categoria = undefined;
    this.tipo =='' ? null : this.tipo= undefined;
    this.result.asignadoA ="";
    this.estado =='' ? null : this.estado = undefined;;
    // console.log('estadolimpiar',this.estado);
    // console.log('categorialimpiar',this.categoria);
    this.fechaPublicacionDesde =='' ? null : this.fechaPublicacionDesde= undefined;
    this.fechaPublicacionHasta =='' ? null : this.fechaPublicacionHasta= undefined;
    this.fechaCaducidadDesde =='' ? null : this.fechaCaducidadDesde= undefined;
    this.fechaCaducidadHasta =='' ? null : this.fechaCaducidadHasta= undefined;
    this.result.limpiar = true;
    this._filtroService.deleteFiltro(this.save_search_id).subscribe((rsp: any) => {
      console.log('Filtro eliminado: ', rsp);
    });
  }

  /**
   * Método que cancela la búsqueda del filtro y cierra el modal
   */
  cancelarBusqueda(): void {
    if (this.result.limpiar == false) {
      this.result.numero = this.data.numero;
      this.result.nombre = this.data.nombre;
       this.categoria = this.data.categoria;
      this.tipo = this.data.tipo;
      this.result.asignadoA = this.data.asignadoA;
      this.estado = this.data.estado;
      this.fechaPublicacionDesde = this.data.publicacionDesde;
      this.fechaPublicacionHasta = this.data.publicacionHasta;
      this.fechaCaducidadDesde = this.data.caducidadDesde;
      this.fechaCaducidadHasta= this.data.caducidadHasta;
      this.result.filtrar = false;
      this.dialogRef.close(this.result);
    } else {
      this.result.numero = '';
      this.result.nombre = '';
      this.categoria = '';
      this.tipo = '';
      this.result.asignadoA = '';
      this.estado = '';
      this.fechaPublicacionDesde = '';
      this.fechaPublicacionHasta = '';
      this.fechaCaducidadDesde = '';
      this.fechaCaducidadHasta = '';
      this.result.limpiar = true;
      this.result.filtrar = true;
      this.dialogRef.close(this.result);
    }
  }
 /**
   * Método que según la categoria elegida se habilitan los tipos de esa categoría
   */
  mostrarTipo(categoria:string){
    switch(categoria){
      case "General": 
      this.types = ["Identificacion de Necesidades",
      "Plan de proyecto",
      "Requerimientos",
      "Estimacion de tareas",
      "Product backlog",
      "Sprint backlog",
      "Documento"]
      break;
      case "Diseño": 
      this.types = ["Propuesta funcional",
      "Arquitectura",
      "Caso de Uso",
      "Despliegue Proceso Produccion",
      "Requerimiento de configuracion",
      "Boceto/Maqueta"]
      break;
      case "Desarrollo": 
      this.types = ["Nota de desarrollo"]
      break;
      case "Testing": 
      this.types = ["Plan de pruebas",
      "Caso de prueba",
      "Ciclo/corrida",
      "Incidencia"]
      break;
      case "Implementacion": 
      this.types = ["Proceso de despliegue"]
      break;
      case "Mantenimiento": 
      this.types = ["Requerimientos de Cambios",
      "Estimacion de Cambios"]
      break;
      default:
        this.types = [""]
        break;
    }
  }



  /**
   * Método que guarda la información de busqueda proporcionada en el filtro.
   */
  guardarFiltro(): void {
    let numero:any;
    let nombre:any
    let asignadoA:any 

    if(this.categoria ==''){
    this.categoria = undefined
    this.tipo = undefined
    } 

    const contenido: string = JSON.stringify({
      numero: this.result.numero == '' ? null : this.result.numero,
      nombre: this.result.nombre == '' ? null : this.result.nombre,
      categoria: this.categoria == '' ? undefined : this.categoria,
      tipo: this.tipo == '' ? null : this.tipo,
      asignadoA: this.result.asignadoA == '' ? null : this.result.asignadoA,
      estado: this.estado == '' ? null : this.estado,
      fechaPublicacionDesde: this.fechaPublicacionDesde == '' ? null : this.fechaPublicacionDesde,
      fechaPublicacionHasta: this.fechaPublicacionHasta == '' ? null : this.fechaPublicacionHasta,
      fechaCaducidadDesde: this.fechaCaducidadDesde == '' ? null : this.fechaCaducidadDesde,
      fechaCaducidadHasta: this.fechaCaducidadHasta == '' ? null : this.fechaCaducidadHasta,
    });
    // console.log('contenido',contenido);

    const encodedData = btoa(contenido);

    if (this.save_search_id == '') {
      this._filtroService.insertFiltro(
        localStorage.getItem('userId')!,
        'documentos',
        'filtro_numero_nombre_categoria_tipo_asignadoA_estado_fechaPublicacionDesde_fechaPublicacionHasta_fechaCaducidadDesde_fechaCaducidadHasta',
        encodedData,
        'Filtra los documentos por las 10 caracteristicas principales').subscribe((rsp: any) => {
          console.log('Filtro guardado: ', rsp);
        });
    }else {
      this._filtroService.updateFiltro(this.save_search_id, encodedData).subscribe((rsp: any) => {
        console.log('Filtro actualizado: ', rsp);
      });
    }

    if(this.estado == "Publicado"){
      this.estado = "Active"
    }else if(this.estado == 'Borrador'){
      this.estado = "Draft"
    }else if(this.estado == "Eliminado"){
      this.estado = "Expired"
    }

    // console.log('nombreantes',this.result.nombre);
    // console.log('estadoooooo',this.estado);
     
   if(this.result.numero == ""){
     numero = null
    }else{
      numero = this.result.numero
    }
    if(this.result.nombre == ""){
      nombre = undefined
    }else{
      nombre = this.result.nombre
    }
    if(this.result.asignadoA == ""){
      asignadoA = undefined
    }else{
      asignadoA = this.result.asignadoA
    } 
    if(this.estado ==''){
      this.estado = undefined
    } 
    if(this.tipo ==''){
      this.tipo = undefined
    } 
    // console.log('categoria antes de servicio2',this.categoria);

    if(this.result.asignadoA !== '' && this.result.asignadoA !== null && this.result.asignadoA !== undefined){

      this.documentService.getIdUsuario(this.result.asignadoA).subscribe(data => {
      this.idUsuario = data.dataset[0].id
      // console.log('id',this.idUsuario);

      // console.log(' de cerrar',this.result.numero,this.result.nombre,this.categoria,this.tipo,this.idUsuario,this.estado,this.fechaPublicacionDesde,this.fechaPublicacionHasta,this.fechaCaducidadDesde,this.fechaCaducidadHasta);
    
      this.documentService.getDocumentosFiltro(numero,nombre,this.categoria,this.tipo,this.idUsuario,this.estado,this.fechaPublicacionDesde,this.fechaPublicacionHasta,this.fechaCaducidadDesde,this.fechaCaducidadHasta).subscribe(response => {
        let respuesta
        respuesta = response
        this.dialogRef.close(respuesta)
        // console.log('response',response.dataset)
        })
      })
    }else{
      // console.log('nombre',nombre);
    // console.log(' entro al else',this.result.numero,this.result.nombre,this.categoria,this.tipo,this.idUsuario,this.estado,this.fechaPublicacionDesde,this.fechaPublicacionHasta,this.fechaCaducidadDesde,this.fechaCaducidadHasta);
    this.documentService.getDocumentosFiltro(numero,nombre,this.categoria,this.tipo,asignadoA,this.estado,this.fechaPublicacionDesde,this.fechaPublicacionHasta,this.fechaCaducidadDesde,this.fechaCaducidadHasta).subscribe(response => {
      let respuesta
      respuesta = response
      this.dialogRef.close(respuesta)
      // console.log('response',response.dataset)
      })
    }
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

  /**
   * Método en el que se seleciona y guarda la categoria.
   *
   * @param event
   */
  selectCategory(event:MatSelectChange){
   
    this.categoria = event.source.triggerValue
    this.categoria == '' ? null : this.categoria
    // console.log('selectCategoria', this.categoria);
    this.mostrarTipo(this.categoria);
  }

  selectTipo(event:MatSelectChange){
    // console.log('selectTipo',event.source.triggerValue);
    this.tipo = event.source.triggerValue
    this.tipo == '' ? null : this.tipo
  }
  selectEstado(event:MatSelectChange){
    // console.log('selectEstado',event.source.triggerValue);
    this.estado = event.source.triggerValue
    this.estado == '' ? null : this.estado
  }

  getFechaPublicacionDesde(event:any){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();     
    this.fechaPublicacionDesde= fechaJson.split('T')[0];
    // console.log('this.fechaPublicacionDesde',this.fechaPublicacionDesde);

  }

  getFechaPublicacionHasta(event: MatDatepickerInputEvent<any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaPublicacionHasta= fechaJson.split('T')[0];
  }

  getFechaCaducidadDesde(event: MatDatepickerInputEvent<any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaCaducidadDesde= fechaJson.split('T')[0];
  }

  getFechaCaducidadHasta(event: MatDatepickerInputEvent<any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaCaducidadHasta= fechaJson.split('T')[0];
  }

}
