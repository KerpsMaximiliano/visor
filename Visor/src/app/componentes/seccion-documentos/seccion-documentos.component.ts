import { Component, OnInit } from '@angular/core';
import { FiltroService } from '../../services/i2t/filtro.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFiltroDocumentosComponent } from '../../shared/modal-filtro-documentos/modal-filtro-documentos.component';
import { Documento } from '../../interfaces/documento';
import { DocumentoService } from '../../services/i2t/documento.service';

@Component({
  selector: 'app-seccion-documentos',
  templateUrl: './seccion-documentos.component.html',
  styleUrls: ['./seccion-documentos.component.css']
})

/**
 * Esta clase contiene la lógica del componente correspondiente a la sección de documentos.
 */
export class SeccionDocumentosComponent implements OnInit {

  //Variables del filtro
  orden = ['Alfabetico', 'Fecha'];
  ordenSeleccion = 'Alfabetico';
  orden_saved_search_id = '';
  modal_saved_search_id = '';
  assigned_saved_search_id ='';
  usuarioLocal!:string|null ;
  numero: string = "";
  nombre: string = "";
  estado:string = "";
  asignadoA?: string = "";
  categoria: string = "";
  tipo: string = "";
  estadoDocumento: string = "";
  idUsuario = '';
  fechaPublicacion: string ="";
  fechaCaducidad: string ="";
  fechaPublicacionDesde: string = "";
  fechaPublicacionHasta: string = "";
  fechaCaducidadDesde: string = "";
  fechaCaducidadHasta: string = "";
  inputIzq: string = "";
  idDocumentoSeleccionado: string ="";
  listOfDocuments: Documento[] = [];
  page!: number; 
  estadoInfo: boolean = false;
  arrayDocuments: any;
  buttonOn: boolean = false;
  valorInputDocumento:string = '';
  // assignedToMe: Documento[] = [];

  //Array de iconos.
  icons: string[] = [
    "fa-solid fa-file-lines",
    "fas fa-file",
    "fa-solid fa-file-zipper",
    "fas fa-file-code",
    "far fa-file-alt",
    "fas fa-archive",
    "far fa-file"];

  iconGeneral: string = "fa-solid fa-file";

  constructor(private _filtroService: FiltroService, public dialog: MatDialog, private documentService: DocumentoService) {
    // this.listOfDocuments = [];
  }

  ngOnInit(): void {
    this.buscarFiltro();
   
  }

  /**
   * Método que obtiene los documentos a traves del servicio.
   * 
   */
  getDocuments(): void{  
    this.estado === '' ? null : this.estado;
    // console.log('asignadoA',this.asignadoA );
    if(this.asignadoA !== '' && this.asignadoA !== null && this.asignadoA !== undefined){
      this.documentService.getIdUsuario(this.asignadoA).subscribe(data => {
      this.idUsuario = data.dataset[0].id
      console.log('id',this.idUsuario);
      this.estado === '' ? null : this.estado

      this.documentService.getDocumentosFiltro(this.numero,this.nombre,this.categoria,this.tipo,this.idUsuario,this.estado,this.fechaPublicacionDesde,this.fechaPublicacionHasta,this.fechaCaducidadDesde,this.fechaCaducidadHasta).subscribe(result => {
      this.arrayDocuments = result;
      for(let i = 0;i<result.dataset.length;i++){
        let document: Documento = {
          id: result.dataset[i].id,
          document_name:result.dataset[i].document_name,
          name: result.dataset[i].name,
          user_name: result.dataset[i].user_name,
          category: result.dataset[i].category,
          type: result.dataset[i].type,
          status: result.dataset[i].status,
          active_date: result.dataset[i].active_date.slice(8,10)+'-'+result.dataset[i].active_date.slice(5,7)+'-'+result.dataset[i].active_date.slice(0,4),
          finishedDate: result.dataset[i].exp_date,
          filename:result.dataset[i].filename
        };
        this.listOfDocuments.push(document); //Array que almacena los proyectos con sus respectivos datos.
      }
      this.arrayDocuments = this.listOfDocuments;
      // console.log('this.arrayDocuments',this.arrayDocuments);
      });
    })
    }else{
      this.documentService.getDocumentosFiltro(this.numero,this.nombre,this.categoria,this.tipo,this.asignadoA,this.estado,this.fechaPublicacionDesde,this.fechaPublicacionHasta,this.fechaCaducidadDesde,this.fechaCaducidadHasta).subscribe(result => {
        this.arrayDocuments = result;
      for(let i = 0;i<result.dataset.length;i++)
      {
        let document: Documento = {
          id: result.dataset[i].id,
          document_name:result.dataset[i].document_name,
          name: result.dataset[i].name,
          user_name: result.dataset[i].user_name,
          category: result.dataset[i].category,
          type: result.dataset[i].type,
          status: result.dataset[i].status,
          active_date: result.dataset[i].active_date.slice(8,10)+'-'+result.dataset[i].active_date.slice(5,7)+'-'+result.dataset[i].active_date.slice(0,4),
          finishedDate: result.dataset[i].exp_date,
          filename:result.dataset[i].filename
        };
        this.listOfDocuments.push(document); //Array que almacena los proyectos con sus respectivos datos.
      }
      this.arrayDocuments = this.listOfDocuments;
      // console.log('this.arrayDocuments',this.arrayDocuments);
      });
    }
  }
  
