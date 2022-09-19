import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioRol } from 'src/app/interfaces/usuario-rol';
import { DialogService } from 'src/app/services/i2t/dialog.service';
import { UsuarioService } from 'src/app/services/i2t/usuario-rol.service';

@Component({
  selector: 'app-roles-usuarios',
  templateUrl: './roles-usuarios.component.html',
  styleUrls: ['./roles-usuarios.component.css']
})
export class RolesUsuariosComponent implements OnInit {

  usuarios: UsuarioRol[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['usuario', 'nombre', 'rol'];
  roles: any[] = [];
  rolesFaltantes: any[] = [];
  tempArray: any[] = [];
  newArray: any[] = [];
  arrayBack: any[] = [];
  auxUser: any;
  auxEvent: any;

  constructor(private _usuarioService: UsuarioService,
              private dialogService: DialogService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuarios = this._usuarioService.getUsuarios();
    this.arrayBack = this._usuarioService.getUsuarios();
    this.ordenAlfabetico(this.usuarios);
    this.ordenAlfabetico(this.arrayBack);
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.roles = this._usuarioService.getRoles();
    this.roles.forEach(rol => { rol.check = true; });
    console.log(this._usuarioService.getUsuariosPostman());
    console.log(this._usuarioService.get());
  }

  ordenAlfabetico(lista: Array<UsuarioRol>) {
    lista.sort(function(a, b) {
      if (a.usuario > b.usuario) {
        return 1;
      }
      if (a.usuario < b.usuario) {
        return -1;
      }
      return 0;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  marcarCheckbox(event: any) {
    this.auxEvent = event;
    if (event.checked) {
      this.roles.forEach(rol => {
        if (rol.nombre == event.source.value) {
          rol.check = true;
        }});
      this.tempArray = this.arrayBack.filter((e: any) => e.rol == event.source.value);
      this.filtrarRoles();
    } else {
      this.roles.forEach(rol => {
        if (rol.nombre == event.source.value) {
          rol.check = false;
        }});
      this.tempArray = this.usuarios.filter((e: any) => e.rol != event.source.value);
      this.newArray = [];
      this.filtrarRoles();
    }

    this.dataSource = new MatTableDataSource(this.usuarios);
}

filtrarRoles() {
  this.usuarios = [];
  this.newArray.push(this.tempArray);
  this.newArray.forEach(element => {
    let firstArray = element;
    for (let i=0;i<firstArray.length;i++) {
      let obj = firstArray[i];
      this.usuarios.push(obj);
      this.dataSource = new MatTableDataSource(this.usuarios);
    }
  });
}

  getRolesDisponibles(usuario: any) {
    this.auxUser = usuario;
    this.rolesFaltantes = [ 'Administrador', 'Supervisor', 'Operativo' ];
    let aux = -1;
    this.rolesFaltantes.forEach(x => {
      aux++;
      if (x == usuario.rol) {
        this.rolesFaltantes.splice(aux, 1);
      }
    });
  }

  cambiarRol(rolCambio: any) {
    this.dialogService.openConfirmDialog(
      '¿Está seguro de que desea cambiar el rol de este usuario?'
      ).afterClosed().subscribe(res => {
        if (res) {
          if (rolCambio != 'Administrador') {
            let contador = 0;
            this.usuarios.forEach(user => {
              if (user.rol == 'Administrador') {
                contador++;
              }
            });
            if (contador == 1 && this.auxUser.rol == 'Administrador') {
              this.mensajeCambio('No se pudo cambiar el rol (Debe haber 1 Administrador)');
            } else {
              this.cambioExitoso(rolCambio);
            }
          } else {
            this.cambioExitoso(rolCambio);
          }
          let input = document.querySelector('input');
          if (input != null) {
            input.value = "";
          }
          this.ngOnInit();
        }
    })
  }

  cambioExitoso(rolCambio: string) {
    this.usuarios.forEach(user => {
      if (user.id == this.auxUser.id) {
        user.rol = rolCambio;
        this.dataSource = new MatTableDataSource(this.usuarios);
      }
    });
    this.mensajeCambio('El cambio de rol fue realizado con éxito');
  }

  mensajeCambio(msj: string) {
    this._snackBar.open(msj,'',{
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition:  'bottom'
    })
  }

}