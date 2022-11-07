import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalFiltroComponent } from '../modal-filtro/modal-filtro.component';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { Colaborador } from 'src/app/interfaces/colaborador';
import { ColaboradorService } from 'src/app/services/i2t/colaborador.service';
import { FiltroService } from 'src/app/services/i2t/filtro.service';
import { end } from '@popperjs/core';
import { filter } from 'rxjs';
import { Pipe, PipeTransform } from "@angular/core";

@Component({
  selector: 'app-inicio-disponibilidad-colaboradores',
  templateUrl: './inicio-disponibilidad-colaboradores.component.html',
  styleUrls: ['./inicio-disponibilidad-colaboradores.component.css']
})
export class InicioDisponibilidadColaboradoresComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  colaboradoresSP: any[] = [];
  planificacion: any[] = [];
  colaboradores: Colaborador[] = [];
  colaboradores2: Colaborador[] = [];
  columna1!: Colaborador[];
  columna2!: Colaborador[];
  dataSource!: any;
  noHayColaboradores = false;
  colaboradorUnico = false;
  inputIzq = '';
  nombre = '';
  apellido = '';
  funcion = '';
  modal_saved_search_id = '';
  orden = ['Alfabetico', 'Tiempo Disponible'];
  ordenSeleccion = 'Tiempo Disponible';
  orden_saved_search_id = '';
  fechaHoy = new Date();
  fechaHastaDate = new Date();
  mesesMostrados = 0;
  disponibilidadEquipo = 0;
  mesesPlanificacion = [{mes: ''}];
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  position2 = new FormControl(this.positionOptions[3]);
  mesFechaElegida: number;
  anioFechaElegida: number;
  diaFechaElegida: number;

  constructor(private _colaboradorService: ColaboradorService, private dialog: MatDialog, private _filtroService: FiltroService) {
    this.mesFechaElegida = 0;
    this.anioFechaElegida = 0;
    this.diaFechaElegida = 0;
  }

  ngOnInit(): void {
    this._filtroService.getUserId(localStorage.getItem('usuario')!).subscribe((response: any) => {
      localStorage.setItem('userId', response.dataset[0].id);
      this._filtroService.selectFiltro(response.dataset[0].id, 'disponibilidad').subscribe((resp: any) => {
        if (resp.dataset.length == 0 ) {
        } else {
          console.log('hay datos', resp);
          resp.dataset.forEach((filtro: any) => {
            if (filtro.nombre == 'filtro_orden') {
              this.orden_saved_search_id = filtro.saved_search_id;
              const contenido = JSON.parse(atob(filtro.contenido));
              this.ordenSeleccion = contenido.ordenSeleccion; 
            }
            if (filtro.nombre == 'filtro_nombre_apellido_funcion') {
              this.modal_saved_search_id = filtro.saved_search_id;
              const contenido = JSON.parse(atob(filtro.contenido));
              this.nombre = contenido.nombre;
              this.apellido = contenido.apellido;
              this.completo = contenido.nombre + ' ' + contenido.apellido;
              this.funcion = contenido.funcion;
            }
          });
        } 
      this.mesesPlanificacion[0].mes = this._colaboradorService.getMesString(this.fechaHoy.getMonth());
      this.setearFecha(this.fechaHoy);
      this._colaboradorService.disponibilidadUsuario(1, 1, this.mesFechaElegida, this.anioFechaElegida).subscribe((response: any) => {
        this.colaboradoresSP = response.dataset;
        this.organizarColaboradores();
        this.getTareasAtrasadas();
        this.getPlanificacionColaboradores();
        this.prepararFiltro();
      });
      });
    });
  }

