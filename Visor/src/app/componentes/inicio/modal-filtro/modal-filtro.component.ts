import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FiltroService } from 'src/app/services/i2t/filtro.service';

@Component({
  selector: 'app-modal-filtro',
  templateUrl: './modal-filtro.component.html',
  styleUrls: ['./modal-filtro.component.css']
})
export class ModalFiltroComponent implements OnInit {

  funciones: string[] = [ 'Analista Funcional', 'Analista Técnico', 'Desarrollador', 'Tester', 'Project Manager' ];
  result = {nombre: '', apellido: '', seleccion: '', filtrar: true, limpiar: false};
  saved_search_id = '';

  constructor(public dialogRef: MatDialogRef<ModalFiltroComponent>, @Inject(MAT_DIALOG_DATA) public data:any,
              private _filtroService: FiltroService) { }

  ngOnInit(): void {
    this.result.nombre = this.data.nombre;
    this.result.apellido = this.data.apellido;
    this.result.seleccion = this.data.funcion;
    this.saved_search_id = this.data.search_id;
  }

  limpiarFiltro() {
    this.result.nombre = '';
    this.result.apellido = '';
    this.result.seleccion = '';
    this.result.limpiar = true;
    this._filtroService.deleteFiltro(this.saved_search_id).subscribe((rsp: any) => {
      console.log('Filtro eliminado: ', rsp);
    });
  }

  cancelarBusqueda(): void {
    if (this.result.limpiar == false) {
      this.result.nombre = this.data.nombre;
      this.result.apellido = this.data.apellido;
      this.result.seleccion = this.data.funcion;
      this.result.filtrar = false;
      this.dialogRef.close(this.result);
    } else {
      this.result.nombre = '';
      this.result.apellido = '';
      this.result.seleccion = '';
      this.result.limpiar = true;
      this.result.filtrar = true;
      this.dialogRef.close(this.result);
    }
  }

  guardarFiltro() {
    const contenido: string = JSON.stringify({
      nombre : this.result.nombre,
      apellido : this.result.apellido,
      funcion : this.result.seleccion
    });
    const encodedData = btoa(contenido);
    if (this.saved_search_id == '') {
      this._filtroService.insertFiltro(
        localStorage.getItem('userId')!,
        'disponibilidad',
        'filtro_nombre_apellido_funcion',
        encodedData,
        'Filtra los colaboradores combinando las 3 caracteristicas').subscribe((rsp: any) => {
          console.log('Filtro guardado: ', rsp);
        });
    } else {
      this._filtroService.updateFiltro(this.saved_search_id, encodedData).subscribe((rsp: any) => {
        console.log('Filtro actualizado: ', rsp);
      });
    }
  }

  validarTecla(e: KeyboardEvent){
    if(e.key === "Enter"){
      this.guardarFiltro();
      this.dialogRef.close(this.result);
    }
  }
}