import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor( private _restService: RestService) { }

  public getUsuarios(){
    let jsbody : string = JSON.stringify({
      nivel: "1"
    })
    return this._restService.callProcedimientoVisor(jsbody, "SeccionEquipo");
  }

  public getTareasPorTecnologia(id: string){
    let jsbody : string = JSON.stringify({
      nivel: "3",
      users_id: id
    })
    return this._restService.callProcedimientoVisor(jsbody, "SeccionEquipo");
  }

  public getProyectosAnteriores(){
    let jsbody : string = JSON.stringify({
      nivel: "4"
    })
    return this._restService.callProcedimientoVisor(jsbody, "SeccionEquipo");
  }
}
