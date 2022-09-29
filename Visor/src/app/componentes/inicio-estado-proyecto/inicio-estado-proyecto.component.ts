import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProyectoDataService } from '../../services/i2t/proyecto-data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Proyecto } from '../../interfaces/proyecto';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FiltroProyectosComponent } from '../../shared/modal-filtro-proyectos/filtro-proyectos/filtro-proyectos.component';
import { ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-inicio-estado-proyecto',
  templateUrl: './inicio-estado-proyecto.component.html',
  styleUrls: ['./inicio-estado-proyecto.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InicioEstadoProyectoComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  data: any;
  proyectos: Proyecto[] = [];
  displayedColumns: string[] = ['nombre','tareasATiempo','tareasAtrasadas'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Proyecto;
  disponibilidadProyectos: number = 0;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  noHayProyectos: boolean = false;

  //Variables del filtro
  numero: string = "";
  cliente: string = "";
  asignadoA: string = "";
  nombre: string = "";
  inputIzq: string = "";


  constructor(private dataProyecto: ProyectoDataService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataProyecto.getProyectos().subscribe((resp: any) => {
      if(resp.returnset[0].RCode == 1){
        for(let i = 0;i<resp.dataset.length;i++){
          let objetoTemporal: Proyecto = {
            numero: resp.dataset[i].Id_Caso,
            nombre: resp.dataset[i].Caso,
            cliente: "",
            asignado: "",
            porcentajeTareasAtrasadas: 0,
            porcentajeTareasATiempo: 0,
            porcentajeHPCompletadas: 0,
            porcentajeHPEnProgreso: 0,
            porcentajeHPEnPrueba: 0,
            porcentajeHPNoIniciadas: 0
          }
          this.proyectos.push(objetoTemporal);
        }
        this.data = new MatTableDataSource(this.proyectos);
      }
      });
    /* this.actualizarDisponibilidadProyecto(); */
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  /* retornarPorcentajeCompletadas(index: number): number{
    return this.dataProyecto.proyectos[index].porcentajeHPCompletadas;
  }

  retornarPorcentajeNoIniciadas(index: number){
    return this.dataProyecto.proyectos[index].porcentajeHPNoIniciadas;
  }

  retornarPorcentajeEnProgreso(index: number){
    return this.dataProyecto.proyectos[index].porcentajeHPEnProgreso;
  }

  retornarPorcentajeEnPrueba(index: number): number{
    return this.dataProyecto.proyectos[index].porcentajeHPEnPrueba;
  } */

  /* retornarPorcentajeAvanceFuncionalCompletadas(index: number): number{
    return this.dataProyecto.proyectos[index].avanceDisenioFuncional.porcentajeCompletadas  
  }

  retornarPorcentajeAvanceFuncionalNoIniciadas(index: number): number{
    return this.dataProyecto.proyectos[index].avanceDisenioFuncional.porcentajeNoIniciadas;
  }

  retornarPorcentajeAvanceFuncionalEnProgreso(index: number): number{
    return this.dataProyecto.proyectos[index].avanceDisenioFuncional.porcentajeEnProgreso;
  }

  retornarPorcentajeAvanceFuncionalEnPrueba(index: number): number{
    return this.dataProyecto.proyectos[index].avanceDisenioFuncional.porcentajeEnPrueba;
  } */

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

 /*  getTooltipTareasAbiertasTotales(){
    return this.dataProyecto.getCantidadTareasAbiertas();
  }

  getTooltipTareasAnteriores(){
    return this.dataProyecto.getCantidadTareasAnteriores();
  }
 */
  /* actualizarDisponibilidadProyecto(){
    this.disponibilidadProyectos = Math.round((this.getTooltipTareasAnteriores() / this.getTooltipTareasAbiertasTotales()) * 100);
  } */

  openFiltro(){
    //this.proyectos = this.dataProyecto.proyectos;
    const dialogRef = this.dialog.open(FiltroProyectosComponent, {
      width: '400px',
      disableClose: true,
      data: { numero: this.numero, nombre: this.nombre, cliente: this.cliente, asignadoA: this.asignadoA}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.numero = result.numero;
      this.nombre = result.nombre;
      this.cliente = result.cliente;
      this.asignadoA = result.asignadoA;
      
      let filtrar = result.filtrar;
      if (result.limpiar) { this.inputIzq = '', filtrar = true }
      if (filtrar) {
        const filtroNumero = this.filtroAvanzado(1, this.numero);
        const filtroNombre = this.filtroAvanzado(2, this.nombre);
        const filtroCliente = this.filtroAvanzado(3, this.cliente);
        const filtroAsignado = this.filtroAvanzado(4, this.asignadoA);
        this.data = this.buscarCoincidencias(filtroNumero, filtroNombre, filtroCliente, filtroAsignado);
        this.proyectos = this.buscarCoincidencias(filtroNumero, filtroNombre, filtroCliente, filtroAsignado);
        this.aplicarFiltros();
      }
    });
  }

  private aplicarFiltros() {
    if (this.proyectos.length == 0) {
      this.noHayProyectos = true;
    } 
    else {
      this.noHayProyectos = false;
    }
  }

  private filtroAvanzado(tipo: number, valor: string) {
    let arrayTemp: any = [];
    let arrayTabla: any;
    switch (tipo) {
      case 1:
        this.proyectos.forEach(project => {
          let obj = { numero: project.numero };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      
        case 2:
        this.proyectos.forEach(project => {
          let obj = { numero: project.numero, nombre: project.nombre };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
        
        case 3:
        this.proyectos.forEach(project => {
          let obj = { numero: project.numero, cliente: project.cliente };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;

        case 4:
          this.proyectos.forEach(project => {
            let obj = { numero: project.numero, asignado: project.asignado };
            arrayTemp.push(obj);
          });
          arrayTabla = new MatTableDataSource(arrayTemp);
          arrayTabla.filter = valor.trim().toLowerCase();
          arrayTemp = arrayTabla.filteredData;
          return arrayTemp;
    }
  }

  private buscarCoincidencias(arrayNumero: any, arrayNombre: any, arrayCliente: any, arrayAsignado: any) {
    let encontrados: any = [];
    this.proyectos.forEach(project => {
      let encontradoNumero = false;
      let encontradoNombre = false;
      let encontradoCliente = false;
      let encontradoAsignado = false;

      arrayNumero.forEach((element: any) => {
        if (element.numero === project.numero) {
          encontradoNumero = true;
          console.log("hola numero");
        }
      });
      arrayNombre.forEach((element: any) => {
        if (element.numero === project.numero) {
          encontradoNombre = true;
        }
      });
      arrayCliente.forEach((element: any) => {
        if (element.numero === project.numero) {
          encontradoCliente = true;
        }
      });
      arrayAsignado.forEach((element: any) => {
        if (element.numero === project.numero) {
          encontradoAsignado = true;
        }
      });
      if (encontradoNumero && encontradoNombre && encontradoCliente && encontradoAsignado) {
        encontrados.push(project);
      }
    });
    console.log(encontrados)
    return encontrados;
  }

  /* cambiarOrden() {
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
  } */

  contraerProyectos(){
    this.accordion.closeAll();
  }
}
