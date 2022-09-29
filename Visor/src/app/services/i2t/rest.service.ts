import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, throwError } from "rxjs";
// import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';


import { Config } from './config.service';
import { SnackbarService } from 'src/app/services/util/snackbar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  preUrl: string;
  urlPost: string = "http://tstvar.i2tsa.com.ar:3001/api/";
  token: any = localStorage.getItem('auth_token');


  constructor(
    private http: HttpClient,
    private config: Config,
    private snackBar: SnackbarService,
  ){
    this.preUrl = environment.baseUrl;
  }


  /** Caso especial para login(), no requiere token **/
  doLogin(body: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //let query = "login/";
    //let url = this.preUrl + query;
    return this.http.post( this.preUrl + 'login/', body, { headers } );
  }


  /** Wrapper para manejo de errores http y rcode **/
  callLogin(body: string, showSnack: boolean = true){
    let result = this.doLogin(body)
    .pipe(catchError( (e: any) => {
        this.snackBar.restException(e);
        return throwError(() => new Error('RTxt: ' + e.message))
        
        // throwError({RTxt: e.message});
      }))
      .pipe(map(
        (data: any) => {
          if (data.returnset[0].RCode == 1){
            return data;
          }
          else{
            if (showSnack)
              this.snackBar.restError(data.returnset[0]);
            throw data.returnset[0];
          }
        }));

    return result;
  }

  

  /** El webservice ejecuta un SP **/
  doProcedimientoVisor(body: string, query: string){
    let token = localStorage.getItem('auth_token')!; //con el ! le digo a typescript que token nunca va a ser nulo o vacio, ojo! asegurar este comportamiento sino buscar otra forma
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    let url = this.preUrl + 'api/proc/' + query;
    return this.http.post(url, body, { headers });
  }

  doQueryVisor(query: string){
    let token = localStorage.getItem('auth_token')!; //con el ! le digo a typescript que token nunca va a ser nulo o vacio, ojo! asegurar este comportamiento sino buscar otra forma
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

     let url = this.preUrl + 'api/' + query;
    return this.http.get(url, { headers });
  }

  /** Wrapper para manejo de errores http y rcode **/
  callProcedimientoVisor(body: string, query: string, showSnack: boolean = true){
    let result = this.doProcedimientoVisor(body, query)
    .pipe(catchError( (e: any) => {
        this.snackBar.restException(e);
        return throwError({RTxt: e.message});
      }))
      .pipe(map(
        (data: any) => {
          if (data.returnset[0].RCode == 1){
            return data;
          }
          else{
            if (showSnack)
              this.snackBar.restError(data.returnset[0]);
            throw data.returnset[0];
          }
        }));
    return result;
  }

  /** Wrapper para manejo de errores http y rcode **/
  callQueryVisor(query: string, showSnack: boolean = true){
    let result = this.doQueryVisor(query)
    .pipe(catchError( (e: any) => {
        this.snackBar.restException(e);
        return throwError({RTxt: e.message});
      }))
      .pipe(map(
        (data: any) => {
          if (data.returnset[0].RCode == 1){
            return data;
          }
          else{
            if (showSnack)
              this.snackBar.restError(data.returnset[0]);
            throw data.returnset[0];
          }
        }));
    return result;
  }

  // callProcedimientoSinManejoErrorExt(body: string, query: string, showSnack: boolean = true){
  //   let result = this.doProcedimientoExt(body, query);
  //   return result;
  // }
}
