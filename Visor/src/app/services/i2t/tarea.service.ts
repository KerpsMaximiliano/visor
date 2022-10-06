import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

constructor(private rest: RestService) { }

getTareasDeProyecto(id_caso: string) {
    let jsbody: string = JSON.stringify({
        par_modo : 'G',
        id_caso : id_caso,
        tipo_tarea : 'RelevamientoReq'
    });
    return this.rest.callProcedimientoVisor(jsbody, "TareasProyecto");
}

}