/* 
  //No se utiza debido a una refactorización en el componente.

  formatearFecha(fecha: Date) {
    this.anioFechaElegida = fecha.getFullYear();
    this.mesFechaElegida = fecha.getMonth();
    const anio = fecha.getFullYear().toString();
    let mes: string = '';
    let mesN = fecha.getMonth()+1;
    if (mesN<10) { mes = '0'+mesN } else { mes = ''+mesN }
    let dia: string = '';
    let diaN = fecha.getDate();
    if (diaN<10) { dia = '0'+diaN } else { dia = ''+diaN }
    return anio+'-'+mes+'-'+dia;
  }  */

  //Nuevo método para el formato de la fecha.
  setearFecha(fecha: Date) {
    this.anioFechaElegida = fecha.getFullYear();
    this.mesFechaElegida = fecha.getMonth();
  } 

  organizarColaboradores() {
    this.colaboradores = [];
    let contId = 1;
    this.colaboradoresSP.forEach(colab => {
      this.colaboradores.push({
        id: colab.id_usuario,
        nombre: colab.nombre,
        apellido: colab.apellido,
        funcion: this.funcionCheck(colab.funcion_usuario),
        capacidad: this.nullCheck(colab.capacidad_total),
        horasPlanificadas: colab.horas_asignadas,
        tiempoDisponible: 0,
        atrasadas: 0,
        horasAtrasadas: 0,
        idFiltro: contId
      });
      contId++;
    });
    this.dataSource = new MatTableDataSource(this.colaboradores);
    this.completo = this.dataSource.nombre + ' ' + this.dataSource.apellido;
  }

  nullCheck(check: any) {
    if (check == null) { return 0 } else { return check }
  }

  funcionCheck(funcion: string) {  // agregar comportamiento para otras funciones, no hay datos de como vienen
    let func = funcion;
    switch (funcion) {
      case 'Operativo':
        func = 'Desarrollador'
        break;
      case 'Supervisor':
        func = 'Analista Funcional'  // analista tecnico viene como supervisor ??
        break;
    }
    return func;
  }

  getTareasAtrasadas() {
    this.setearFecha(this.fechaHoy);
    this._colaboradorService.disponibilidadUsuario(2, 1, this.mesFechaElegida, this.anioFechaElegida).subscribe((response: any) => {
      response.dataset.forEach((obj: any) => {
        this.colaboradores.forEach(colab => {
          if (obj.id_usuario == colab.id) { colab.atrasadas = obj.tareas_atrasadas }
        });
      });
    });
    this.setearFecha(this.fechaHoy);
    this._colaboradorService.disponibilidadUsuario(4, 1,this.mesFechaElegida, this.anioFechaElegida).subscribe((response: any) => {
      response.dataset.forEach((obj: any) => {
        this.colaboradores.forEach(colab => {
          if (obj.id_usuario == colab.id) { colab.horasAtrasadas = obj.horas }
        });
      });
    });
  }

  getPlanificacionColaboradores() {
    this.setearFecha(this.fechaHoy);
    this._colaboradorService.disponibilidadUsuario(5, this.mesesMostrados+1, this.mesFechaElegida+1, this.anioFechaElegida).subscribe((resp: any) => {
      resp.dataset.forEach((colab: any) => {
        this.planificacion.push({ id: colab.id_usuario, proyecto: colab.nombre_proyecto, mes: colab.mes-1, horas_planificadas: colab.horas_planificadas });
      });
    });
    this.planificacion = [];
  }

  calcularPorcentajeTiempoDisponible(id: any) {
    let ptd = 0;
    this.colaboradores.forEach(colab => {
      if (colab.id == id) {
        const cp = colab.capacidad;
        const hp = colab.horasPlanificadas;
        ptd = Math.round((cp-hp)/cp*100);
      }
    });
    return ptd;
  }

  actualizarDisponibilidadEquipo() {
    let horasPlanificadasAcumuladas = 0;
    let capacidadTotalAcumulada = 0;
    this.colaboradores.forEach(colab => {
      horasPlanificadasAcumuladas += colab.horasPlanificadas;
      capacidadTotalAcumulada += colab.capacidad;
      colab.tiempoDisponible = Math.round((colab.capacidad-colab.horasPlanificadas)/colab.capacidad*100);
    });
    this.disponibilidadEquipo = Math.round(this.disponibilidadEquipo = (capacidadTotalAcumulada-horasPlanificadasAcumuladas)/capacidadTotalAcumulada*100);
  }

  dispararCambioOrdenDesdePlantilla(e: Event) {
    this.ordenSeleccion = (e.target as HTMLElement).innerText;
    const contenido: string = JSON.stringify({ ordenSeleccion : this.ordenSeleccion });
    const encodedData = btoa(contenido);
    if (this.orden_saved_search_id == '') {
      this._filtroService.insertFiltro(
        localStorage.getItem('userId')!,
        'disponibilidad',
        'filtro_orden',
        encodedData,
        'Filtra los colaboradores por orden alfabetico o tiempo disponible').subscribe((rsp: any) => {
          console.log('Filtro guardado: ', rsp);
          this.cambiarOrden();
          this.contraerColaboradores();
        });
    } else {
      this._filtroService.updateFiltro(this.orden_saved_search_id, encodedData).subscribe((rsp: any) => {
        console.log('Filtro actualizado: ', rsp);
        this.cambiarOrden();
        this.contraerColaboradores();
      });
    }
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

  ordenarColaboradores() {
    let tamanioCol1:number;
    tamanioCol1 = Math.round(tamanioCol1 = this.colaboradores.length / 2);
    this.columna1 = this.colaboradores.slice(0, tamanioCol1);
    this.columna2 = this.colaboradores.slice(tamanioCol1, this.colaboradores.length);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  
    localStorage.setItem('fv',filterValue);
    let ls = localStorage.getItem('fv');
    this.contraerColaboradores();
    this.organizarColaboradores();
    this.getTareasAtrasadas();
    let colaboradoresFiltro: any[] = [];

    //let FV = filterValue.split(" ",3);

    console.log("colaboradores 1",this.colaboradores);
    console.log("colaboradores 2",this.colaboradores2);
    this.colaboradores.forEach(colab => {
      colaboradoresFiltro.push({ nombre: colab.nombre, apellido: colab.apellido });
    });

    this.dataSource = new MatTableDataSource(colaboradoresFiltro);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    colaboradoresFiltro = this.dataSource.filteredData;
    console.log("filterValue",filterValue);

    let arrayAux: Colaborador[] = [];
     

      this.colaboradores.forEach(colab => {
          colaboradoresFiltro.forEach(user => {
            if (colab.nombre == user.nombre && colab.apellido == user.apellido) {
              this.colaboradores2.push(colab);
              arrayAux.push(colab);
            }
          });
        });

        
      
      
    this.colaboradores = arrayAux;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    if (this.colaboradores.length == 0) {
      this.colaboradorUnico = false;
      this.noHayColaboradores = true;
      this.disponibilidadEquipo = 0;
    } else if (this.colaboradores.length == 1) {
      this.colaboradorUnico = true;
      this.noHayColaboradores = false;
      this.actualizarDisponibilidadEquipo();
      this.cambiarOrden();
    } else {
      this.colaboradorUnico = false;
      this.noHayColaboradores = false;
      this.actualizarDisponibilidadEquipo();
      this.cambiarOrden();
    }
  }

  abrirModalFiltro() {
    this.contraerColaboradores();
    this.organizarColaboradores();
    this.getTareasAtrasadas();
    const dialogRef = this.dialog.open(ModalFiltroComponent, {
      width: '400px',
      disableClose: true,
      data: { nombre: this.nombre, apellido: this.apellido,funcion: this.funcion, search_id: this.modal_saved_search_id }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.inputIzq = '';
      this.nombre = result.nombre;
      this.apellido = result.apellido;
      this.funcion = result.seleccion;
      let filtrar = result.filtrar;
      if (result.limpiar) { filtrar = true }
      if (filtrar) {
        this.prepararFiltro();
      }
    });
  }

  prepararFiltro() {
    const filtroNombre = this.filtroAvanzado(1, this.nombre);
    const filtroApellido = this.filtroAvanzado(2, this.apellido);
    const filtroFuncion = this.filtroAvanzado(3, this.funcion);
    this.colaboradores = this.buscarCoincidencias(filtroNombre, filtroApellido, filtroFuncion);
    this.aplicarFiltros();
  }

  filtroAvanzado(tipo: number, valor: string) {
    let arrayTemp: any = [];
    let arrayTabla: any;
    switch (tipo) {
      case 1:
        this.colaboradores.forEach(colab => {
          let obj = { id: colab.idFiltro, nombre: colab.nombre };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 2:
        this.colaboradores.forEach(colab => {
          let obj = { id: colab.idFiltro, apellido: colab.apellido };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 3:
        this.colaboradores.forEach(colab => {
          let obj = { id: colab.idFiltro, funcion: colab.funcion };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
    }
  }

  buscarCoincidencias(arrayNombre: any, arrayApellido: any, arrayFuncion: any) {
    let encontrados: any = [];
    this.colaboradores.forEach(colab => {
      let encontradoNombre = false;
      let encontradoApellido = false;
      let encontradoFuncion = false;
      arrayNombre.forEach((element: any) => {
        if (element.id === colab.idFiltro) {
          encontradoNombre = true;
        }
      });
      arrayApellido.forEach((element: any) => {
        if (element.id === colab.idFiltro) {
          encontradoApellido = true;
        }
      });
      arrayFuncion.forEach((element: any) => {
        if (element.id === colab.idFiltro) {
          encontradoFuncion = true;
        }
      });
      if (encontradoNombre && encontradoApellido && encontradoFuncion) {
        encontrados.push(colab);
      }
    });
    return encontrados;
  }

  cambioFechaHasta(event: any) {
    this.contraerColaboradores();
    this.fechaHastaDate = event.value;
    this.mesesMostrados = this.getDiferenciaMeses(this.fechaHoy, this.fechaHastaDate);
    this.actualizarMesesPlanificacion();
    this.setearFecha(this.fechaHoy);
    this._colaboradorService.disponibilidadUsuario(1, this.mesesMostrados+1, this.mesFechaElegida, this.anioFechaElegida).subscribe((response: any) => {
      this.colaboradoresSP = response.dataset;
      this.organizarColaboradores();
      this.getTareasAtrasadas();
      this.getPlanificacionColaboradores();
      this.prepararFiltro();
    });
  }

  contraerColaboradores() {
    if (!this.noHayColaboradores) { this.accordion.closeAll(); }
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

  getTooltipHsDispTotales() {
    let horasPlanificadasAcumuladas = 0;
    let capacidadTotalAcumulada = 0;
    this.colaboradores.forEach(colab => {
      horasPlanificadasAcumuladas += colab.horasPlanificadas;
      capacidadTotalAcumulada += colab.capacidad;
    });
    return (capacidadTotalAcumulada - horasPlanificadasAcumuladas);
  }
  
  getTooltipHsCapTotales() {
    let capacidadTotalAcumulada = 0;
    this.colaboradores.forEach(colab => {
      capacidadTotalAcumulada += colab.capacidad;
    });
    return capacidadTotalAcumulada;
  }

  getPorcentajeDisponibleMensual(id: string, mes: string, capacidad: number) {
    let hp = 0;
    this.planificacion.forEach(tarea => {
      if (tarea.id == id && tarea.mes == this._colaboradorService.getMesDate(mes)) {
        hp += tarea.horas_planificadas;
      }
    });
    return Math.round(((capacidad-hp)/capacidad*100));
  }

  getTooltipHsPlanMensual(id: string, mes: string) {
    let hp = 0;
    this.planificacion.forEach(tarea => {
      if (tarea.id == id && tarea.mes == this._colaboradorService.getMesDate(mes)) {
        hp += tarea.horas_planificadas;
      }
    });
    return hp;
  }

  separarProyectosDelMes(id: string, mes: string) {
    let proyectos:any = [];
    this.planificacion.forEach(tarea => {
      if (tarea.id == id && tarea.mes == this._colaboradorService.getMesDate(mes)) {
        if (proyectos.indexOf(tarea.proyecto) == -1) {
          proyectos.push(tarea.proyecto);
        }
      }
    });
    //console.log(this.planificacion)
    return proyectos;
  }

  getPorcentajeOcupadoMensualProyecto(proyecto: string, id: string, mes: string, capacidad: number) {
    let hp = 0;
    this.planificacion.forEach(tarea => {
      if (tarea.id == id && tarea.proyecto == proyecto && tarea.mes == this._colaboradorService.getMesDate(mes)) {
        hp = tarea.horas_planificadas;
      }
    });
    return Math.round(hp/capacidad*100);
  }

  getTooltipHsPlanProyecto(proyecto: string, id: string, mes: string) {
    let hp = 0;
    this.planificacion.forEach(tarea => {
      if (tarea.id == id && tarea.proyecto == proyecto && tarea.mes == this._colaboradorService.getMesDate(mes)) {
        hp = tarea.horas_planificadas;
      }
    });
    return hp;
  }

  getDiferenciaMeses(mesInicio: Date, mesFin: Date) {
    return mesFin.getMonth() - mesInicio.getMonth() + (12 * (mesFin.getFullYear() - mesInicio.getFullYear()));
  }

}