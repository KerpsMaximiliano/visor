import { Component, OnInit } from '@angular/core';
import { Document } from './Class/document';

@Component({
  selector: 'app-modal-filtro-documentos',
  templateUrl: './modal-filtro-documentos.component.html',
  styleUrls: ['./modal-filtro-documentos.component.css']
})
export class ModalFiltroDocumentosComponent implements OnInit {

  //Variables de clase.
  categorys: string[];
  types: string[];  
  conditions: string[];

  constructor(public documentInstance: Document) {
    //Utilizan una instancia de la clase Documents para acceder a la información contenida.
    this.categorys = this.documentInstance.categorys;
    this.types = this.documentInstance.typeOfDocuments;
    this.conditions = this.documentInstance.conditions;
   }

  ngOnInit(): void {
  }

}
