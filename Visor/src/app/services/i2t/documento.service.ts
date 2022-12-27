import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private rest: RestService) {}

  public getDocumentos() {
    let jsbody: string = JSON.stringify({
      "par_modo": "G",
    });
    return this.rest.callProcedimientoVisor(jsbody,"ABMDocumentos");
  }

  public ABMDocumento(jsbody: string){
    return this.rest.callProcedimientoVisor(jsbody,"ABMDocumentos");
  }
}
