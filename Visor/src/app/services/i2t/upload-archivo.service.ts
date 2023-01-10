import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadArchivoService {

  ruta = "/var/www/varios/i2t/e-servicios/suitecrm3/upload";

  constructor(private http: HttpClient) { }

  subirArchivo(nombre: string, archivo: File): Observable<any>{

    console.log("SE INTENTA SUBIR EL ARCHIVO")
    let token = localStorage.getItem('auth_token')!;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    const formData = new FormData();

    formData.append(nombre, archivo, archivo.name);

    return this.http.post(this.ruta, formData, {headers});
  }
}
