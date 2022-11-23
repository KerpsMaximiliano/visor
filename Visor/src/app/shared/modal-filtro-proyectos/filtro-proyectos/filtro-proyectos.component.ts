import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InicioEstadoProyectoComponent } from 'src/app/componentes/inicio/inicio-estado-proyecto/inicio-estado-proyecto.component';
import { FiltroService } from '../../../services/i2t/filtro.service';

@Component({
  selector: 'app-filtro-proyectos',
  templateUrl: './filtro-proyectos.component.html',
  styleUrls: ['./filtro-proyectos.component.css']
})
export class FiltroProyectosComponent implements OnInit {

  result = {numero: '', nombre: '', asignadoA: '', cliente: '', seleccion: '', filtrar: true, limpiar: false, misProyectos: false, proyectosAbiertos: false}
  activarBoton: boolean;
  save_search_id = '';


  constructor(public dialogRef: MatDialogRef<InicioEstadoProyectoComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public _filtroService: FiltroService) {
    this.activarBoton = true;
   }

  ngOnInit(): void {
    this.result.numero = this.data.numero;
    this.result.cliente = this.data.cliente;
    this.result.asignadoA = this.data.asignadoA;
    this.result.nombre = this.data.nombre;
    this.result.seleccion = this.data.seleccion;
    this.save_search_id = this.data.search_id;
    this.result.misProyectos = this.data.misProyectos;
    this.result.proyectosAbiertos = this.data.proyectosAbiertos;
  }

  limpiarFiltro() {
    this.result.numero = '';
    this.result.nombre = '';
    this.result.asignadoA = '';
    this.result.cliente = '';
    this.result.limpiar = true;
    this.result.misProyectos = false;
    this.result.proyectosAbiertos = false;
    this._filtroService.deleteFiltro(this.save_search_id).subscribe((rsp: any) => {
      console.log('Filtro eliminado: ', rsp);
    });
  }


  cancelarBusqueda(): void {
    if (this.result.limpiar == false) {
      this.result.nombre = this.data.nombre;
      this.result.numero = this.data.numero;
      this.result.asignadoA = this.data.asignadoA;
      this.result.cliente = this.data.cliente;
      this.result.filtrar = false;
      this.dialogRef.close(this.result);
    } else {
      this.result.nombre = '';
      this.result.numero = '';
      this.result.cliente = '';
      this.result.asignadoA = '';
      this.result.limpiar = true;
      this.result.filtrar = true;
      this.result.misProyectos = true;
      this.result.proyectosAbiertos = true;
      this.dialogRef.close(this.result);  
    }
  }

  guardarFiltro() {
    const contenido: string = JSON.stringify({
      numero: this.result.numero,
      nombre : this.result.nombre,
      cliente : this.result.cliente,
      asignadoA: this.result.asignadoA,
      funcion : this.result.seleccion,
      misProyectos: this.result.misProyectos,
      proyectosAbiertos: this.result.proyectosAbiertos
    });
    const encodedData = btoa(contenido);
    if (this.save_search_id == '') {
      this._filtroService.insertFiltro(
        localStorage.getItem('userId')!,
        'inicio-estado-proyecto',
        'filtro_numero_nombre_cliente_asignadoa',
        encodedData,
        'Filtra los proyectos en base a las 4 caracteristicas principales').subscribe((rsp: any) => {
          console.log('Filtro guardado: ', rsp);
        });
    } else {
      this._filtroService.updateFiltro(this.save_search_id, encodedData).subscribe((rsp: any) => {
        console.log('Filtro actualizado: ', rsp);
      });
    }
  }

  
  validarTecla(e: KeyboardEvent){
    if(e.key == "Enter"){
      this.guardarFiltro();
      this.dialogRef.close(this.result);
    }
  }
}
