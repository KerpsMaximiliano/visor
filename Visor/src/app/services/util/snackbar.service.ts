import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

/** Provee funciones para mostrar mensajes al usuario y al desarrollador
 **/
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  /** Error de comunicacion (excepciones) contra la api rest **/
  restException(err: any){
    console.log('%c REST Error ', 'background: #f00; color: #fff', err.message);
  }

  /** Mensajes comunes **/
  message(msg: any){
    this.snackBar.open(msg, "Cerrar", {
      duration: 3000,
    });
  }

  /** Errores esperables de la api rest **/
  restError(response: any){
    this.message(response.RTxt);
    console.log('%c Fallo ', 'background: #b60; color: #fff', response.RTxt);
  }
}
