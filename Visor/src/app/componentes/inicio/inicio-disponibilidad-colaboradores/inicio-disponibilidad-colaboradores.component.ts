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
  ordenSeleccion: string = 'Tiempo Disponible';
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
    this.actualizarHorasPlanificadas();
    this.cambiarOrden();
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

  contraerColaboradores() {
    // agregar comportamiento para cerrar todos los expansion panel abiertos
  }

  dispararCambioOrden(e: Event) {
    this.ordenSeleccion = (e.target as HTMLElement).innerText;
    this.cambiarOrden();
  }

  cambiarOrden() {
    if (this.ordenSeleccion == 'Alfabetico') {
      this.colaboradores.sort(function(a, b) {
        if (a.apellido > b.apellido) {
          return 1;
        }
        if (a.apellido < b.apellido) {
          return -1;
        }
        return 0;
      });
      this.colaboradores.sort(function(a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
      this.ordenarColaboradores();
    }
    if (this.ordenSeleccion == 'Tiempo Disponible') {
      this.colaboradores.sort(function(a, b) {
        if (a.tiempoDisponible < b.tiempoDisponible) {
          return 1;
        }
        if (a.tiempoDisponible > b.tiempoDisponible) {
          return -1;
        }
        return 0;
      });
      this.ordenarColaboradores();
    }
  }

  getPorcentajeRojo(valor: number) {
    if (valor>=0 && valor<=25) {
      return true;
    } else {
      return false;
    }
  }

  getPorcentajeAmarillo(valor: number) {
    if (valor>=26 && valor<=50) {
      return true;
    } else {
      return false;
    }
  }

  getPorcentajeVerdeClaro(valor: number) {
    if (valor>=51 && valor<=75) {
      return true;
    } else {
      return false;
    }
  }

  getPorcentajeVerdeOscuro(valor: number) {
    if (valor>=76 && valor<=100) {
      return true;
    } else {
      return false;
    }
  }

  cambioFechaHasta(event: any) {
    this.fechaHastaDate = event.value;
    this.actualizarHorasPlanificadas();
  }

  actualizarHorasPlanificadas() {
    this.planificadasTotal = 0;
    this.capacidadTotal = 0;
    this.mesesMostrados = this.getDiferenciaMeses(this.fechaHoy, this.fechaHastaDate);
    // meter en un array cuales son los meses en string
    // let horas: any;
    this.colaboradores.forEach(colab => {
      // horas = this.getHorasPlanificadasColaborador(colab.id-1, this.mesesMostrados, this.fechaHoy.getMonth()+1);
      colab.horasPlanificadas = this.getHorasPlanificadasColaborador(colab.id-1, this.mesesMostrados, this.fechaHoy.getMonth()+1);
      colab.tiempoDisponible = this.getTiempoDisponibleColaborador(colab);
      colab.atrasadas = this.getTareasAtrasadas(colab);
      this.planificadasTotal += colab.horasPlanificadas;
      this.capacidadTotal += colab.capacidad*(this.mesesMostrados+1);
    });
    this.disponibilidadEquipo = Math.round(this.disponibilidadEquipo = (this.capacidadTotal-this.planificadasTotal)/this.capacidadTotal*100);

    // actualizar columnas con nuevos valores por colaborador

  }

  getDiferenciaMeses(mesInicio: Date, mesFin: Date) {
    return mesFin.getMonth() - mesInicio.getMonth() + (12 * (mesFin.getFullYear() - mesInicio.getFullYear()));
  }

  getHorasPlanificadasColaborador(idUser: number, diferencia: number, inicio: number) {
    return this._colaboradorService.getHorasPlanificadas(idUser, diferencia, inicio);
  }

  getTiempoDisponibleColaborador(colaborador: Colaborador) {
    return Math.round((colaborador.capacidad*(this.mesesMostrados+1) - colaborador.horasPlanificadas) / (colaborador.capacidad*(this.mesesMostrados+1)) * 100);
  }

  getTareasAtrasadas(colaborador: Colaborador) {
    return this._colaboradorService.getTareasAtrasadas(colaborador.id, this.fechaHoy);
  }

}