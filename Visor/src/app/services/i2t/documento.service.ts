import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private rest: RestService) {}

  public getDocumentos() {
    let jsbody: string = JSON.stringify({
      "par_modo": "G"
    });
    return this.rest.callProcedimientoVisor(jsbody,"SeccionDocumento");
  }

  public addDocumento(body: string){
    return this.rest.callProcedimientoVisor(body,"SP_VISOR_ABM_DOCUMENTOS");
  }
}
