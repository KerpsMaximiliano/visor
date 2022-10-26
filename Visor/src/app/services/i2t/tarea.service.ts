import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

    asignadasAmi: string = '';
    
    constructor(private rest: RestService) { }


    

    getTareasDeProyecto(id_caso: string) {
        let jsbody: string = JSON.stringify({
            par_modo: 'G',
            id_caso: id_caso
        });
        return this.rest.callProcedimientoVisor(jsbody, "TareasProyecto");
    }

   

    getABMproyectoService() {
        let endPoint = 'AbmProyectos';
        let jsbody: string = JSON.stringify({
            par_modo: 'G'
        });
        return this.rest.getABMproyectoRest(jsbody, endPoint);
    }


}