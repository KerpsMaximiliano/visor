import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProyectoDataService } from '../../services/i2t/proyecto-data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Proyecto } from '../../interfaces/proyecto';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FiltroProyectosComponent } from '../../shared/modal-filtro-proyectos/filtro-proyectos/filtro-proyectos.component';
import { MatAccordion } from '@angular/material/expansion';
import { ViewChild } from '@angular/core';

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

  data = new MatTableDataSource(this.dataProyecto.proyectos);
  proyectos: Proyecto[];
  displayedColumns: string[] = ['nombre','tareasATiempo','tareasAtrasadas'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Proyecto;
  disponibilidadProyectos: number = 0;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  
  //Variables del filtro
  numero: string = "";
  cliente: string = "";
  asignadoA: string = "";
  nombre: string = "";


  constructor(private dataProyecto: ProyectoDataService, private dialog: MatDialog) {
    this.proyectos = this.dataProyecto.proyectos;
  }

  ngOnInit(): void {
    this.actualizarDisponibilidadProyecto();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  retornarPorcentajeCompletadas(index: number): number{
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
  }

  retornarPorcentajeAvanceFuncionalCompletadas(index: number): number{
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

  getTooltipTareasAbiertasTotales(){
    return this.dataProyecto.getCantidadTareasAbiertas();
  }

  getTooltipTareasAnteriores(){
    return this.dataProyecto.getCantidadTareasAnteriores();
  }

  actualizarDisponibilidadProyecto(){
    this.disponibilidadProyectos = Math.round((this.getTooltipTareasAnteriores() / this.getTooltipTareasAbiertasTotales()) * 100);
  }

  openFiltro(){
    const dialogRef = this.dialog.open(FiltroProyectosComponent, {
      width: '400px',
      disableClose: true,
      data: { numero: this.numero, nombre: this.nombre, cliente: this.cliente, asignadoA: this.asignadoA}
    });
  }

  contraerProyectos(){
    this.accordion.closeAll();
  }
}
