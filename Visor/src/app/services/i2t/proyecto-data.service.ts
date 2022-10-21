import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoDataService {

  public tareasPorcentajeTareasCompleatadas: number;
  public tareasPorcentajeTareasAtrasadas: number;
  public tareasPorcentajeTareasEnProgreso: number;

  constructor(private restService: RestService) { 
    this.tareasPorcentajeTareasAtrasadas = 0;
    this.tareasPorcentajeTareasCompleatadas = 0;
    this.tareasPorcentajeTareasEnProgreso = 0;
  }

  public getProyectos() {
    let jsbody: string = JSON.stringify({
        "nivel":"1",
        "id_caso": "",
        "id_usuario": null,
        "abierto": "FALSE"
    });
    return this.restService.callProcedimientoVisor(jsbody,"EstadoProyectos");
  }

  public getProyectosAbiertos(){
    let jsbody: string = JSON.stringify({
      "nivel":"1",
      "id_caso": "",
      "id_usuario": null,
      "abierto": "TRUE"
  });
  return this.restService.callProcedimientoVisor(jsbody,"EstadoProyectos");
}
  public getPorcentajeHP(id_caso: string) {
    let jsbody: string = JSON.stringify({
      "nivel":"2",
      "id_caso": id_caso,
      "id_usuario": null,
      "abierto": "FALSE"
    });
    return this.restService.callProcedimientoVisor(jsbody,"EstadoProyectos");
  }

  public getPorcentajeHPAreas(id_caso: string) {
    let jsbody: string = JSON.stringify({
      "nivel":"3",
      "id_caso": id_caso,
      "id_usuario": null,
      "abierto": "FALSE"
    });
    return this.restService.callProcedimientoVisor(jsbody,"EstadoProyectos");
  }
}