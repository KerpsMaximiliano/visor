import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentoService } from 'src/app/services/i2t/documento.service';
import { SeccionDocumentosComponent } from '../seccion-documentos.component';

@Component({
  selector: 'app-modal-baja-documentos',
  templateUrl: './modal-baja-documentos.component.html',
  styleUrls: ['./modal-baja-documentos.component.css']
})
export class ModalBajaDocumentosComponent implements OnInit {

  constructor(public dialog: MatDialogRef<SeccionDocumentosComponent>, public _documentService: DocumentoService,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  borrarDocumento(){

    let jsbody: string = JSON.stringify({
      "par_modo": "D",
      "pID_DOCUMENTO" : this.data.id
    });

    console.log("Se deberia borrar el documento de id: "+this.data.id)
    console.log(jsbody)

    this._documentService.ABMDocumento(jsbody).subscribe( respuesta =>{ //es necesario el subscribe porque sino no espera a que se ejecute la query
      this.dialog.close();
      window.location.reload();
    });
  }

}
