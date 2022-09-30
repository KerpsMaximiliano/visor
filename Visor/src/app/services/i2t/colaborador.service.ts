import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private rest: RestService) { }

  disponibilidadUsuario(nivel: number, cant_meses: number, fecha: string) {
    let jsbody: string = JSON.stringify({
      nivel : nivel,
      cant_meses : cant_meses,
      fecha_fin : fecha
    });
    return this.rest.callProcedimientoVisor(jsbody, "DisponibilidadUsuario");
  }

  getMesString(fecha: number) {
    if (fecha>11) {
      fecha -= 12;
    }
    switch (fecha) {
      case 0:
        return 'Enero';
      case 1:
        return 'Febrero';
      case 2:
        return 'Marzo';
      case 3:
        return 'Abril';
      case 4:
        return 'Mayo';
      case 5:
        return 'Junio';
      case 6:
        return 'Julio';
      case 7:
        return 'Agosto';
      case 8:
        return 'Septiembre';
      case 9:
        return 'Octubre';
      case 10:
        return 'Noviembre';
      case 11:
        return 'Diciembre';
      default:
        return '';
    }
  }

  getMesDate(mes: string) {
    switch (mes) {
      case 'Enero':
        return 0;
      case 'Febrero':
        return 1;
      case 'Marzo':
        return 2;
      case 'Abril':
        return 3;
      case 'Mayo':
        return 4;
      case 'Junio':
        return 5;
      case 'Julio':
        return 6;
      case 'Agosto':
        return 7;
      case 'Septiembre':
        return 8;
      case 'Octubre':
        return 9;
      case 'Noviembre':
        return 10;
      case 'Diciembre':
        return 11;
      default:
        return -1;
    }
  }

}