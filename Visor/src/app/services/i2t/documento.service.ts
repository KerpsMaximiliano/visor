import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private rest: RestService) {}

  // public getDocumentos() {
  //   let jsbody: string = JSON.stringify({
  //     par_modo: "G"
  //   });
  //   return this.rest.callProcedimientoVisor(jsbody,"ABMDocumentos");
  // }

  public getDocumento(nombreDocumento:String) {
    let jsbody: string = JSON.stringify({
      par_modo: "G",
      pDocument_name:nombreDocumento
    });
    return this.rest.callProcedimientoVisor(jsbody,"ABMDocumentos");
  }

  public getDocumentosFiltro(numeroProyecto?: String,nombreProyecto?:String,categoria?:string,tipoDocumento?:String,usuarioAsignado?:String,estado?:String,fechaActivoInicio?:String,fechaActivoFin?:String,fechaExpiraInicio?:String,fechaExpiraFin?:String) {
    // console.log('categoriaservicio',categoria);
    
     let jsbody: string = JSON.stringify({
       par_modo: "G",
       pID_CASE:numeroProyecto,
       pCase_name:nombreProyecto,
       pCat:categoria,
       ptipo:tipoDocumento,
       pStatus_id:estado,
       pAssigned_user_id:usuarioAsignado,
       pActive_date_in:fechaActivoInicio,
       pActive_date_end:fechaActivoFin,
       pExp_date_in:fechaExpiraInicio,
       pExp_date_end:fechaExpiraFin
     });

     return this.rest.callProcedimientoVisor(jsbody,"ABMDocumentos");
   }

   public getIdUsuario(nombre_usuario?:string) {
     let jsbody: string = JSON.stringify({
       par_modo: "G",
       nombre_usuario:nombre_usuario
     });
     return this.rest.callProcedimientoVisor(jsbody,"ObtenerIDUsuario");
   }
}