  /**
   * Este método se utiliza para abrir el dialog del filtro y guarda la información ingresada.
   */
  openFilter(){
    // console.log('cate',this.categoria);
    // console.log('tipopenfilter',this.tipo);
    // console.log('estado openFilter',this.estado);
    // console.log('fechapublicacion desde',this.fechaPublicacionDesde);
    
    const dialogRef = this.dialog.open(ModalFiltroDocumentosComponent, {
      width: '40%', 
      height: '90%',
      disableClose: true,
      data: { numero: this.numero, nombre: this.nombre, categoria: this.categoria, tipo: this.tipo, asignadoA: this.asignadoA, estado: this.estado, publicacionDesde: this.fechaPublicacionDesde,publicacionHasta: this.fechaPublicacionHasta,caducidadDesde: this.fechaCaducidadDesde, caducidadHasta: this.fechaCaducidadHasta, seleccion: this.ordenSeleccion, search_id: this.modal_saved_search_id}
    });

    dialogRef.afterClosed().subscribe(response => {
      
      // console.log('antesthis.categoria',this.categoria);
      // console.log('response',response);
      this.numero = response.numero;
      // console.log('this.numero', response.numero);
      this.nombre = response.nombre;
      // console.log('this.nombre',  this.nombre);
      this.categoria = response.categoria;
      this.tipo = response.tipo;
      this.asignadoA = response.asignadoA;
      this.estado = response.estado;
      this.fechaPublicacionDesde = response.fechaPublicacionDesde;
      this.fechaPublicacionHasta = response.fechaPublicacionHasta;
      this.fechaCaducidadDesde = response.fechaCaducidadDesde;
      this.fechaCaducidadHasta = response.fechaCaducidadHasta;
      this.fechaPublicacion = response.active_date
      // console.log('this.fechaPublicacion',this.fechaPublicacion);
      // console.log('this.categoria',this.categoria);
      // this.fechaDeCaducidad = result.fechaCaducidad
      // this.fechaPublicacion = response.active_date.slice(8,10)+'-'+response.active_date.slice(5,7)+'-'+response.active_date.slice(0,4)
      // console.log('response',response);
      // result.dataset[i].active_date.slice(8,10)+'-'+result.dataset[i].active_date.slice(5,7)+'-'+result.dataset[i].active_date.slice(0,4)
      this.listOfDocuments = response.dataset
      this.arrayDocuments = this.listOfDocuments
      // console.log('documentosAfterclose',this.listOfDocuments);
     
    });
  }
  
  cerrarTablaDocumentos(event: Event){
    if(this.valorInputDocumento.length == 0){
      this.listOfDocuments;
    }
  }

    /**
   * Este método se utiliza para buscar documentos por el nombre.
   * 
   * @param e Event
   */
  buscarDocumentos(event: Event){
    this.valorInputDocumento = (event.target as HTMLInputElement).value;
    this.documentService.getDocumento(this.valorInputDocumento).subscribe(result => {
      this.listOfDocuments = result.dataset
    })
    if(this.valorInputDocumento == ''){
      this.listOfDocuments
    }
  }
  /**
   * Este método se utiliza para disparar el evento que contiene el orden seleccionado para los documentos.
   * 
   * @param e Event
   */
  shotOrder(e: Event){
    this.ordenSeleccion = (e.target as HTMLElement).innerText;
    const contenido: string = JSON.stringify({ ordenSeleccion : this.ordenSeleccion });
    const encodedData = btoa(contenido);
    console.log('this.orden_saved_search_id',this.orden_saved_search_id);
    if (this.orden_saved_search_id == '') {
      this._filtroService.insertFiltro(
        localStorage.getItem('userId')!,
        'documentos',
        'filtro_orden',
        encodedData,
        'Filtra los documentos por orden alfabetico o fecha').subscribe((rsp: any) => {
        console.log('Filtro guardado: ', rsp);
        this.changeOrder();
        });
    } else {
      this._filtroService.updateFiltro(this.orden_saved_search_id, encodedData).subscribe((rsp: any) => {
        console.log('Filtro actualizado: ', rsp);
        this.changeOrder();
      });
    }
  }

