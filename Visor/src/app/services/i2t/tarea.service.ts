import { UnaryOperator } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InicioEstadoModule } from 'src/app/componentes/inicio-estado-proyecto/inicio-estado.module';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

    asignadasAmi: string = '';
    
    constructor(private rest: RestService) { }
    unProyecto: any;

  private enviarProjectSubject = new Subject<any>();
  enviarProjectObservable = this.enviarProjectSubject.asObservable();
  

  enviarProyectoActual(unProyecto: any){
    this.unProyecto = unProyecto;
    this.enviarProjectSubject.next(unProyecto);
   }
   
   getProyectoActual(){
    return this.unProyecto;
   }   

   enviarCambio(){
    this.unProyecto = this.getProyectoActual();
    this.enviarProyectoActual(this.unProyecto);
   }
   
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