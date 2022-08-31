import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { DialogService } from 'src/app/services/i2t/dialog.service';
import { UsuarioService } from 'src/app/services/i2t/usuario.service';

@Component({
  selector: 'app-roles-usuarios',
  templateUrl: './roles-usuarios.component.html',
  styleUrls: ['./roles-usuarios.component.css']
})
export class RolesUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['usuario', 'nombre', 'rol'];

  roles: any[] = [];
  rolesFaltantes: any[] = [];
  tempArray: any[] = [];
  newArray: any[] = [];
  arrayBack: any[] = [];

  constructor(private _usuarioService: UsuarioService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.usuarios = this._usuarioService.getUsuarios();
    this.arrayBack = this._usuarioService.getUsuarios();
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.roles = this._usuarioService.getRoles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  marcarCheckbox(event: any) {
    if (event.checked) {
      this.roles.forEach(rol => {
        if (rol.nombre == event.source.value) {
          rol.check = true;
        }});
      this.tempArray = this.arrayBack.filter((e: any) => e.rol == event.source.value);
      this.usuarios = [];
      this.newArray.push(this.tempArray);
      this.newArray.forEach(element => {
        let firstArray = element;
        for (let i=0;i<firstArray.length;i++) {
          let obj = firstArray[i];
          this.usuarios.push(obj);
          this.dataSource = new MatTableDataSource(this.usuarios);
        }});
    } else {
      this.roles.forEach(rol => {
        if (rol.nombre == event.source.value) {
          rol.check = false;
        }});
      this.tempArray = this.usuarios.filter((e: any) => e.rol != event.source.value);
      this.newArray = [];
      this.usuarios = [];
      this.newArray.push(this.tempArray);
      this.newArray.forEach(element => {
        let firstArray = element;
        for (let i=0;i<firstArray.length;i++) {
          let obj = firstArray[i];
          this.usuarios.push(obj);
          this.dataSource = new MatTableDataSource(this.usuarios);
        }});
    }
  if (this.roles[0].check == false && this.roles[1].check == false && this.roles[2].check == false) {
    this.usuarios = this._usuarioService.getUsuarios();
    this.dataSource = new MatTableDataSource(this.usuarios);
  }
}

  getRolesDisponibles(rol: any) {
    this.rolesFaltantes = [{ nombre: 'Administrador' }, { nombre: 'Supervisor' }, { nombre: 'Operativo' }];
    let aux = -1;
    this.rolesFaltantes.forEach(x => {
      aux++;
      if (x.nombre == rol) {
        this.rolesFaltantes.splice(aux, 1);
      }
    });
  }

  cambiarRol() {
    this.dialogService.openConfirmDialog(
      '¿Está seguro de que desea cambiar el permiso de este usuario?'
      ).afterClosed().subscribe(res => {
        if (res) {
          console.log('Dialog Abierto');
        }
    })
  }

}