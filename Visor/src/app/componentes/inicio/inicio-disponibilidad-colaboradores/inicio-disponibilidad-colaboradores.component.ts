import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Colaborador } from 'src/app/interfaces/colaborador';
import { ColaboradorService } from 'src/app/services/i2t/colaborador.service';
import { ModalFiltroComponent } from '../modal-filtro/modal-filtro.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-inicio-disponibilidad-colaboradores',
  templateUrl: './inicio-disponibilidad-colaboradores.component.html',
  styleUrls: ['./inicio-disponibilidad-colaboradores.component.css']
})
export class InicioDisponibilidadColaboradoresComponent implements OnInit {

  /* @ViewChild(MatAccordion) accordion: MatAccordion; */

  colaboradores!: Colaborador[];
  dataSource!: any;
  columna1!: Colaborador[];
  columna2!: Colaborador[];
  orden: string[] = ['Alfabetico', 'Tiempo Disponible'];
  ordenSeleccion: string = 'Tiempo Disponible'; // se tiene que guardar en las preferencias del usuario en sesion cuando este disponible
  fechaHoy = new Date();
  fechaHastaDate = new Date();
  minDate = this.fechaHoy;
  mesesMostrados: number = 0;
  disponibilidadEquipo: number = 0;
  tareasColaboradores: any[] = [];
  mesesPlanificacion = [{mes: ''}]; // pushear obj con el mes a mostrar
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  position2 = new FormControl(this.positionOptions[3]);

  nombre?: string;
  apellido?: string;
  funcion?: string;

  constructor(private _colaboradorService: ColaboradorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.mesesPlanificacion[0].mes = this._colaboradorService.getMesString(this.fechaHoy);
    this.colaboradores = this._colaboradorService.getColaboradores();
    this.getTareasColaboradores();
    this.getTareasAtrasadas();
    this.getTiempoDisponibleColaboradores();
    this.actualizarDisponibilidadEquipo();
    this.cambiarOrden();
  }

  getTareasColaboradores() {
    let tareasColaboradoresAux:any = [];
    this.colaboradores.forEach(colab => {
      tareasColaboradoresAux.push(this._colaboradorService.getTareasColaborador(colab.id, this.fechaHoy));
    });
    tareasColaboradoresAux.forEach((obj: any) => {
      obj.forEach((element: any) => {
        this.tareasColaboradores.push(element);
      });
    });
  }

  getTareasAtrasadas() {
    let contadorAtrasadas = 0;
    let acumuladorHoras = 0;
    this.colaboradores.forEach(colab => {
      this.tareasColaboradores.forEach(tarea => {
        if (tarea.idColab == colab.id && tarea.fechaPlanificacion < this.fechaHoy) {
          if (tarea.estado == 'No iniciada' || tarea.estado == 'En progreso' || tarea.estado == 'En prueba') {
            contadorAtrasadas++;
            acumuladorHoras += tarea.horasPlanificadas;
          }
        }
      });
      colab.atrasadas = contadorAtrasadas;
      colab.horasAtrasadas = acumuladorHoras;
      contadorAtrasadas = 0;
      acumuladorHoras = 0;
    });
  }

  separarProyectosDelMes(id: number, mes: string) {
    let proyectos:any = [];
    this.tareasColaboradores.forEach(tarea => {
      if (tarea.idColab == id && tarea.fechaPlanificacion.getMonth() == this._colaboradorService.getMesDate(mes)) {
        if (proyectos.indexOf(tarea.proyecto) == -1) {
          proyectos.push(tarea.proyecto);
        }
      }
    });
    return proyectos;
  }

  getPorcentajeOcupadoMensualProyecto(proyecto: string, id: number, mes: string) {
    let hp = 0;
    this.tareasColaboradores.forEach(tarea => {
      if (tarea.idColab == id && tarea.proyecto == proyecto && tarea.fechaPlanificacion.getMonth() == this._colaboradorService.getMesDate(mes)) {
        hp += tarea.horasPlanificadas
      }
    });
    return Math.round((hp/this.getCapacidadColaborador(id)*100));
  }

