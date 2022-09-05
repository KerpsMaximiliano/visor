import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _restService: RestService){
  }

  /**
   * Este método sirve para obtener el token de inicio de sesión 
   * utilizando el servicio rest.
   * 
   * @param usuarioRecibido: Usuario
   * @returns respuesta del servicio rest. 
   */
  obtenerToken(usuarioRecibido: Usuario){
    
    let body = {
      "usuario": usuarioRecibido.usuario,
      "pass": usuarioRecibido.password
    }
    return this._restService.doLogin(body);
  }
}
