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
  mesesPlanificacion = [{mes: ''}];
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  position2 = new FormControl(this.positionOptions[3]);

  nombre?: string;
  apellido?: string;
  funcion?: string;

  constructor(private _colaboradorService: ColaboradorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.mesesPlanificacion[0].mes = this._colaboradorService.getMesString(this.fechaHoy.getMonth());
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

  getHorasPlanColab(id: number, mes: string) {
    let hp = 0;
    this.tareasColaboradores.forEach(tarea => {
      if (tarea.idColab == id && tarea.fechaPlanificacion.getMonth() == this._colaboradorService.getMesDate(mes)) {
        hp += tarea.horasPlanificadas;
      }
    });
    return hp;
  }

  getPorcentajeDisponibleMensual(id: number, mes: string) {
    let hp = 0;
    this.tareasColaboradores.forEach(tarea => {
      if (tarea.idColab == id && tarea.fechaPlanificacion.getMonth() == this._colaboradorService.getMesDate(mes)) {
        hp += tarea.horasPlanificadas;
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
    // llamar a contraerColaboradores() antes de cambiar los datos
    this.fechaHastaDate = event.value;
    this.mesesMostrados = this.getDiferenciaMeses(this.fechaHoy, this.fechaHastaDate);
    this.actualizarMesesPlanificacion();
    this.getTiempoDisponibleColaboradores();
    this.actualizarDisponibilidadEquipo();
    this.cambiarOrden();
  }

  actualizarDisponibilidadEquipo() {
    let horasPlanificadasAcumuladas = 0;
    let capacidadTotalAcumulada = 0;
    this.colaboradores.forEach(colab => {
      horasPlanificadasAcumuladas += colab.horasPlanificadas;
      capacidadTotalAcumulada += colab.capacidad*(this.getDiferenciaMeses(this.fechaHoy, this.fechaHastaDate)+1);
    });
    this.disponibilidadEquipo = Math.round(this.disponibilidadEquipo = (capacidadTotalAcumulada-horasPlanificadasAcumuladas)/capacidadTotalAcumulada*100);
  }

  getTooltipHsDispTotales() {
    let horasPlanificadasAcumuladas = 0;
    let capacidadTotalAcumulada = 0;
    this.colaboradores.forEach(colab => {
      horasPlanificadasAcumuladas += colab.horasPlanificadas;
      capacidadTotalAcumulada += colab.capacidad*(this.getDiferenciaMeses(this.fechaHoy, this.fechaHastaDate)+1);
    });
    return (capacidadTotalAcumulada - horasPlanificadasAcumuladas);
  }
  
  getTooltipHsCapTotales() {
    let capacidadTotalAcumulada = 0;
    this.colaboradores.forEach(colab => {
      capacidadTotalAcumulada += colab.capacidad;
    });
    return capacidadTotalAcumulada * (this.getDiferenciaMeses(this.fechaHoy, this.fechaHastaDate)+1);
  }

  getTiempoDisponibleColaboradores() {
    this.colaboradores.forEach(colab => {
      switch (this.mesesMostrados) {
        case 0:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          break;
        case 1:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[1].mes);
          colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[1].mes);
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 2);
          break;
        case 2:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[1].mes);
          colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[1].mes);
          colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[2].mes);
          colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[2].mes);
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 3);
          console.log(colab)
          break;
        case 3:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          let repeater = [{x:1},{x:2},{x:3}]; repeater.forEach(it => {
            colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[it.x].mes);
            colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[it.x].mes);});
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 4);
          break;
        case 4:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          let repeater2 = [{x:1},{x:2},{x:3},{x:4}]; repeater2.forEach(it => {
            colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[it.x].mes);
            colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[it.x].mes);});
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 5);
          break;
        case 5:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          let repeater3 = [{x:1},{x:2},{x:3},{x:4},{x:5}]; repeater3.forEach(it => {
            colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[it.x].mes);
            colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[it.x].mes);});
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 6);
          break;
        case 6:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          let repeater4 = [{x:1},{x:2},{x:3},{x:4},{x:5},{x:6}]; repeater4.forEach(it => {
            colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[it.x].mes);
            colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[it.x].mes);});
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 7);
          break;
        case 7:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          let repeater5 = [{x:1},{x:2},{x:3},{x:4},{x:5},{x:6},{x:7}]; repeater5.forEach(it => {
            colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[it.x].mes);
            colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[it.x].mes);});
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 8);
          break;
        case 8:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          let repeater6 = [{x:1},{x:2},{x:3},{x:4},{x:5},{x:6},{x:7},{x:8}]; repeater6.forEach(it => {
            colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[it.x].mes);
            colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[it.x].mes);});
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 9);
          break;        
        case 9:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          let repeater7 = [{x:1},{x:2},{x:3},{x:4},{x:5},{x:6},{x:7},{x:8},{x:9}]; repeater7.forEach(it => {
            colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[it.x].mes);
            colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[it.x].mes);});
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 10);          
          break;
        case 10:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          let repeater8 = [{x:1},{x:2},{x:3},{x:4},{x:5},{x:6},{x:7},{x:8},{x:9},{x:10}]; repeater8.forEach(it => {
            colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[it.x].mes);
            colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[it.x].mes);});
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 11);
          break;
        case 11:
          colab.tiempoDisponible = this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[0].mes);
          colab.horasPlanificadas = this.getHorasPlanColab(colab.id, this.mesesPlanificacion[0].mes);
          let repeater9 = [{x:1},{x:2},{x:3},{x:4},{x:5},{x:6},{x:7},{x:8},{x:9},{x:10},{x:11}]; repeater9.forEach(it => {
            colab.tiempoDisponible += this.getPorcentajeDisponibleMensual(colab.id, this.mesesPlanificacion[it.x].mes);
            colab.horasPlanificadas += this.getHorasPlanColab(colab.id, this.mesesPlanificacion[it.x].mes);});
          colab.tiempoDisponible = Math.round(colab.tiempoDisponible /= 12);
          break;
      }
    });
  }  

  getDiferenciaMeses(mesInicio: Date, mesFin: Date) {
    return mesFin.getMonth() - mesInicio.getMonth() + (12 * (mesFin.getFullYear() - mesInicio.getFullYear()));
  }

  actualizarMesesPlanificacion() {
    this.mesesPlanificacion = [];
    switch (this.mesesMostrados) {
      case 0:
        this.mesesPlanificacion[0] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()) };
        break;
      case 1:
        for (let x=0;x<2;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
      case 2:
        for (let x=0;x<3;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
      case 3:
        for (let x=0;x<4;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
      case 4:
        for (let x=0;x<5;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
      case 5:
        for (let x=0;x<6;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
      case 6:
        for (let x=0;x<7;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
      case 7:
        for (let x=0;x<8;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
      case 8:
        for (let x=0;x<9;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
      case 9:
        for (let x=0;x<10;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
      case 10:
        for (let x=0;x<11;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
      case 11:
        for (let x=0;x<12;x++) { this.mesesPlanificacion[x] = { mes: this._colaboradorService.getMesString(this.fechaHoy.getMonth()+x)} };
        break;
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

}