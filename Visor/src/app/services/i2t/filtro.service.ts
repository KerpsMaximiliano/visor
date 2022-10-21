import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

constructor(private _restService: RestService) { }

getUserId(userName: string) {
  return this._restService.callQueryVisor('users?user_name='+userName);
}

selectFiltro(user_id: string, modulo_busqueda: string) {
  let jsbody: string = JSON.stringify({
    par_modo : 'G',
    user_id: user_id,
    modulo_busqueda : modulo_busqueda
  });
  return this._restService.callProcedimientoVisor(jsbody, "ABMFiltros");
}

insertFiltro(
  user_id: string,
  modulo_busqueda: string,
  nombre: string,
  contenido: string,
  descripcion: string
  ) {
  let jsbody: string = JSON.stringify({
    par_modo : 'I',
    user_id : user_id,
    modulo_busqueda: modulo_busqueda,
    nombre: nombre,
    contenido : contenido,
    descripcion : descripcion
  });
  return this._restService.callProcedimientoVisor(jsbody, "ABMFiltros");
}

updateFiltro(search_id: string, contenido: string) {
  let jsbody: string = JSON.stringify({
    par_modo : 'U',
    saved_search_id : search_id,
    contenido : contenido
  });
  return this._restService.callProcedimientoVisor(jsbody, "ABMFiltros");
}

deleteFiltro(search_id: string) {
  let jsbody: string = JSON.stringify({
    par_modo : 'D',
    saved_search_id : search_id
  });
  return this._restService.callProcedimientoVisor(jsbody, "ABMFiltros");
}

}
