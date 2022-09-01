import { Injectable } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarios: Usuario[] = [
    {
      id: 1,
      usuario: "igirod",
      password: "1234"
    },
    {
      id: 0,
      usuario: "admin",
      password: "1q2w"
    }
  ];

   verificarCredenciales(nombreUsuario: string, password: string): any{
    for(let x = 0; x < this.usuarios.length;x++){
      if(nombreUsuario == this.usuarios[x].usuario && password == this.usuarios[x].password)
      {
        return 1;
      }
      else if(nombreUsuario == this.usuarios[x].usuario && password != this.usuarios[x].password){
        return 3;
      }
      else if(nombreUsuario != this.usuarios[x].usuario && password == this.usuarios[x].password){
        return 4;
      }
      else if(nombreUsuario == "" && password == ""){
        return 5;
      }
      else{
        return 2;
      }
    }
   }
}
