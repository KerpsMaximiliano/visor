import { Component, OnInit } from '@angular/core';
import { FiltroService } from '../../services/i2t/filtro.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFiltroDocumentosComponent } from '../../shared/modal-filtro-documentos/modal-filtro-documentos.component';
import { Documento } from '../../interfaces/documento';

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

  listOfDocuments: Documento[];
  page!: number; 
  estado: boolean = false;

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

  constructor(private _filtroService: FiltroService, public dialog: MatDialog) {
  
    this.listOfDocuments = [
      {
        name: "aa",
        type: "Identificación de necesidades",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "BB",
        type: "Sprint Backlog",
        assigned: "Patricio Macagno",
        documentStatus: "Eliminado",
        date: "11/02/2022",
        finishedDate: "12/02/2023",
        category: "General" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "CC",
        type: "Propuesta funcional",
        assigned: "Patricio Macagno",
        documentStatus: "Borrador",
        date: "11/03/2022",
        finishedDate: "12/02/2023",
        category: "Diseño" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/04/2022",
        finishedDate: "12/02/2023",
        category: "Desarrollo" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Mantenimiento" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Testing" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Ventas" //Determina el aspecto de la tarjeta. 
      }
    ];
  }

  ngOnInit(): void {
  }

  /**
   * Este método se utiliza para abrir el dialog del filtro.
   */
  openFilter(){
    const dialogRef = this.dialog.open(ModalFiltroDocumentosComponent, {width: '40%', height: '90%'});
  }

  /**
   * Este método se utiliza para disparar el evento que contiene el orden seleccionado para los documentos.
   * 
   * @param e Event
   */
  shotOrder(e: Event){
    this.ordenSeleccion = (e.target as HTMLElement).innerText;
    this.changeOrder();
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
}
