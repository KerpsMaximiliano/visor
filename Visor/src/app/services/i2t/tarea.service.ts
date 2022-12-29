import { UnaryOperator } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tarea } from 'src/app/interfaces/tarea';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

    asignadasAmi: string = '';
    
    unProyecto: any;
    private enviarProjectSubject = new Subject<any>();
    enviarProjectObservable = this.enviarProjectSubject.asObservable();

    mensaje!:string ;
    private enviarMensajeSubject = new Subject<string>();
    enviarMensajeObservable = this.enviarMensajeSubject.asObservable();


    private enviarBooleanActividadSubject = new Subject<any>();
    enviarBooleanActividadObservable = this.enviarBooleanActividadSubject.asObservable();

    indexPanel!: number;
    private enviarIndexPanelSubject = new Subject<number>();
    enviarIndexPanelObservable = this.enviarIndexPanelSubject.asObservable();
    
    constructor(private rest: RestService) { }
    
    listaTareas: Tarea[] = [];
    idTarea: any;
  

  enviarProyectoActual(unProyecto: any){
    this.unProyecto = unProyecto;
    this.enviarProjectSubject.next(unProyecto);
   }
   
   getProyectoActual(){
    return this.unProyecto;
   }   
   enviarIdTareaAct(idTarea:any){
    this.idTarea = idTarea;
   }

   enviarCambio(){
    this.unProyecto = this.getProyectoActual();
    this.enviarProyectoActual(this.unProyecto);
   }

   enviarIndexPanel(indexPanel: number){
    this.indexPanel = indexPanel;
    this.enviarIndexPanelSubject.next(indexPanel);
   }


   enviarMensaje(mensaje: string){
    this.mensaje = mensaje;
    this.enviarMensajeSubject.next(mensaje);
   }
   
    getTareasDeProyecto(id_caso: string) {
        let jsbody: string = JSON.stringify({
            par_modo: 'G',
            id_caso: id_caso
        });
        return this.rest.callProcedimientoVisor(jsbody, "TareasProyecto");
    }

   

    getABMproyectoService(nombreProyecto?:string) {
        let endPoint = 'AbmProyectos';
        let jsbody: string = JSON.stringify({
            par_modo: 'G',
            par_nomProy:nombreProyecto
        });
        return this.rest.getABMproyectoRest(jsbody, endPoint);
    }


}