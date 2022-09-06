import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Colaborador } from 'src/app/interfaces/colaborador';
import { ColaboradorService } from 'src/app/services/i2t/colaborador.service';
import { ModalFiltroComponent } from '../modal-filtro/modal-filtro.component';

@Component({
  selector: 'app-inicio-disponibilidad-colaboradores',
  templateUrl: './inicio-disponibilidad-colaboradores.component.html',
  styleUrls: ['./inicio-disponibilidad-colaboradores.component.css']
})
export class InicioDisponibilidadColaboradoresComponent implements OnInit {

  colaboradores!: Colaborador[];
  dataSource!: any;
  orden: string[] = ['Alfabetico', 'Tiempo Disponible'];
  ordenSeleccion: string = 'Alfabetico';
  fechaHasta!: string;
  minDate = new Date();
  disponibilidadEquipo: number = 0;

  nombre?: string;
  apellido?: string;
  funcion?: string;

  constructor(private _colaboradorService: ColaboradorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.colaboradores = this._colaboradorService.getColaboradores();
    let fecha = new Date();
    fecha.toLocaleDateString();
    this.fechaHasta = fecha.getMonth()+1 + '-' + fecha.getFullYear();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarOrden(e: Event) {
    this.ordenSeleccion = (e.target as HTMLElement).innerText;
    // Cambiar el orden mostrado
  }

  getPorcentajeRojo(valor: number) {
    return true;
  }

  getPorcentajeAmarillo(valor: number) {
    return false;
  }

  getPorcentajeVerdeClaro(valor: number) {
    return false;
  }

  getPorcentajeVerdeOscuro(valor: number) {
    return false;
  }

  abrirModalFiltro() {
    const dialogRef = this.dialog.open(ModalFiltroComponent, {
      width: '400px',
      data: {
        nombre: this.nombre,
        apellido: this.apellido,
        funcion: this.funcion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Filtro cerrado: ', result);
      this.nombre = result.nombre;
      this.apellido = result.apellido;
      this.funcion = result.funcion;
    });
  }

}