  /**
   * Este método se utiliza para cambiar el orden de los documentos.
   * 
   */
  changeOrder(){
    if(this.ordenSeleccion == 'Alfabetico') {
      this.listOfDocuments.sort(function(a, b) {
        if(a.document_name > b.document_name){
          return 1;
        }
        if (a.document_name < b.document_name) {
          return -1;
        }
        return 0;
      });
    }

    if(this.ordenSeleccion == 'Fecha') {      
      this.listOfDocuments.sort(function(a, b) {
        if(a.active_date < b.active_date){
          return 1;
        }
        if (a.active_date > b.active_date) {
          return -1;
        }
        return 0;
      });
    }
    this.listOfDocuments
  }

  /**
   * Este método sirve para editar un documento.
   * 
   */
  editDocument(){

  }

  /**
   * Este método sirve para eliminar un documento.
   * 
   */
  removeDocument(){}

  /**
   * Este método sirve para descargar un documento.
   * 
   */
  donwloadDocument(){
    
  }

  /**
   * Este método se utiliza para verificar si es un documento general.
   * 
   * @param d Documento
   * @returns boolean
   */
  isGeneral(d: Documento): boolean{
    if(d.category == "General"){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Este método se utiliza para verificar si es un documento de ventas.
   * 
   * @param d Documento
   * @returns boolean
   */
  isVentas(d: Documento): boolean{
    if(d.category == "Ventas"){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Este método se utiliza para verificar si es un documento de diseño.
   * 
   * @param d Documento
   * @returns boolean
   */
  isDisenio(d: Documento): boolean{
    if(d.category == "Diseño"){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Este método se utiliza para verificar si es un documento de mantenimiento.
   * 
   * @param d Documento
   * @returns boolean
   */
  isMantenimiento(d: Documento): boolean{
    if(d.category == "Mantenimiento"){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Este método se utiliza para verificar si es un documento de testing.
   * 
   * @param d Documento
   * @returns boolean
   */
  isTesting(d: Documento): boolean{
    if(d.category == "Testing"){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Este método se utiliza para verificar si es un documento de desarrollo.
   * 
   * @param d Documento
   * @returns boolean
   */
  isDesarrollo(d: Documento): boolean{
    if(d.category == "Desarrollo"){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Este método se utiliza para verificar si es un documento de implementación.
   * 
   * @param d Documento
   * @returns boolean
   */
  isImplementacion(d: Documento): boolean{
    if(d.category == "Implementación"){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Esta método sirve para seleccionar el icono adecuado a la categoria del documento.
   *
   * @param d Documento
   * @returns string
   */
  iconChecker(d: Documento): string{
    let index: number = 0;
    switch(d.category){
      case "Diseño":
        index = 0;
        break;

      case "General":
        index = 1;
        break;

      case "Implementación":
        index = 2;
        break;  

      case "Desarrollo":
        index = 3;
        break;

      case "Testing":
        index = 4;
        break;
      
      case "Mantenimiento":
        index = 5;
        break;
      
      case "Ventas":
        index = 6;
        break;
    }
    return this.icons[index]; //Retorna el titulo del icono correspondiente al documento.
  }

  isPublicado(d: Documento): boolean{
    if(d.status == "Publicado"){
      return true;
    }
    else{
      return false;
    }
  }

  isBorrador(d: Documento): boolean{
    if(d.status == "Borrador"){
      return true;
    }
    else{
      return false;
    }
  }

  isEliminado(d: Documento): boolean{
    if(d.status == "Eliminado"){
      return true;
    }
    else{
      return false;
    }
  }

  showInformacion(){
    if(this.estadoInfo == false){
      this.estadoInfo = true;
    }
    else{
      this.estadoInfo = false
    }
  }

/**
   * Método para buscar si hay filtros previamente guardados
   *
   */
  buscarFiltro(){
    this._filtroService.getUserId(localStorage.getItem('usuario')!).subscribe((response: any) => {
      localStorage.setItem('userId', response.dataset[0].id);
      this._filtroService.selectFiltro(response.dataset[0].id, 'documentos').subscribe((resp: any) => {
        if (resp.dataset.length == 0 ) {
        } else {
          console.log('hay datos', resp);
          resp.dataset.forEach((filtro: any) => {   
            if (filtro.nombre == 'filtro_orden') {           
              const contenido = JSON.parse(atob(filtro.contenido));
              this.ordenSeleccion = contenido.ordenSeleccion; 
              this.orden_saved_search_id = filtro.saved_search_id;
            }
            if (filtro.nombre == 'filtro_numero_nombre_categoria_tipo_asignadoA_estado_fechaPublicacionDesde_fechaPublicacionHasta_fechaCaducidadDesde_fechaCaducidadHasta') {
              // this.modal_saved_search_id = filtro.saved_search_id;     
              const contenido = JSON.parse(atob(filtro.contenido));
              this.numero = contenido.numero;
              this.nombre = contenido.nombre;
              this.categoria = contenido.categoria
              this.tipo = contenido.tipo;
              this.asignadoA = contenido.asignadoA;
              this.estado = contenido.estado;
              if(contenido.estado == "Publicado"){
                this.estado = "Active"
              }else if(contenido.estado == "Borrador"){
                this.estado = "Draft"
              }else if(contenido.estado == "Eliminado" ){
                this.estado = "Expired"
              }else{            
                this.estado = contenido.estado
              }
              this.fechaPublicacion = contenido.fechaPublicacion;
              this.fechaPublicacionDesde = contenido.fechaPublicacionDesde;
              this.fechaPublicacionHasta = contenido.fechaPublicacionHasta;
              this.fechaCaducidad = contenido.fechaCaducidad;
              this.fechaCaducidadDesde = contenido.fechaCaducidadDesde;
              this.fechaCaducidadHasta = contenido.fechaCaducidadHasta;
              this.modal_saved_search_id = filtro.saved_search_id;   
              
            }  if(filtro.nombre == 'filtro_misAsignados3'){
              const contenido = JSON.parse(atob(filtro.contenido));
              this.buttonOn = contenido.boton
              if(!contenido.boton == false){
                this.buttonOn = true  
                this.asignadoA = contenido.usuario
              }
            this.assigned_saved_search_id = filtro.saved_search_id  
            }    
          }
      )}
      this.getDocuments();
      })
    })

  }

  // }
  /**
   * Método que sirve para filtrar los documentos y obtener los que están asignados al usuario logueado.
   *
   */
  filterByUser(){
    console.log('this.arrayDocumentsfilter',this.arrayDocuments);
    let userLocal: string | null = localStorage.getItem('usuario');
    let assignedToMe: Documento[] = [];
    if(this.buttonOn == false){
      this.buttonOn = true;
      const contenido: string = JSON.stringify({boton : this.buttonOn, usuario:userLocal});
      const encodedData = btoa(contenido)
      if (this.assigned_saved_search_id == '') {
        this._filtroService.insertFiltro(
          localStorage.getItem('userId')!,
          'documentos',
          'filtro_misAsignados3',
          encodedData,
          'Filtra los documentos asignados al usuario').subscribe((rsp: any) => {
            console.log('Filtro guardado: ', rsp);
          });
      }else{
          this._filtroService.updateFiltro(this.assigned_saved_search_id, encodedData).subscribe((rsp: any) => {
           console.log('Filtro actualizado: ', rsp);
            });
          }
          for(let i=0;i<this.listOfDocuments.length;i++){
            if(this.listOfDocuments[i].user_name == userLocal){
              assignedToMe.push(this.listOfDocuments[i]);
            }
          }
          // console.log("Activado",assignedToMe)
          this.listOfDocuments = assignedToMe;
      }else{
        this.buttonOn = false;
        this.listOfDocuments = []
        const contenido: string = JSON.stringify({boton : this.buttonOn,usuario:userLocal});
        const encodedData = btoa(contenido)
        // console.log('lisdocumen',this.listOfDocuments);
        // console.log("Desactivado",this.arrayDocuments)   
        if (this.assigned_saved_search_id == '') {
          this._filtroService.insertFiltro(
            localStorage.getItem('userId')!,
            'documentos',
            'filtro_misAsignados3',
            encodedData,
            'Filtra los documentos asignados al usuario').subscribe((rsp: any) => {
              console.log('Filtro guardado: ', rsp);
            });
        }else {
          this._filtroService.updateFiltro(this.assigned_saved_search_id, encodedData).subscribe((rsp: any) => {
            console.log('Filtro actualizado: ', rsp);
          });
        }
        // this.listOfDocuments = this.arrayDocuments;
        this.asignadoA !== '' ?  undefined : this.asignadoA;
        if(this.asignadoA !== ''){
          this.asignadoA = undefined
        }
        // console.log('falsethis.asignadoA',this.listOfDocuments);
        this.buscarFiltro()
      }
  }
}
