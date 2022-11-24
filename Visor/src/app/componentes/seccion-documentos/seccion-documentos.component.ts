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
export class SeccionDocumentosComponent implements OnInit {

  //Variables del filtro
  orden = ['Nombre', 'Fecha'];
  ordenSeleccion = 'Nombre';
  orden_saved_search_id = '';
  modal_saved_search_id = '';

  //Variables de información.
  listOfDocuments: Documento[];
  page!: number; 

  constructor(private _filtroService: FiltroService, public dialog: MatDialog) {
    this.listOfDocuments = [
      {
        name: "actaspj.txt",
        type: "Identificación de necesidades",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/20222323",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "CAS - BOLD - SPRINTBACKLOG.txt",
        type: "Sprint Backlog",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "CHANOIER.txt",
        type: "Propuesta funcional",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      }
      ,
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      }
      ,
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      }
      ,
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "CAS - BOLD - SPRINTBACKLOG.txt",
        type: "Sprint Backlog",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "CAS - BOLD - SPRINTBACKLOG.txt",
        type: "Sprint Backlog",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Plan de Proyecto",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/2022",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Identificación de necesidades",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/20222323",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Identificación de necesidades",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/20222323",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Identificación de necesidades",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/20222323",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      },
      {
        name: "actaspj.txt",
        type: "Identificación de necesidades",
        assigned: "Patricio Macagno",
        documentStatus: "Publicado",
        date: "11/01/20222323",
        finishedDate: "12/02/2023",
        category: "Implementación" //Determina el aspecto de la tarjeta. 
      }
    ];
  }

  ngOnInit(): void {
  }

  /**
   * Método que abre el dialog del filtro.
   */
  openFilter(){
    const dialogRef = this.dialog.open(ModalFiltroDocumentosComponent, {width: '40%', height: '90%'});
  }

  shotOrder(e: Event){
    this.ordenSeleccion = (e.target as HTMLElement).innerText;
    const contenido: string = JSON.stringify({ ordenSeleccion : this.ordenSeleccion });
    const encodedData = btoa(contenido);
    if (this.orden_saved_search_id == '') {
      this._filtroService.insertFiltro(
        localStorage.getItem('userId')!,
        'inicio-estado-proyecto',
        'filtro_orden',
        encodedData,
        'Filtra los colaboradores por orden alfabetico, tareas atrasadas o tareas a tiempo').subscribe((rsp: any) => {
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

  changeOrder(){
  /*  if(this.ordenSeleccion == 'Alfabetico') {
      this.proyectos.sort(function(a, b) {
        console.log("Ordeno por alfabeto");
        if(a.nombre > b.nombre){
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
    } */
  }

  /**
   * Este método sirve para editar un documento.
   */
  editDocument(){

  }

  /**
   * Este método sirve para eliminar un documento.
   */
  removeDocument(){}

  /**
   * Este método sirve para descargar un documento.
   */
  donwloadDocument(){
    
  }

  isPlan(d: Documento): boolean{
    if(d.type == "Plan de Proyecto"){
      console.log("True")
      return true;
    }
    else{
      console.log("Falso")
      return false;
    }
  }

  isSprintBacklog(d: Documento): boolean{
    if(d.type == "Sprint Backlog"){
      console.log("True")
      return true;
    }
    else{
      console.log("Falso")
      return false;
    }
  }

  isIdentificacionDeNecesidades(d: Documento): boolean{
    if(d.type == "Identificación de necesidades"){
      console.log("True")
      return true;
    }
    else{
      console.log("Falso")
      return false;
    }
  }

  isPropuestaFuncional(d: Documento): boolean{
    if(d.type == "Propuesta funcional"){
      console.log("True")
      return true;
    }
    else{
      console.log("Falso")
      return false;
    }
  }



}
