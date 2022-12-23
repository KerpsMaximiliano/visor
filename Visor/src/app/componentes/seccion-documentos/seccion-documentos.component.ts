import { Component, OnInit } from '@angular/core';
import { FiltroService } from '../../services/i2t/filtro.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFiltroDocumentosComponent } from '../../shared/modal-filtro-documentos/modal-filtro-documentos.component';
import { Documento } from '../../interfaces/documento';
import { DocumentoService } from '../../services/i2t/documento.service';
import { ModalDocumentosComponent } from './modal-documentos/modal-documentos/modal-documentos.component';
import { ModalBajaDocumentosComponent } from './modal-baja-documentos/modal-baja-documentos/modal-baja-documentos.component';
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
  numero: string = "";
  nombre: string = "";
  asignadoA: string = "";
  categoria: string = "";
  tipo: string = "";
  estadoDocumento: string = "";
  fechaDePublicacion: string = "";
  fechaDeCaducidad: string = "";
  inputIzq: string = "";

  listOfDocuments: Documento[];
  page!: number; 
  estado: boolean = false;
  arrayDocuments: any;
  buttonOn: boolean = false;

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
    this.listOfDocuments = [];
  }

  ngOnInit(): void {
    this._filtroService.getUserId(localStorage.getItem('usuario')!).subscribe((response: any) => {
      localStorage.setItem('userId', response.dataset[0].id);
      this._filtroService.selectFiltro(response.dataset[0].id, 'documentos').subscribe((resp: any) => {
        if (resp.dataset.length == 0 ) {
        } else {
          console.log('hay datos', resp);
          resp.dataset.forEach((filtro: any) => {
            if (filtro.nombre == 'filtro_orden') {
              this.orden_saved_search_id = filtro.saved_search_id;
              const contenido = JSON.parse(atob(filtro.contenido));
              this.ordenSeleccion = contenido.ordenSeleccion; 
            }
            if (filtro.nombre == 'filtro_numero_nombre_tipo_asignadoA_estado_categoria_fechaPublicacion_fechaCaducidad') {
              this.modal_saved_search_id = filtro.saved_search_id;
              const contenido = JSON.parse(atob(filtro.contenido));
              this.numero = contenido.nombre;
              this.nombre = contenido.nombre;
              this.estado = contenido.estado;
              this.tipo = contenido.tipo;
              this.asignadoA = contenido.asignadoA;
              this.fechaDePublicacion = this.fechaDePublicacion;
              this.fechaDeCaducidad = this.fechaDeCaducidad;
            }
          })
        };
        this.getDocuments();
        this.startFilter();
      });
    });
  }

  /**
   * Método que obtiene los documentos a traves del servicio.
   * 
   */
  getDocuments(): void{
    this.documentService.getDocumentos().subscribe(result => {
      this.arrayDocuments = result;
      for(let i = 0;i<result.dataset.length;i++)
      {
        let document: Documento = {
          id: result.dataset[i].id,
          name: result.dataset[i].name,
          assigned: result.dataset[i].user_name,
          category: result.dataset[i].category,
          type: result.dataset[i].type,
          documentStatus: result.dataset[i].status,
          date: result.dataset[i].actived_date,
          finishedDate: result.dataset[i].exp_date
        };
        this.listOfDocuments.push(document); //Array que almacena los proyectos con sus respectivos datos.
      }
      this.arrayDocuments = this.listOfDocuments;
      });
  }




  /**
   * Este método se utiliza para abrir el dialog del filtro y guarda la información ingresada.
   */
  openFilter(){
    const dialogRef = this.dialog.open(ModalFiltroDocumentosComponent, {
      width: '40%', 
      height: '90%',
      disableClose: true,
      data: { numero: this.numero, nombre: this.nombre, estado: this.estadoDocumento, asignadoA: this.asignadoA, tipo: this.tipo, categoria: this.categoria, fechaPublicacion: this.fechaDePublicacion, fechaCaducidad: this.fechaDeCaducidad, seleccion: this.ordenSeleccion, search_id: this.modal_saved_search_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.numero = result.numero;
      this.nombre = result.nombre;
      this.estadoDocumento = result.estado;
      this.asignadoA = result.asignadoA;
      this.tipo = result.tipo;
      this.categoria = result.categoria;
      this.fechaDePublicacion = result.fechaPublicacion;
      this.fechaDeCaducidad = result.fechaCaducidad;
      console.log(this.nombre);
      let filtrar = result.filtrar;
      if (result.limpiar) { this.inputIzq = '', filtrar = true }
      if (filtrar) {
      /*   this.prepararFiltro(); */
      }
    });
  }

  /**
   * Método que se encarga de obtener la respuesta filtrada para luego aplicarla.
   */
  startFilter(): void{
    const filtroNumero = this.filtroAvanzado(1, this.numero);
    const filtroNombre= this.filtroAvanzado(2, this.nombre);
    const filtroCategoria = this.filtroAvanzado(3, this.categoria);
    const filtroTipo = this.filtroAvanzado(4, this.tipo);
    const filtroEstado = this.filtroAvanzado(5, this.estadoDocumento);
    const filtroAsignadoa = this.filtroAvanzado(6, this.asignadoA);
    const filtroFechaPublicacion = this.filtroAvanzado(7, this.fechaDePublicacion);
    const filtroFechaCaducidad = this.filtroAvanzado(8, this.fechaDeCaducidad);
    this.listOfDocuments = this.buscarCoincidencias(filtroNumero, filtroNombre, filtroCategoria, filtroTipo, filtroEstado, filtroAsignadoa, filtroFechaPublicacion, filtroFechaCaducidad);
    /* this.aplicarFiltros(); */
  }

  /**
   * Método que busca coincidencias en base a la información proporcionada en las caracteristicas.
   * 
   * @param arrayNumero any
   * @param arrayNombre any
   * @param arrayCategoria any
   * @param arrayTipo any
   * @param arrayEstado any
   * @param arrayAsignadoA any
   * @param arrayFechaPublicacion any
   * @param arrayFechaCaducidad any
   * @returns ArrayList
   */
  buscarCoincidencias(arrayNumero: any, arrayNombre: any, arrayCategoria: any, arrayTipo: any, arrayEstado: any, arrayAsignadoA: any, arrayFechaPublicacion: any, arrayFechaCaducidad: any) {
    let encontrados: any = [];
    this.listOfDocuments.forEach(documento => {
      let encontradoNumero = false;
      let encontradoNombre = false;
      let encontradoCategoria = false;
      let encontradoTipo = false;
      let encontradoEstado = false;
      let encontradoAsignadoA = false;
      let encontradoFechaPublicacion = false;
      let encontradoFechaCaducidad = false;
      arrayNumero.forEach((element: any) => {
        if (element.id === documento.id) {
          encontradoNombre = true;
        }
      });
      arrayNombre.forEach((element: any) => {
        if (element.id === documento.id) {
          encontradoNumero = true;
        }
      });
      arrayCategoria.forEach((element: any) => {
        if (element.id === documento.id) {
          encontradoCategoria = true;
        }
      });
      arrayTipo.forEach((element: any) => {
        if (element.id === documento.id) {
          encontradoTipo = true;
        }
      });
      arrayAsignadoA.forEach((element: any) => {
        if (element.id === documento.id) {
          encontradoAsignadoA = true;
        }
      });
      arrayEstado.forEach((element: any) => {
        if (element.id === documento.id) {
          encontradoEstado = true;
        }
      });
      arrayFechaPublicacion.forEach((element: any) => {
        if (element.id === documento.id) {
          encontradoFechaPublicacion = true;
        }
      });
      arrayFechaCaducidad.forEach((element: any) => {
        if (element.id === documento.id) {
          encontradoFechaCaducidad = true;
        }
      });
      if (encontradoNumero && encontradoNombre && encontradoTipo && encontradoAsignadoA && encontradoCategoria && encontradoFechaPublicacion && encontradoFechaCaducidad && encontradoEstado) {
        encontrados.push(documento);
      }
    });
    return encontrados;
  }

  filtroAvanzado(tipo: number, valor: string) {
    let arrayTemp: any = [];
    let arrayTabla: any;
    switch (tipo) {
      case 1:
        this.listOfDocuments.forEach(documento => {
          let obj = { id: documento.id, numero: documento.id };
          arrayTemp.push(obj);
        });
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 2:
        this.listOfDocuments.forEach(documento => {
          let obj = { id: documento.id, nombre: documento.name };
          arrayTemp.push(obj);
        });
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 3:
        this.listOfDocuments.forEach(documento => {
          let obj = { id: documento.id, funcion: documento.category };
          arrayTemp.push(obj);
        });
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 4:
        this.listOfDocuments.forEach(documento => {
          let obj = { id: documento.id, funcion: documento.type };
          arrayTemp.push(obj);
        });
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 5:
        this.listOfDocuments.forEach(documento => {
          let obj = { id: documento.id, funcion: documento.documentStatus };
          arrayTemp.push(obj);
        });
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 6:
        this.listOfDocuments.forEach(documento => {
          let obj = { id: documento.id, funcion: documento.assigned };
          arrayTemp.push(obj);
        });
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 7:
        this.listOfDocuments.forEach(documento => {
          let obj = { id: documento.id, funcion: documento.date };
          arrayTemp.push(obj);
        });
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 8:
        this.listOfDocuments.forEach(documento => {
          let obj = { id: documento.id, funcion: documento.finishedDate };
          arrayTemp.push(obj);
        });
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
    }
  }

 /*  aplicarFiltros() {
    if (this.listOfDocuments.length == 0) {
      this.noHayDocumentos = true;
    } else if (this.colaboradores.length == 1) {
      this.noHayDocumentos = false;
      this.cambiarOrden();
    } else {
      this.noHayDocumentos = false;
      this.cambiarOrden();
    }
  } */
  


  /**
   * Este método se utiliza para disparar el evento que contiene el orden seleccionado para los documentos.
   * 
   * @param e Event
   */
  shotOrder(e: Event){
    this.ordenSeleccion = (e.target as HTMLElement).innerText;
    const contenido: string = JSON.stringify({ ordenSeleccion : this.ordenSeleccion });
    const encodedData = btoa(contenido);
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
        if(a.name < b.name){
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    }

    if(this.ordenSeleccion == 'Fecha') {
      this.listOfDocuments.sort(function(a, b) {
        if(a.date > b.date){
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        return 0;
      });
    }
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
    if(d.documentStatus == "Publicado"){
      return true;
    }
    else{
      return false;
    }
  }

  isBorrador(d: Documento): boolean{
    if(d.documentStatus == "Borrador"){
      return true;
    }
    else{
      return false;
    }
  }

  isEliminado(d: Documento): boolean{
    if(d.documentStatus == "Eliminado"){
      return true;
    }
    else{
      return false;
    }
  }

  showInformacion(){
    if(this.estado == false){
      this.estado = true;
    }
    else{
      this.estado = false
    }
  }

  /**
   * Método que sirve para filtrar los documentos y obtener los que están asignados al usuario logueado.
   *
   */
  filterByUser(){
    let userLocal: string | null = localStorage.getItem('usuario');
    let assignedToMe: Documento[] = [];
    if(this.buttonOn == false){
      this.buttonOn = true;
      for(let i=0;i<this.listOfDocuments.length;i++){
        if(this.listOfDocuments[i].assigned == userLocal){
          assignedToMe.push(this.listOfDocuments[i]);
        }
      }
      console.log("Activado")
      this.listOfDocuments = assignedToMe;
    }
    else{
      this.buttonOn = false;
      this.listOfDocuments = this.arrayDocuments;
      console.log("Desactivado")
    }
  }

  abrirABMDocumentos(): void{
    this.dialog.open(ModalDocumentosComponent, {
      width: '500px',
      height: '720px'
    });
  }

  abrirBajaDocumento(documento: Documento){
    const dialogRef = this.dialog.open(ModalBajaDocumentosComponent, {
      width: '400px',
      height: '200px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, documento.id);
      let jsbody: string = JSON.stringify({
        par_modo: "D",
        id : documento.id,
      });

      return this.documentService.ABMDocumento(jsbody);

    })
    
  }

  abrirEditarDocumento(documento: Documento){
    console.log(documento);
    this.dialog.open(ModalDocumentosComponent, {
      width: '500px',
      height: '720px',
      data: {
        nombre: documento.name,
        tipo: documento.type,
        estado: documento.type,
        fechaPublicacion: documento.date,
        fechaCaducidad: documento.finishedDate,
        asignadoA: documento.assigned        
      }
    });
  }
}

