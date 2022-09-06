import { Injectable } from '@angular/core';
import { Colaborador } from 'src/app/interfaces/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  orden: any[] = [
    { id: 1, nombre: 'Alfabético' },
    { id: 2, nombre: 'Tiempo Disponible' }
  ];

  colaboradores: Colaborador[] = [
    { id: 1, nombre: 'Facundo', apellido: 'Ghio Serra' },
    { id: 2, nombre: 'Patricio', apellido: 'Macagno' },
    { id: 3, nombre: 'Gian', apellido: 'Laner' },
    { id: 4, nombre: 'Franco', apellido: 'Friggeri' },
    { id: 5, nombre: 'Franco', apellido: 'Corvalan' },
    { id: 6, nombre: 'Jeremias', apellido: 'Garcia' },
    { id: 7, nombre: 'Ignacio', apellido: 'Girod' },
    { id: 8, nombre: 'Fabio', apellido: 'Olivera' },
    { id: 9, nombre: 'Augusto', apellido: 'Escandon' },
    { id: 10, nombre: 'Federico', apellido: 'Gauchat' },
    { id: 11, nombre: 'Franco', apellido: 'Caldaroni' },
    { id: 12, nombre: 'Luciano', apellido: 'De Giorgio' },
    { id: 13, nombre: 'Lucio', apellido: 'Cocuccio' },
    { id: 14, nombre: 'Pablo', apellido: 'Corujo' },
    { id: 15, nombre: 'Leandro', apellido: 'Blodorn' },
    { id: 16, nombre: 'Maximiliano', apellido: 'Reichert' },
    { id: 17, nombre: 'Lucas', apellido: 'Rios' }

  ];

  tareasPlanificacion: any[] = [
    { id:1, 9: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:2, 9: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:3, 9: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:4, 9: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:5, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:6, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:7, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:8, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:9, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:10, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:11, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:12, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:13, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:14, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:15, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:16, 9: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:17, 9: 100, octubre: 70, noviembre: 18, diciembre: 5 },
  ];
  
  getOrden() {
    return this.orden;
  }

  getColaboradores() {
    return this.colaboradores;
  }

  // getTareasUsuario(idUsuario, cantMeses) { hsPlan, estado }
  asdasd(idUser: number, mesInicio: Date, mesFin: Date) {
    console.log(this.tareasPlanificacion[idUser-1]);
  }

  getHorasPlanificadas(idUser: number, mesInicio: Date, mesFin: Date) {
    return mesFin.getMonth() - mesInicio.getMonth() + (12 * (mesFin.getFullYear() - mesInicio.getFullYear()))
  }
    /* if (mesFin-mesInicio == 0) {
      this.tareasPlanificacion[idUser-1];
    } */
}