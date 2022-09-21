import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Permiso } from 'src/app/interfaces/permiso';
import { DialogService } from 'src/app/services/i2t/dialog.service';
import { PermisoService } from 'src/app/services/i2t/permiso.service';

@Component({
  selector: 'app-permisos-roles',
  templateUrl: './permisos-roles.component.html',
  styleUrls: ['./permisos-roles.component.css']
})
export class PermisosRolesComponent implements OnInit {

  permisosSP: any[] = [];
  permisos: Permiso[] = [];
  permisos2: Permiso[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['permiso', 'operativo', 'supervisor', 'administrador'];

  constructor(private _permisoService: PermisoService,
              private dialogService: DialogService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.permisosSP = this._permisoService.getPermisosSP();
    this.permisos = this._permisoService.getPermisos();
    this.organizarPermisos();
    this.ordenAlfabetico(this.permisos);
    this.dataSource = new MatTableDataSource(this.permisos);
  }

  organizarPermisos() {
    this.permisosSP.forEach(permiso => {
      this.permisos.forEach(element => {
        if (permiso.funcion != element.nombre) {
          this.permisos2.push(permiso);
        }
      });
    });
    console.log(this.permisos)
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

  marcarCheckbox(event: any, rol: string) {
    this.dialogService.openConfirmDialog(
      '¿Está seguro de que desea cambiar el permiso de este rol?'
      ).afterClosed().subscribe(res => {
        if (res) {
          if (rol == 'Administrador') {
            this.mensajeCambio('No se permiten cambios en los permisos de Administrador');
            this.cambiarPermiso(event, rol, false);
          } else {
            this.cambiarPermiso(event, rol, true);
          }
        } else {
          this.cambiarPermiso(event, rol, false);
        }
      })
  }

  cambiarPermiso(event: any, rol: string, cambiar: boolean) {
    this.permisos.forEach(permiso => {
      if (permiso.id == event.source.value) {
        switch (rol) {
          case 'Operativo':
            if (cambiar) {
              permiso.operativo = event.checked;
              this.mensajeCambio('El permiso para el rol ' + rol + ' fue modificado correctamente');
            } else {
              permiso.operativo = !event.checked;
            }
            break;
          case 'Supervisor':
            if (cambiar) {
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
  }

  mensajeCambio(msj: string) {
    this._snackBar.open(msj,'',{
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition:  'bottom'
    })
  }

}
