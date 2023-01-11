import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadArchivoService {

  ruta = "http://10.20.8.25/var/www/varios/i2t/e-servicios/suitecrm3/upload";

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

    return this.http.post(this.ruta, JSON.stringify(formData), {headers});

    // Trata de subir el archivo a http://localhost:4200/var/www/varios/i2t/e-servicios/suitecrm3/upload si le paso la ruta var/www/varios/i2t/e-servicios/suitecrm3/upload

    // Pasando como url http://10.20.8.25/var/www/varios/i2t/e-servicios/suitecrm3/upload tira error:
    /* Access to XMLHttpRequest at 'http://10.20.8.25/var/www/varios/i2t/e-servicios/suitecrm3/upload' from origin 'http://localhost:4200' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. */ 
  }
}
