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

@Component({
  selector: 'app-inicio-disponibilidad-colaboradores2',
  templateUrl: './inicio-disponibilidad-colaboradores2.component.html',
  styleUrls: ['./inicio-disponibilidad-colaboradores2.component.css']
})
export class InicioDisponibilidadColaboradores2Component implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  colaboradoresSP: any[] = [];
  colaboradores: Colaborador[] = [];
  dataSource!: any;
  columna1!: Colaborador[];
  columna2!: Colaborador[];
  noHayColaboradores: boolean = false;
  colaboradorUnico: boolean = false;
  inputIzq: string = '';
  nombre: string = ''; // se tiene que guardar en las preferencias del usuario en sesion cuando este disponible
  apellido: string = ''; // se tiene que guardar en las preferencias del usuario en sesion cuando este disponible
  funcion: string = ''; // se tiene que guardar en las preferencias del usuario en sesion cuando este disponible
  orden: string[] = ['Alfabetico', 'Tiempo Disponible'];
  ordenSeleccion: string = 'Tiempo Disponible'; // se tiene que guardar en las preferencias del usuario en sesion cuando este disponible
  fechaHoy = new Date();
  fechaHastaDate = new Date();
  mesesMostrados: number = 0;
  disponibilidadEquipo: number = 0;
  mesesPlanificacion = [{mes: ''}];
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  position2 = new FormControl(this.positionOptions[3]);

  constructor(private _colaboradorService: ColaboradorService, private dialog: MatDialog, private _filtroService: FiltroService) { }

  ngOnInit(): void {
    this._filtroService.getUserId(localStorage.getItem('usuario')!).subscribe((response: any) => {
      localStorage.setItem('userId', response.dataset[0].id);

    });
    this.mesesPlanificacion[0].mes = this._colaboradorService.getMesString(this.fechaHoy.getMonth());
    this._colaboradorService.disponibilidadUsuario(1, 1, '2022-10-29' /* this.formatearFecha(this.fechaHoy) */).subscribe((response: any) => {
      this.colaboradoresSP = response.dataset;
      this.organizarColaboradores();
      this.dataSource = new MatTableDataSource(this.colaboradores);
      this.getTareasAtrasadas();
      this.servicio3();
      this.servicio5();
      this.actualizarDisponibilidadEquipo();
      this.cambiarOrden();
    });
    const encodedData = btoa("Hello, world");
    console.log(encodedData);
    const decodedData = atob(encodedData);
    console.log(decodedData);
  }

  formatearFecha(fecha: Date) {
    const anio = fecha.getFullYear().toString();
    let mes: string = '';
    let mesN = fecha.getMonth()+1;
    if (mesN<10) { mes = '0'+mesN } else { mes = ''+mesN }
    let dia: string = '';
    let diaN = fecha.getDate();
    if (diaN<10) { dia = '0'+diaN } else { dia = ''+diaN }
    return anio+'-'+mes+'-'+dia;
  }

  organizarColaboradores() {
    this.colaboradores = [];
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
        horasAtrasadas: 0
      });
    });
    this.colaboradores.push({
      id: "b3f81a92-c3a6-0f6a-8ffe-5fecc55a882b",
      nombre: "Federico",
      apellido: "Gauchat",
      funcion: "Desarrollador",
      capacidad: 150,
      horasPlanificadas: 60,
      tiempoDisponible: 0,
      atrasadas: 0,
      horasAtrasadas: 0
    });
  }

  nullCheck(check: any) {
    if (check == null) { return 120 } else { return check }
  }

  funcionCheck(funcion: string) {  // agregar comportamiento para otras funciones, no hay datos de como vienen
    let func = funcion;
    switch (funcion) {
      case 'Operativo':
        func = 'Desarrollador'
        break;
    }
    return func;
  }

  getTareasAtrasadas() {
    this._colaboradorService.disponibilidadUsuario(2, 1, this.formatearFecha(this.fechaHoy)).subscribe((response: any) => {
      response.dataset.forEach((obj: any) => {
        this.colaboradores.forEach(colab => {
          if (obj.id_usuario == colab.id) { colab.atrasadas = obj.tareas_atrasadas }
        });
      });
    });
    this._colaboradorService.disponibilidadUsuario(4, 1, this.formatearFecha(this.fechaHoy)).subscribe((response: any) => {
      response.dataset.forEach((obj: any) => {
        this.colaboradores.forEach(colab => {
          if (obj.id_usuario == colab.id) { colab.horasAtrasadas = obj.horas }
        });
      });
    });
  }

  servicio3() {
    this._colaboradorService.disponibilidadUsuario(3, 1, '2022-10-29' /* this.formatearFecha(this.fechaHoy) */).subscribe((response: any) => {
      console.log(response.dataset);
    });
  }

  servicio5() {
    this._colaboradorService.disponibilidadUsuario(5, 1, '2022-10-29' /* this.formatearFecha(this.fechaHoy) */).subscribe((response: any) => {
      console.log(response.dataset);
    });
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
    this.cambiarOrden();
    this.contraerColaboradores();
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
    this.contraerColaboradores();
    this._colaboradorService.disponibilidadUsuario(1, this.mesesMostrados+1, '2022-10-29' /* this.formatearFecha(this.fechaHastaDate) */).subscribe((response: any) => {
      this.colaboradoresSP = response.dataset;
      this.organizarColaboradores();
      let colaboradoresFiltro: any[] = [];
      this.colaboradores.forEach(colab => {
        colaboradoresFiltro.push({ nombre: colab.nombre, apellido: colab.apellido });
      });
      this.dataSource = new MatTableDataSource(colaboradoresFiltro);
      this.dataSource.filter = filterValue.trim().toLowerCase();
    colaboradoresFiltro = this.dataSource.filteredData;
    let arrayAux: Colaborador[] = [];
    this.colaboradores.forEach(colab => {
      colaboradoresFiltro.forEach(user => {
        if (colab.nombre == user.nombre && colab.apellido == user.apellido) {
          arrayAux.push(colab);
        }
      });
    });
    this.colaboradores = arrayAux;
    this.getTareasAtrasadas();
    this.aplicarFiltros();
    });
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
    this._colaboradorService.disponibilidadUsuario(1, this.mesesMostrados+1, '2022-10-29' /* this.formatearFecha(this.fechaHastaDate) */).subscribe((response: any) => {
      this.colaboradoresSP = response.dataset;
      this.organizarColaboradores();
      const dialogRef = this.dialog.open(ModalFiltroComponent, {
        width: '400px',
        disableClose: true,
        data: { nombre: this.nombre, apellido: this.apellido, funcion: this.funcion }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.nombre = result.nombre;
        this.apellido = result.apellido;
        this.funcion = result.seleccion;
        let filtrar = result.filtrar;
        if (result.limpiar) { this.inputIzq = '', filtrar = true }
        if (filtrar) {
          const filtroNombre = this.filtroAvanzado(1, this.nombre);
          const filtroApellido = this.filtroAvanzado(2, this.apellido);
          const filtroFuncion = this.filtroAvanzado(3, this.funcion);
          this.colaboradores = this.buscarCoincidencias(filtroNombre, filtroApellido, filtroFuncion);
          this.aplicarFiltros();
        }
      });
    });
  }

  filtroAvanzado(tipo: number, valor: string) {
    let arrayTemp: any = [];
    let arrayTabla: any;
    switch (tipo) {
      case 1:
        this.colaboradores.forEach(colab => {
          let obj = { id: colab.id, nombre: colab.nombre };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 2:
        this.colaboradores.forEach(colab => {
          let obj = { id: colab.id, apellido: colab.apellido };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      case 3:
        this.colaboradores.forEach(colab => {
          let obj = { id: colab.id, funcion: colab.funcion };
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
        if (element.id === colab.id) {
          encontradoNombre = true;
        }
      });
      arrayApellido.forEach((element: any) => {
        if (element.id === colab.id) {
          encontradoApellido = true;
        }
      });
      arrayFuncion.forEach((element: any) => {
        if (element.id === colab.id) {
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
    // this.getTiempoDisponibleColaboradores();  // servicio nivel 3
    this.actualizarDisponibilidadEquipo();
    this.cambiarOrden();
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

  getDiferenciaMeses(mesInicio: Date, mesFin: Date) {
    return mesFin.getMonth() - mesInicio.getMonth() + (12 * (mesFin.getFullYear() - mesInicio.getFullYear()));
  }

}
