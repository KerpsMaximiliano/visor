
import { Component, Input, OnInit } from '@angular/core';
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
  tempArray: UsuarioRol[] = [];
  newArray: any[] = [];
  arrayBack: UsuarioRol[] = [];
  auxUser: any;
  auxEvent: any;
  privilegio: boolean = false;
  filtroLS: any;

  
  constructor(private _usuarioService: UsuarioService,
              private dialogService: DialogService,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.usuarios = this._usuarioService.getUsuarios();
    this.ordenAlfabetico(this.usuarios);
    this.arrayBack = this.usuarios;
    this.cargarTabla();
    this.getRoles();
    this._usuarioService.verificarUsuario('F001', localStorage.getItem('usuario')!).subscribe((response: any) => {
      if (response.returnset[0].RCode == 200) {
        this.privilegio = true;
      }
    });
  }

  ordenAlfabetico(lista: Array<any>) {
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

  cargarTabla() {
    let arrayAux:any = [];
    this.usuarios.forEach(user => {
      arrayAux.push({usuario: user.usuario, nombre: user.nombre, rol: user.rol});
    });
    this.dataSource = new MatTableDataSource(arrayAux);
    console.log('cargarTabla()');
  }

  getRoles() {
    this._usuarioService.getRoles().subscribe(
      (response: any) => {
        const roles = response.dataset;
        roles.forEach((rol: any) => {
          if (rol.name != 'Analista Funcional') {
            this.roles.push({id_rol: rol.id, nombre: rol.name, check: true});
          }
        });
    });
    console.log('getRoles()');
  }

  applyFilter(event: Event) {
    this.cargarTabla();
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    localStorage.setItem('filtroLS',filterValue);
    localStorage.setItem('filtroLS',JSON.stringify(filterValue));
    console.log('applyFilter(event: Event)');
  }
  applyFilter2(){
    this.cargarTabla();
    let aux:string;
    aux = JSON.parse(localStorage.getItem('filtroLS')||'{}');
    this.dataSource.filter = aux;
    //this.filtrarRoles();
    console.log('applyFilter2()');
  }

  marcarCheckbox(event: any) {
    console.log('EVENT SOURCE VALUE',event.source.value)
    this.auxEvent = event;
    if (event.checked) {
      this.roles.forEach(rol => {
        if (rol.nombre == event.source.value) {
          rol.check = true;
        }});
      this.tempArray = this.arrayBack.filter((e: any) => e.rol == event.source.value);
      this.filtrarRoles();
      this.applyFilter2();
    } else {
      this.roles.forEach(rol => {
        if (rol.nombre == event.source.value) {
          rol.check = false;
        }});
      this.tempArray = this.usuarios.filter((e: any) => e.rol != event.source.value);
      this.newArray = [];
      this.filtrarRoles();
      this.applyFilter2();
    }
    console.log('marcarCheckbox(event: any)')
}

filtrarRoles() {
  this.usuarios = [];
  this.newArray.push(this.tempArray);
  this.newArray.forEach(element => {
    let firstArray = element;
    for (let i=0;i<firstArray.length;i++) {
      let obj = firstArray[i];
      this.usuarios.push(obj);
    }
  });
  console.log('filtrarRoles()')
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
    console.log('getRolesDisponibles(usuario: any) ')
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
            if (contador == 2 && this.auxUser.rol == 'Administrador') {  // cambiar el numero 2 a 1 antes de terminar el componente
              this.mensajeCambio('No se pudo cambiar el rol (Debe haber 1 Administrador)');
            } else if (this.auxUser.usuario == 'lmariotti') {  // chequear que no exista en la bd
              this.mensajeCambio('No se puede cambiar el rol de este Usuario');
            } else {
              if (this.privilegio == true) {
                this.cambioExitoso(rolCambio);
              } else {
                this.mensajeCambio('Su usuario no tiene los permisos requeridos para realizar el cambio');
              }
            }
          } else {
            if (this.privilegio == true) {
              this.cambioExitoso(rolCambio);
            } else {
              this.mensajeCambio('Su usuario no tiene los permisos requeridos para realizar el cambio');
            }
          }
          let input = document.querySelector('input');
          if (input != null) {
            this.filtroLS = localStorage.getItem('filtroLS');
            input.value = this.filtroLS.replace(/['"]+/g, '');
            input.focus();
            this.applyFilter2();
          }
        }
    })
    console.log('cambiarRol(rolCambio: any) ')
  }

  cambioExitoso(rolCambio: string) {
    
    this.usuarios.forEach(user => {
      if (user.usuario == this.auxUser.usuario) {
        const idUsuario = user.id_usuario;
        let idRol = '';
        user.rol = rolCambio;    
        //this.cargarTabla();
        
        this.roles.forEach(rol => {
          if (rol.nombre == rolCambio) {
            idRol = rol.id_rol;
            this.checkAux(rol);
            this.applyFilter2();
          }
        });
        this._usuarioService.setRolUsuario(idRol, idUsuario).subscribe(
          (response: any) => {
            console.log("RESPUESTA DEL BACKEND = ", response);
        });
      }
    }
    );
    this.mensajeCambio('El cambio de rol fue realizado con éxito');
    console.log('cambioExitoso(rolCambio: string)')
    console.log('ROLES',this.roles);
  }

  checkAux(rol:any) {
    if(rol.check == false){
      this.tempArray = this.usuarios.filter((e: any) => e.rol != rol.nombre);
      this.newArray = [];
      this.filtrarRoles();
      this.applyFilter2();
    }
  }

  mensajeCambio(msj: string) {
    this._snackBar.open(msj,'',{
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition:  'bottom'
    })
    console.log('mensajeCambio(msj: string)')
  }

}