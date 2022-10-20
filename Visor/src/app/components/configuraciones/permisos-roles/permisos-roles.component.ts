import { ListRange } from '@angular/cdk/collections';
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
  permisosOrdenados!: Array<Permiso>;

  constructor(private _permisoService: PermisoService,
              private _usuarioService: UsuarioService,
              private dialogService: DialogService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getRoles();
    this.funciones = this._permisoService.getFunciones();
    this.permisosSP = this._permisoService.getPermisosSP();
    this.actualizarPermisos();
    //this.ordenAlfabetico(this.permisos);
    this.ordenEspecifico(this.permisos);
    this.dataSource = new MatTableDataSource(this.permisos);
    this._usuarioService.verificarUsuario('F001', localStorage.getItem('usuario')!).subscribe((response: any) => {
      if (response.returnset[0].RCode == 200) {
        this.privilegio = true;
      }
    });
    console.log(this.permisos)
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
  ordenEspecifico(lista: Array<Permiso>){
    
    for(let i=0;i< lista.length;i++){
        if(lista[i].nombre == 'Cambiar los Permisos')this.permisos[0] = lista[i];
        if(lista[i].nombre == 'Cambiar Roles')this.permisos[1] = lista[i]; 
        if(lista[i].nombre == 'Agregar Tarea')this.permisos[2] = lista[i]; 
        if(lista[i].nombre == 'Modificar Tarea')this.permisos[3] = lista[i]; 
        if(lista[i].nombre == 'Eliminar Tarea')this.permisos[4] = lista[i]; 
        if(lista[i].nombre == 'Agregar Actividades')this.permisos[5] = lista[i]; 
        if(lista[i].nombre == 'Modificar Actividades')this.permisos[6] = lista[i]; 
        if(lista[i].nombre == 'Eliminar Actividades')this.permisos[7] = lista[i];
        if(lista[i].nombre == 'Agregar Proyecto')this.permisos[8] = lista[i];
        if(lista[i].nombre == 'Modificar Proyecto')this.permisos[9] = lista[i];
        if(lista[i].nombre == 'Eliminar Proyecto')this.permisos[10] = lista[i];
        if(lista[i].nombre == 'Agregar Sprint')this.permisos[11] = lista[i];
        if(lista[i].nombre == 'Modificar Sprint')this.permisos[12] = lista[i];
        if(lista[i].nombre == 'Eliminar Sprint')this.permisos[13] = lista[i];
        if(lista[i].nombre == 'Agregar Des. Wiki')this.permisos[14] = lista[i];
        if(lista[i].nombre == 'Modificar Des. Wiki')this.permisos[15] = lista[i];
        if(lista[i].nombre == 'Eliminar Des. Wiki')this.permisos[16] = lista[i];
        if(lista[i].nombre == 'Agregar Documento')this.permisos[17] = lista[i];
        if(lista[i].nombre == 'Modificar Documento')this.permisos[18] = lista[i];
        if(lista[i].nombre == 'Eliminar Documento')this.permisos[19] = lista[i];
        if(lista[i].nombre == 'Vista Analista Funcional')this.permisos[20] = lista[i];
        if(lista[i].nombre == 'Vista Analista Técnico')this.permisos[21] = lista[i];
        if(lista[i].nombre == 'Vista Desarrollador')this.permisos[22] = lista[i];
        if(lista[i].nombre == 'Vista de QA')this.permisos[23] = lista[i];
        if(lista[i].nombre == 'Vista de Testing')this.permisos[24] = lista[i];
        if(lista[i].nombre == 'Vista de Project Manager')this.permisos[25] = lista[i];
    } 
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
                    this.mensajeCambio('Su usuario no tiene los permisos requeridos para realizar el cambio');
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
                    this.mensajeCambio('Su usuario no tiene los permisos requeridos para realizar el cambio');
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
                if (this.privilegio == true) {
                  this._permisoService.insertPermiso(id_funcion, id_rol).subscribe((response: any) => {
                  });
                  permiso.supervisor = event.checked;
                  this.mensajeCambio('El permiso para el rol ' + rol + ' fue modificado correctamente');
                } else {
                  permiso.supervisor = !event.checked;
                  this.mensajeCambio('Su usuario no tiene los permisos requeridos para realizar el cambio');
                }
              } else {
                if (this.privilegio == true) {
                  this._permisoService.deletePermiso(id_funcion_rol).subscribe((response: any) => {
                  });
                  permiso.supervisor = event.checked;
                  this.mensajeCambio('El permiso para el rol ' + rol + ' fue modificado correctamente');
                } else {
                  permiso.supervisor = !event.checked;
                  this.mensajeCambio('Su usuario no tiene los permisos requeridos para realizar el cambio');
                }
              }
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
