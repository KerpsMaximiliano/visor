import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SeccionDocumentosComponent } from '../../seccion-documentos.component';

@Component({
  selector: 'app-modal-baja-documentos',
  templateUrl: './modal-baja-documentos.component.html',
  styleUrls: ['./modal-baja-documentos.component.css']
})
export class ModalBajaDocumentosComponent implements OnInit {

  borrar!: Boolean;

  constructor(public dialog: MatDialogRef<SeccionDocumentosComponent>) { }

  ngOnInit(): void {
  }

  borrarDocumento(){
    this.borrar = true;
    this.dialog.close(this.borrar);
  }

  noBorrarDocumento(){
    this.borrar = false;
    this.dialog.close(this.borrar);
  }

}
