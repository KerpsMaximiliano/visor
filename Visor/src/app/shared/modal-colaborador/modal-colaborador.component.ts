import { Component, OnInit } from '@angular/core';
import { UsuarioRol } from 'src/app/interfaces/usuario-rol';
import { UsuarioService } from 'src/app/services/i2t/usuario-rol.service';

@Component({
  selector: 'app-modal-colaborador',
  templateUrl: './modal-colaborador.component.html',
  styleUrls: ['./modal-colaborador.component.css']
})
export class ModalColaboradorComponent implements OnInit {

  usuarios: UsuarioRol[] = [];
  arrayBack: UsuarioRol[] = [];
  privilegio: boolean = false;

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarios = this._usuarioService.getUsuarios();
    this.arrayBack = this.usuarios;
    console.log('USUARIOS',this.usuarios);
    console.log('ARRAY bACK',this.arrayBack);

    this._usuarioService.verificarUsuario('F001', localStorage.getItem('usuario')!).subscribe((response: any) => {
      if (response.returnset[0].RCode == 200) {
        this.privilegio = true;
      }
    });
    console.log('USUARIOS',this.usuarios);
    console.log('ARRAY bACK',this.arrayBack);
  }


}
