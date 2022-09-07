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
  columna1!: Colaborador[];
  columna2!: Colaborador[];
  orden: string[] = ['Alfabetico', 'Tiempo Disponible'];
  ordenSeleccion: string = 'Alfabetico';
  fechaHoy = new Date();
  fechaHastaDate = new Date();
  minDate = new Date();
  mesesMostrados: number = 0;
  disponibilidadEquipo: number = 0;
  capacidadTotal: number = 0;
  planificadasTotal: number = 0;

  nombre?: string;
  apellido?: string;
  funcion?: string;

  constructor(private _colaboradorService: ColaboradorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.colaboradores = this._colaboradorService.getColaboradores();
    this.ordenarColaboradores();
    this.actualizarHorasPlanificadas();
  }

  ordenarColaboradores() {
    let tamanioCol1:number;
    tamanioCol1 = Math.round(tamanioCol1 = this.colaboradores.length / 2);
    this.columna1 = this.colaboradores.slice(0, tamanioCol1);
    this.columna2 = this.colaboradores.slice(tamanioCol1, this.colaboradores.length);
  }

  // revisar y agregar tabla para filtrar y devolver al array
  // o usar metodo a,b
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarOrden(e: Event) {
    this.ordenSeleccion = (e.target as HTMLElement).innerText;
    // agregar comportamiento para cambiar el orden mostrado
  }

  getPorcentajeRojo() {
    if (this.disponibilidadEquipo>=0 && this.disponibilidadEquipo<=25) {
      return true;
    } else {
      return false;
    }
  }

  getPorcentajeAmarillo() {
    if (this.disponibilidadEquipo>=26 && this.disponibilidadEquipo<=50) {
      return true;
    } else {
      return false;
    }
  }

  getPorcentajeVerdeClaro() {
    if (this.disponibilidadEquipo>=51 && this.disponibilidadEquipo<=75) {
      return true;
    } else {
      return false;
    }
  }

  getPorcentajeVerdeOscuro() {
    if (this.disponibilidadEquipo>=76 && this.disponibilidadEquipo<=100) {
      return true;
    } else {
      return false;
    }
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

  cambioFechaHasta(event: any) {
    this.fechaHastaDate = event.value;
    this.actualizarHorasPlanificadas();
  }

  actualizarHorasPlanificadas() {
    this.planificadasTotal = 0;
    this.capacidadTotal = 0;
    this.mesesMostrados = this.getDiferenciaMeses(this.fechaHoy, this.fechaHastaDate);
    this.colaboradores.forEach(colab => {
      colab.horasPlanificadas = this.getHorasPlanificadasUsuario(colab.id-1, this.mesesMostrados, this.fechaHoy.getMonth()+1);
      this.planificadasTotal += colab.horasPlanificadas;
      this.capacidadTotal += colab.capacidad*(this.mesesMostrados+1);
    });
    console.log(this.capacidadTotal, this.planificadasTotal)
    this.disponibilidadEquipo = Math.round(this.disponibilidadEquipo = (this.capacidadTotal-this.planificadasTotal)/this.capacidadTotal*100);

    // actualizar columnas con nuevos valors por colaborador

  }

  getDiferenciaMeses(mesInicio: Date, mesFin: Date) {
    return mesFin.getMonth() - mesInicio.getMonth() + (12 * (mesFin.getFullYear() - mesInicio.getFullYear()));
  }

  getHorasPlanificadasUsuario(idUser: number, diferencia: number, inicio: number) {
    return this._colaboradorService.getHorasPlanificadas(idUser, diferencia, inicio);
  }

  getDisponibilidadColaborador() {

  }

}