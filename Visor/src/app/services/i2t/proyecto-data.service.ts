import { Injectable } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';
import { TareaService } from './tarea.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoDataService {

  private _fechaActual: Date;
  public tareasPorcentajeTareasCompleatadas: number;
  public tareasPorcentajeTareasAtrasadas: number;
  public tareasPorcentajeTareasEnProgreso: number;

  constructor(private tareaService: TareaService, private restService: RestService) { 
    this._fechaActual = new Date(Date.now());
    this.tareasPorcentajeTareasAtrasadas = 0;
    this.tareasPorcentajeTareasCompleatadas = 0;
    this.tareasPorcentajeTareasEnProgreso = 0;
  }

  public getProyectos() {
    let jsbody = {
      'nivel': "1",
      'id_caso':"d31cfdaa-049e-e6e3-999d-62b5b2f778b7"
    };
    return this.restService.requestPost(jsbody,"EstadoProyectos");
  }
}