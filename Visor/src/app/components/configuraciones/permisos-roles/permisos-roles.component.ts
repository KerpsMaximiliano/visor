import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Permiso } from 'src/app/interfaces/permiso';
import { DialogService } from 'src/app/services/i2t/dialog.service';
import { PermisoService } from 'src/app/services/i2t/permiso.service';
import { UsuarioService } from 'src/app/services/i2t/usuario-rol.service';

@Component({
  selector: 'app-permisos-roles',
  templateUrl: './permisos-roles.component.html',
  styleUrls: ['./permisos-roles.component.css']
})
export class PermisosRolesComponent implements OnInit {

  roles: any[] = [];
  permisosSP: any[] = [];
  permisos: Permiso[] = [];
  funciones: string[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['permiso', 'operativo', 'supervisor', 'administrador'];
  privilegio: boolean = false;

  constructor(private _permisoService: PermisoService,
              private _usuarioService: UsuarioService,
              private dialogService: DialogService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getRoles();
    this.funciones = this._permisoService.getFunciones();
    this.permisosSP = this._permisoService.getPermisosSP();
    this.actualizarPermisos();
    this.ordenAlfabetico(this.permisos);
    this.dataSource = new MatTableDataSource(this.permisos);
    this._usuarioService.verificarUsuario('F001', localStorage.getItem('usuario')!).subscribe(response => {
      this.privilegio = response.returnset.Rcode; // agregar el if
    });
    console.log(this.privilegio)
  }

  getRoles() {
    this._usuarioService.getRoles().subscribe(
      (response: any) => {
        this.roles = response.dataset;
    });
  }

  actualizarPermisos() {
  let cont2 = 0;
    this.funciones.forEach(func => {
      this.permisos[cont2] = { id: cont2+1, nombre: func, supervisor: false, operativo: false, administrador: true };
      this.permisosSP.forEach(sp => {
        if (sp.funcion == func) {
          switch (sp.nombre_rol) {
            case 'Operativo':
              this.permisos[cont2].operativo = true;
              break;
            case 'Supervisor':
              this.permisos[cont2].supervisor = true;
              break;
          }
        }
      });
      cont2++;
    });
  }

  ordenAlfabetico(lista: Array<Permiso>) {
    lista.sort(function(a, b) {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  marcarCheckbox(event: any, rol: string, funcion: string) {
    this.dialogService.openConfirmDialog(
      '¿Está seguro de que desea cambiar el permiso de este rol?'
      ).afterClosed().subscribe(res => {
        if (res) {
          if (rol == 'Administrador') {
            this.mensajeCambio('No se permiten cambios en los permisos de Administrador');
            this.cambiarPermiso(event, rol, false, funcion);
          } else {
            this.cambiarPermiso(event, rol, true, funcion);
          }
        } else {
          this.cambiarPermiso(event, rol, false, funcion);
        }
      })
  }

  cambiarPermiso(event: any, rol: string, cambiar: boolean, funcion: string) {
    let id_rol = '';
    let id_funcion = '';
    let id_funcion_rol = '';
    this.permisos.forEach(permiso => {
      if (permiso.id == event.source.value) {
        switch (rol) {
          case 'Operativo':
            if (cambiar) {
              this.permisosSP.forEach(permiso => {
                if (permiso.nombre_rol == 'Operativo') {
                  id_rol = permiso.id_rol;
                }
                if (permiso.funcion == funcion) {
                  id_funcion = permiso.id_funcion;
                }
                if (permiso.nombre_rol == 'Operativo' && permiso.funcion == funcion) {
                  id_funcion_rol = permiso.id_funcion_rol;
                }
              });
              if (event.checked) {
                console.log("insert", id_rol, id_funcion);
                  if (this.privilegio == true) {
                    this._permisoService.insertPermiso(id_funcion, id_rol).subscribe((response: any) => {
                      console.log("INSERT EXITOSO", response);
                    });
                    permiso.operativo = event.checked;
                    this.mensajeCambio('El permiso para el rol ' + rol + ' fue modificado correctamente');
                  } else {
                    permiso.operativo = !event.checked;
                    this.mensajeCambio('Su usuario no tiene los privilegios para cambiar permisos');
                  }
              } else {
                console.log("delete", id_funcion_rol);
                  if (this.privilegio == true) {
                    this._permisoService.deletePermiso(id_funcion_rol).subscribe((response: any) => {
                      console.log("DELETE EXITOSO", response);
                    });
                    permiso.operativo = event.checked;
                    this.mensajeCambio('El permiso para el rol ' + rol + ' fue modificado correctamente');
                  } else {
                    permiso.operativo = !event.checked;
                    this.mensajeCambio('Su usuario no tiene los privilegios para cambiar permisos');
                  }
              }
            } else {
              permiso.operativo = !event.checked;
            }
            break;
          case 'Supervisor':
            if (cambiar) {
              this.permisosSP.forEach(permiso => {
                if (permiso.nombre_rol == 'Supervisor') {
                  id_rol = permiso.id_rol;
                }
                if (permiso.funcion == funcion) {
                  id_funcion = permiso.id_funcion;
                }
                if (permiso.nombre_rol == 'Supervisor' && permiso.funcion == funcion) {
                  id_funcion_rol = permiso.id_funcion_rol;
                }
              });
              if (event.checked) {
                console.log("insert", id_rol, id_funcion);
                this._permisoService.insertPermiso(id_funcion, id_rol).subscribe((response: any) => {
                  console.log("INSERT EXITOSO", response);
                  });
              } else {
                console.log("delete", id_funcion_rol);
                this._permisoService.deletePermiso(id_funcion_rol).subscribe((response: any) => {
                  console.log("DELETE EXITOSO", response);
                });
              }
              permiso.supervisor = event.checked;
              this.mensajeCambio('El permiso para el rol ' + rol + ' fue modificado correctamente');
            } else {
              permiso.supervisor = !event.checked;
            }
            break;
          case 'Administrador':
            permiso.administrador = !event.checked;
            break;
        }
      }
    });
    this._permisoService.iniciarPermisos();
  }

  mensajeCambio(msj: string) {
    this._snackBar.open(msj,'',{
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition:  'bottom'
    })
  }

}
