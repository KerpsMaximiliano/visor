import { Injectable } from '@angular/core';
import { Actividad } from 'src/app/interfaces/actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  listActividades: Actividad[] = [
    {fecha: new Date('01/10/21'), horas: 5, descripcion:'Descri´cion para la Actividad 1' , asunto:'XXXX'},
    {fecha: new Date('01/10/21'), horas: 4, descripcion:'' ,asunto:'XXXX'},
    {fecha: new Date('02/10/21'), horas: 3, descripcion:'' ,asunto:'XXXX'},
    {fecha: new Date('03/10/21'), horas: 6, descripcion:'' ,asunto:'XXXX'},
    {fecha: new Date('04/10/21'), horas: 34, descripcion:'' ,asunto:'XXXX'},
    {fecha: new Date('05/10/21'), horas: 6, descripcion:'' ,asunto:'XXXX'},
    {fecha: new Date('06/10/21'), horas: 2, descripcion:'' ,asunto:'XXXX'},
    {fecha: new Date('07/10/21'), horas: 4, descripcion:'' ,asunto:'XXXX'},
    {fecha: new Date('08/10/21'), horas: 5, descripcion:'' ,asunto:'XXXX'},
    {fecha: new Date('09/10/21'), horas: 6, descripcion:'' ,asunto:'XXXX'},
  ];
  

  constructor() { }

  getActividad(){
    return this.listActividades.slice();
  }

  eliminarActividad(index: number){
    this.listActividades.splice(index, 1);
  }

  
}