  getTooltipHsPlanProyecto(proyecto: string, id: number, mes: string) {
    let hp = 0;
    this.tareasColaboradores.forEach(tarea => {
      if (tarea.idColab == id && tarea.proyecto == proyecto && tarea.fechaPlanificacion.getMonth() == this._colaboradorService.getMesDate(mes)) {
        hp += tarea.horasPlanificadas
      }
    });
    return hp;
  }

  getCapacidadColaborador(id: number) {
    let cap = 0;
    this.colaboradores.forEach(colab => {
      if (colab.id == id) {
        cap = colab.capacidad;
      }
    });
    return cap;
  }

  getPorcentajeDisponibleMensual(id: number, mes: string) {
    let hp = 0;
    this.tareasColaboradores.forEach(tarea => {
      if (tarea.idColab == id && tarea.fechaPlanificacion.getMonth() == this._colaboradorService.getMesDate(mes)) {
        hp += tarea.horasPlanificadas;
      }
    });
    this.colaboradores.forEach(colab => {
      if (colab.id == id) {
        colab.horasPlanificadas = hp;
      }
    });
    return Math.round(((this.getCapacidadColaborador(id)-hp)/this.getCapacidadColaborador(id)*100));
  }

  getTooltipHsPlanMensual(id: number, mes: string) {
    let hp = 0;
    this.tareasColaboradores.forEach(tarea => {
      if (tarea.idColab == id && tarea.fechaPlanificacion.getMonth() == this._colaboradorService.getMesDate(mes)) {
        hp += tarea.horasPlanificadas;
      }
    });
    this.colaboradores.forEach(colab => {
      if (colab.id == id) {
        colab.horasPlanificadas = hp;
      }
    });
    return hp;
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
    // agregar comportamiento para contraer todos los expansion panel abiertos
  }

  dispararCambioOrdenDesdePlantilla(e: Event) {
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

  cambioFechaHasta(event: any) {
    this.fechaHastaDate = event.value;
    this.mesesMostrados = this.getDiferenciaMeses(this.fechaHoy, this.fechaHastaDate);
    // aca actualizar variable global mesesPlanificacion (pushearle el obj con otros meses mostrados)
    this.getTiempoDisponibleColaboradores();
    this.actualizarDisponibilidadEquipo();
    this.cambiarOrden();
  }

  actualizarDisponibilidadEquipo() {
    let horasPlanificadasAcumuladas = 0;
    let capacidadTotalAcumulada = 0;
    this.colaboradores.forEach(colab => {
      horasPlanificadasAcumuladas += colab.horasPlanificadas;
      capacidadTotalAcumulada += colab.capacidad;
    });
    this.disponibilidadEquipo = Math.round(this.disponibilidadEquipo = (capacidadTotalAcumulada-horasPlanificadasAcumuladas)/capacidadTotalAcumulada*100);
  }

  getTooltipHsDispTotales() {
    let horasPlanificadasAcumuladas = 0;
    let capacidadTotalAcumulada = 0;
    this.colaboradores.forEach(colab => {
      horasPlanificadasAcumuladas += colab.horasPlanificadas;
      capacidadTotalAcumulada += colab.capacidad;
    });
    return (capacidadTotalAcumulada-horasPlanificadasAcumuladas);
  }
  
  getTooltipHsCapTotales() {
    let capacidadTotalAcumulada = 0;
    this.colaboradores.forEach(colab => {
      capacidadTotalAcumulada += colab.capacidad;
    });
    return capacidadTotalAcumulada;
  }

  getTiempoDisponibleColaboradores() {
    this.colaboradores.forEach(colab => {
      switch (this.mesesMostrados) {
        case 0:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          break;
        // agregar escenarios para mas meses mostrados
      }
    });
  }  

  getDiferenciaMeses(mesInicio: Date, mesFin: Date) {
    return mesFin.getMonth() - mesInicio.getMonth() + (12 * (mesFin.getFullYear() - mesInicio.getFullYear()));
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

}