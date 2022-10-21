import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProyectoDataService } from '../../services/i2t/proyecto-data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Proyecto } from '../../interfaces/proyecto';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FiltroService } from '../../services/i2t/filtro.service';
import { FiltroProyectosComponent } from 'src/app/shared/modal-filtro-proyectos/filtro-proyectos/filtro-proyectos.component';

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
  proyectosAsignados: Proyecto[] = [];
  proyectosFiltrados: Proyecto[] = [];
  displayedColumns: string[] = ['nombre','tareasATiempo','tareasAtrasadas'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Proyecto;
  disponibilidadProyectos: number = 0;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  noHayProyectos: boolean = false;
  estado: boolean = false;
  orden_saved_search_id = '';
  modal_saved_search_id = '';
  misProyectos: boolean = false;
  proyectosAbiertos: boolean = false;
  
  //Información a mostrar.
  proyectos: Proyecto[] = [];
  proyectosAbiertosArray: Proyecto[] = [];
  proyectosTotalesArray: Proyecto[] = [];

  //Variables del filtro
  numero: string = "";
  cliente: string = "";
  asignadoA: string = "";
  nombre: string = "";
  inputIzq: string = "";
  filterValue: any;

  orden = ['Alfabetico', 'Tareas atrasadas', 'Tareas a tiempo'];
  ordenSeleccion = 'Alfabetico';


  constructor(private _dataProyecto: ProyectoDataService, private _dialog: MatDialog, private _filtroService: FiltroService) {
  }

  ngOnInit(): void {
    this._filtroService.getUserId(localStorage.getItem('usuario')!).subscribe((response: any) => {
      localStorage.setItem('userId', response.dataset[0].id);
      this._filtroService.selectFiltro(response.dataset[0].id, 'inicio-estado-proyecto').subscribe((resp: any) => {
        if (resp.dataset.length == 0) {
        } else {
          console.log('hay datos', resp);
          resp.dataset.forEach((filtro: any) => {
            if (filtro.nombre == 'filtro_abecedario') {
              this.orden_saved_search_id = filtro.saved_search_id;
              const contenido = JSON.parse(atob(filtro.contenido));
              this.ordenSeleccion = contenido.ordenSeleccion; 
            }
            if (filtro.nombre == 'filtro_tareasAtrasadas') {
              this.orden_saved_search_id = filtro.saved_search_id;
              const contenido = JSON.parse(atob(filtro.contenido));
              this.ordenSeleccion = contenido.ordenSeleccion; 
            }
            if (filtro.nombre == 'filtro_tareasATiempo') {
              this.orden_saved_search_id = filtro.saved_search_id;
              const contenido = JSON.parse(atob(filtro.contenido));
              this.ordenSeleccion = contenido.ordenSeleccion; 
            }
            if (filtro.nombre == 'filtro_numero_nombre_cliente_asignadoa') {
              this.modal_saved_search_id = filtro.saved_search_id;
              const contenido = JSON.parse(atob(filtro.contenido));
              this.numero = contenido.numero;
              this.nombre = contenido.nombre;
              this.cliente = contenido.cliente;
              this.asignadoA = contenido.asignadoA;    
              this.inputIzq = this.nombre; 
            } 
          });
        }
      });
      //Obtenemos los proyectos.
      this.obtenerProyectos();
      this.obtenerProyectosAbiertos();
      //Verificamos los checksbox del filtro.
      this.verificarCheckBoxs();
      //Actualizamos la disponibilidad del proyecto.
      this.actualizarDisponibilidadProyecto();  
  });
  }

  private obtenerProyectos(){
    this._dataProyecto.getProyectos().subscribe((resp: any) => {
      if(resp.returnset[0].RCode == 1){
        let contadorHorasTotalesPlanificadas = 0;
        for(let i = 0;i<resp.dataset.length;i++){
          let objetoTemporal: Proyecto = {
            numero: resp.dataset[i].Id_Caso,
            nombre: resp.dataset[i].Caso,
            cliente: resp.dataset[i].Cliente,
            asignado: resp.dataset[i].Asignado_a,
            cantidadTareasTotales: resp.dataset[i].Tareas_totales,
            cantidadTareasAtrasadas: resp.dataset[i].Tareas_atrasadas,
            porcentajeTareasAtrasadas: Math.round((resp.dataset[i].Tareas_atrasadas / resp.dataset[i].Tareas_totales) * 100),
            porcentajeTareasATiempo: Math.round(((resp.dataset[i].Tareas_totales - resp.dataset[i].Tareas_atrasadas) / resp.dataset[i].Tareas_totales) * 100),
            porcentajeHPCompletadas: 0,
            porcentajeHPEnProgreso: 0,
            porcentajeHPEnPrueba: 0,
            porcentajeHPNoIniciadas: 0,
            porcentajeHPEnPruebaDisenioFuncional: 0,
            porcentajeHPNoIniciadasDisenioFuncional: 0,
            porcentajeHPCompletadasDisenioFuncional: 0,
            porcentajeHPEnProgresoDisenioFuncional: 0,
            porcentajeHPEnPruebaDisenioTecnico: 0,
            porcentajeHPNoIniciadasDisenioTecnico: 0,
            porcentajeHPCompletadasDisenioTecnico: 0,
            porcentajeHPEnProgresoDisenioTecnico: 0,
            porcentajeHPEnPruebaDesarrollo: 0,
            porcentajeHPNoIniciadasDesarrollo: 0,
            porcentajeHPCompletadasDesarrollo: 0,
            porcentajeHPEnProgresoDesarrollo: 0,
            porcentajeHPEnPruebaTesting: 0,
            porcentajeHPNoIniciadasTesting: 0,
            porcentajeHPCompletadasTesting: 0,
            porcentajeHPEnProgresoTesting: 0
          }
          this.proyectosTotalesArray.push(objetoTemporal);
          this._dataProyecto.getPorcentajeHP(this.proyectosTotalesArray[i].numero).subscribe((resp: any) => {
            for(let x = 0; x < resp.dataset.length; x++){ 
              contadorHorasTotalesPlanificadas = contadorHorasTotalesPlanificadas + resp.dataset[x].Horas;
            }
            console.log(contadorHorasTotalesPlanificadas)
            this.proyectosTotalesArray[i].porcentajeHPEnProgreso = Math.round(((0 + resp.dataset[1].Horas) / contadorHorasTotalesPlanificadas) * 100);
            this.proyectosTotalesArray[i].porcentajeHPCompletadas = Math.round(((0 + resp.dataset[0].Horas) / contadorHorasTotalesPlanificadas) * 100);
            this.proyectosTotalesArray[i].porcentajeHPNoIniciadas = Math.round(((0 + resp.dataset[2].Horas) / contadorHorasTotalesPlanificadas) * 100);
            this.proyectosTotalesArray[i].porcentajeHPEnPrueba = Math.round(((0 + resp.dataset[3].Horas) / contadorHorasTotalesPlanificadas) * 100);
          });
          
          //Funcional.
          let contadorHPCompletadasFuncional = 0;
          let contadorHPEnProgresoFuncional = 0;
          let contadorHPNoIniciadasFuncional = 0;
          let contadorHPEnPruebaFuncional = 0;
          let contadorHPTotalAreaFuncional = 0;

          //Tecnico
          let contadorHPCompletadasTecnico = 0;
          let contadorHPEnProgresoTecnico = 0;
          let contadorHPNoIniciadasTecnico = 0;
          let contadorHPEnPruebaTecnico = 0;
          let contadorHPTotalAreaTecnica = 0;

          //Desarrollo.
          let contadorHPCompletadasDesarrollo = 0;
          let contadorHPEnProgresoDesarrollo = 0;
          let contadorHPNoIniciadasDesarrollo = 0;
          let contadorHPEnPruebaDesarrollo= 0;
          let contadorHPTotalAreaDesarrollo = 0;

          //Testing.
          let contadorHPCompletadasTesting= 0;
          let contadorHPEnProgresoTesting = 0;
          let contadorHPNoIniciadasTesting = 0;
          let contadorHPEnPruebaTesting = 0;
          let contadorHPTotalAreaTesting = 0;

          this._dataProyecto.getPorcentajeHPAreas(this.proyectosTotalesArray[i].numero).subscribe((resp: any) => {
            for(let r = 0;r<resp.dataset.length;r++)
            {
              switch (resp.dataset[r].Area){
                case "Design": {
                  switch (resp.dataset[r].Estado){
                    case "Completed": {
                      contadorHPTotalAreaFuncional = contadorHPTotalAreaFuncional + resp.dataset[r].Horas;
                      contadorHPCompletadasFuncional = contadorHPCompletadasFuncional + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Progress": {
                      contadorHPTotalAreaFuncional = contadorHPTotalAreaFuncional + resp.dataset[r].Horas;
                      contadorHPEnProgresoFuncional = contadorHPEnProgresoFuncional + resp.dataset[r].Horas;
                      break;
                    }
                    case "Not Started": {
                      contadorHPTotalAreaFuncional = contadorHPTotalAreaFuncional + resp.dataset[r].Horas;
                      contadorHPNoIniciadasFuncional = contadorHPNoIniciadasFuncional + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Testing": {
                      contadorHPTotalAreaFuncional = contadorHPTotalAreaFuncional + resp.dataset[r].Horas;
                      contadorHPEnPruebaFuncional = contadorHPEnPruebaFuncional + resp.dataset[r].Horas;
                    }
                  }
                  this.proyectosTotalesArray[i].porcentajeHPCompletadasDisenioFuncional = Math.round((contadorHPCompletadasFuncional / contadorHPTotalAreaFuncional) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPNoIniciadasDisenioFuncional = Math.round((contadorHPNoIniciadasFuncional / contadorHPTotalAreaFuncional) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPEnProgresoDisenioFuncional = Math.round((contadorHPEnProgresoFuncional / contadorHPTotalAreaFuncional) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPEnPruebaDisenioFuncional = Math.round((contadorHPEnPruebaFuncional / contadorHPTotalAreaFuncional) * 100);
                  break;
                }
                case "RelevamientoReq": {
                  switch (resp.dataset[r].Estado){
                    case "Completed": {
                      contadorHPTotalAreaTecnica = contadorHPTotalAreaTecnica + resp.dataset[r].Horas;
                      contadorHPCompletadasTecnico = contadorHPCompletadasTecnico + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Progress": {
                      contadorHPTotalAreaTecnica = contadorHPTotalAreaTecnica + resp.dataset[r].Horas;
                      contadorHPEnProgresoTecnico = contadorHPEnPruebaTecnico + resp.dataset[r].Horas;
                      break;
                    }
                    case "Not Started": {
                      contadorHPTotalAreaTecnica = contadorHPTotalAreaTecnica + resp.dataset[r].Horas;
                      contadorHPNoIniciadasTecnico = contadorHPNoIniciadasTecnico + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Testing": {
                      contadorHPTotalAreaTecnica = contadorHPTotalAreaTecnica + resp.dataset[r].Horas;
                      contadorHPEnPruebaTecnico = contadorHPEnPruebaTecnico + resp.dataset[r].Horas;
                    }
                  }
                  this.proyectosTotalesArray[i].porcentajeHPCompletadasDisenioTecnico = Math.round((contadorHPCompletadasTecnico / contadorHPTotalAreaTecnica) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPNoIniciadasDisenioTecnico = Math.round((contadorHPNoIniciadasTecnico/ contadorHPTotalAreaTecnica) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPEnProgresoDisenioTecnico = Math.round((contadorHPEnProgresoTecnico / contadorHPTotalAreaTecnica) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPEnPruebaDisenioTecnico = Math.round((contadorHPEnPruebaTecnico / contadorHPTotalAreaTecnica) * 100);
                  break;
                }
                case "Produccion": {
                  switch (resp.dataset[r].Estado){
                    case "Completed": {
                      contadorHPTotalAreaDesarrollo = contadorHPTotalAreaDesarrollo + resp.dataset[r].Horas;
                      contadorHPCompletadasDesarrollo = contadorHPCompletadasDesarrollo + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Progress": {
                      contadorHPTotalAreaDesarrollo = contadorHPTotalAreaDesarrollo + resp.dataset[r].Horas;
                      contadorHPEnProgresoDesarrollo = contadorHPEnProgresoDesarrollo + resp.dataset[r].Horas;
                      break;
                    }
                    case "Not Started": {
                      contadorHPTotalAreaDesarrollo = contadorHPTotalAreaDesarrollo+ resp.dataset[r].Horas;
                      contadorHPNoIniciadasDesarrollo = contadorHPNoIniciadasDesarrollo + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Testing": {
                      contadorHPTotalAreaDesarrollo = contadorHPTotalAreaDesarrollo + resp.dataset[r].Horas;
                      contadorHPEnPruebaDesarrollo = contadorHPEnPruebaDesarrollo + resp.dataset[r].Horas;
                    }
                  }
                  this.proyectosTotalesArray[i].porcentajeHPCompletadasDesarrollo = Math.round((contadorHPCompletadasDesarrollo / contadorHPTotalAreaDesarrollo) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPNoIniciadasDesarrollo = Math.round((contadorHPNoIniciadasDesarrollo/ contadorHPTotalAreaDesarrollo) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPEnProgresoDesarrollo = Math.round((contadorHPEnProgresoDesarrollo / contadorHPTotalAreaDesarrollo) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPEnPruebaDesarrollo = Math.round((contadorHPEnPruebaDesarrollo / contadorHPTotalAreaDesarrollo) * 100);
                  break;
                }
                case "Testing": {
                  switch (resp.dataset[r].Estado){
                    case "Completed": {
                      contadorHPTotalAreaTesting = contadorHPTotalAreaTesting + resp.dataset[r].Horas;
                      contadorHPCompletadasTesting = contadorHPCompletadasTesting + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Progress": {
                      contadorHPTotalAreaTesting = contadorHPTotalAreaTesting + resp.dataset[r].Horas;
                      contadorHPEnProgresoTesting = contadorHPEnProgresoTesting + resp.dataset[r].Horas;
                      break;
                    }
                    case "Not Started": {
                      contadorHPTotalAreaTesting = contadorHPTotalAreaTesting + resp.dataset[r].Horas;
                      contadorHPNoIniciadasTesting = contadorHPNoIniciadasTesting + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Testing": {
                      contadorHPTotalAreaTesting = contadorHPTotalAreaTesting + resp.dataset[r].Horas;
                      contadorHPEnPruebaTesting = contadorHPEnPruebaTesting + resp.dataset[r].Horas;
                    }
                  }
                  this.proyectosTotalesArray[i].porcentajeHPCompletadasTesting = Math.round((contadorHPCompletadasTesting / contadorHPTotalAreaTesting) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPNoIniciadasTesting = Math.round((contadorHPNoIniciadasTesting / contadorHPTotalAreaTesting) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPEnProgresoTesting = Math.round((contadorHPEnProgresoTesting / contadorHPTotalAreaTesting) * 100);
                  this.proyectosTotalesArray[i].porcentajeHPEnPruebaTesting = Math.round((contadorHPEnPruebaTesting / contadorHPTotalAreaTesting) * 100);
                  break;
                }
              }
              contadorHorasTotalesPlanificadas = 0;
            }
            this.proyectos = this.proyectosTotalesArray
            this.data = new MatTableDataSource(this.proyectos);
            this.actualizarDisponibilidadProyecto();
          });
        }
      }
    });
  }

  private obtenerProyectosAbiertos(){
    this._dataProyecto.getProyectosAbiertos().subscribe((resp: any) => {
      if(resp.returnset[0].RCode == 1){
        for(let i = 0;i<resp.dataset.length;i++){
          let objetoTemporal: Proyecto = {
            numero: resp.dataset[i].Id_Caso,
            nombre: resp.dataset[i].Caso,
            cliente: resp.dataset[i].Cliente,
            asignado: resp.dataset[i].Asignado_a,
            cantidadTareasTotales: resp.dataset[i].Tareas_totales,
            cantidadTareasAtrasadas: resp.dataset[i].Tareas_atrasadas,
            porcentajeTareasAtrasadas: Math.round((resp.dataset[i].Tareas_atrasadas / resp.dataset[i].Tareas_totales) * 100),
            porcentajeTareasATiempo: Math.round(((resp.dataset[i].Tareas_totales - resp.dataset[i].Tareas_atrasadas) / resp.dataset[i].Tareas_totales) * 100),
            porcentajeHPCompletadas: 0,
            porcentajeHPEnProgreso: 0,
            porcentajeHPEnPrueba: 0,
            porcentajeHPNoIniciadas: 0,
            porcentajeHPEnPruebaDisenioFuncional: 0,
            porcentajeHPNoIniciadasDisenioFuncional: 0,
            porcentajeHPCompletadasDisenioFuncional: 0,
            porcentajeHPEnProgresoDisenioFuncional: 0,
            porcentajeHPEnPruebaDisenioTecnico: 0,
            porcentajeHPNoIniciadasDisenioTecnico: 0,
            porcentajeHPCompletadasDisenioTecnico: 0,
            porcentajeHPEnProgresoDisenioTecnico: 0,
            porcentajeHPEnPruebaDesarrollo: 0,
            porcentajeHPNoIniciadasDesarrollo: 0,
            porcentajeHPCompletadasDesarrollo: 0,
            porcentajeHPEnProgresoDesarrollo: 0,
            porcentajeHPEnPruebaTesting: 0,
            porcentajeHPNoIniciadasTesting: 0,
            porcentajeHPCompletadasTesting: 0,
            porcentajeHPEnProgresoTesting: 0
          }
          let contadorHorasTotalesPlanificadas = 0;
          this.proyectosAbiertosArray.push(objetoTemporal);
          this._dataProyecto.getPorcentajeHP(this.proyectosAbiertosArray[i].numero).subscribe((resp: any) => {
            for(let x = 0; x < resp.dataset.length; x++){ 
              contadorHorasTotalesPlanificadas = contadorHorasTotalesPlanificadas + resp.dataset[x].Horas;
            }
            this.proyectosAbiertosArray[i].porcentajeHPEnProgreso = Math.round(((0 + resp.dataset[1].Horas) / contadorHorasTotalesPlanificadas) * 100);
            this.proyectosAbiertosArray[i].porcentajeHPCompletadas = Math.round(((0 + resp.dataset[0].Horas) / contadorHorasTotalesPlanificadas) * 100);
            this.proyectosAbiertosArray[i].porcentajeHPNoIniciadas = Math.round(((0 + resp.dataset[2].Horas) / contadorHorasTotalesPlanificadas) * 100);
            this.proyectosAbiertosArray[i].porcentajeHPEnPrueba = Math.round(((0 + resp.dataset[3].Horas) / contadorHorasTotalesPlanificadas) * 100)
          });
          contadorHorasTotalesPlanificadas = 0;
          
          //Funcional.
          let contadorHPCompletadasFuncional = 0;
          let contadorHPEnProgresoFuncional = 0;
          let contadorHPNoIniciadasFuncional = 0;
          let contadorHPEnPruebaFuncional = 0;
          let contadorHPTotalAreaFuncional = 0;

          //Tecnico
          let contadorHPCompletadasTecnico = 0;
          let contadorHPEnProgresoTecnico = 0;
          let contadorHPNoIniciadasTecnico = 0;
          let contadorHPEnPruebaTecnico = 0;
          let contadorHPTotalAreaTecnica = 0;

          //Desarrollo.
          let contadorHPCompletadasDesarrollo = 0;
          let contadorHPEnProgresoDesarrollo = 0;
          let contadorHPNoIniciadasDesarrollo = 0;
          let contadorHPEnPruebaDesarrollo= 0;
          let contadorHPTotalAreaDesarrollo = 0;

          //Testing.
          let contadorHPCompletadasTesting= 0;
          let contadorHPEnProgresoTesting = 0;
          let contadorHPNoIniciadasTesting = 0;
          let contadorHPEnPruebaTesting = 0;
          let contadorHPTotalAreaTesting = 0;

          this._dataProyecto.getPorcentajeHPAreas(this.proyectosAbiertosArray[i].numero).subscribe((resp: any) => {
            for(let r = 0;r<resp.dataset.length;r++)
            {
              switch (resp.dataset[r].Area){
                case "Design": {
                  switch (resp.dataset[r].Estado){
                    case "Completed": {
                      contadorHPTotalAreaFuncional = contadorHPTotalAreaFuncional + resp.dataset[r].Horas;
                      contadorHPCompletadasFuncional = contadorHPCompletadasFuncional + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Progress": {
                      contadorHPTotalAreaFuncional = contadorHPTotalAreaFuncional + resp.dataset[r].Horas;
                      contadorHPEnProgresoFuncional = contadorHPEnProgresoFuncional + resp.dataset[r].Horas;
                      break;
                    }
                    case "Not Started": {
                      contadorHPTotalAreaFuncional = contadorHPTotalAreaFuncional + resp.dataset[r].Horas;
                      contadorHPNoIniciadasFuncional = contadorHPNoIniciadasFuncional + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Testing": {
                      contadorHPTotalAreaFuncional = contadorHPTotalAreaFuncional + resp.dataset[r].Horas;
                      contadorHPEnPruebaFuncional = contadorHPEnPruebaFuncional + resp.dataset[r].Horas;
                    }
                  }
                  this.proyectosAbiertosArray[i].porcentajeHPCompletadasDisenioFuncional = Math.round((contadorHPCompletadasFuncional / contadorHPTotalAreaFuncional) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPNoIniciadasDisenioFuncional = Math.round((contadorHPNoIniciadasFuncional / contadorHPTotalAreaFuncional) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPEnProgresoDisenioFuncional = Math.round((contadorHPEnProgresoFuncional / contadorHPTotalAreaFuncional) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPEnPruebaDisenioFuncional = Math.round((contadorHPEnPruebaFuncional / contadorHPTotalAreaFuncional) * 100);
                  break;
                }
                case "RelevamientoReq": {
                  switch (resp.dataset[r].Estado){
                    case "Completed": {
                      contadorHPTotalAreaTecnica = contadorHPTotalAreaTecnica + resp.dataset[r].Horas;
                      contadorHPCompletadasTecnico = contadorHPCompletadasTecnico + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Progress": {
                      contadorHPTotalAreaTecnica = contadorHPTotalAreaTecnica + resp.dataset[r].Horas;
                      contadorHPEnProgresoTecnico = contadorHPEnPruebaTecnico + resp.dataset[r].Horas;
                      break;
                    }
                    case "Not Started": {
                      contadorHPTotalAreaTecnica = contadorHPTotalAreaTecnica + resp.dataset[r].Horas;
                      contadorHPNoIniciadasTecnico = contadorHPNoIniciadasTecnico + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Testing": {
                      contadorHPTotalAreaTecnica = contadorHPTotalAreaTecnica + resp.dataset[r].Horas;
                      contadorHPEnPruebaTecnico = contadorHPEnPruebaTecnico + resp.dataset[r].Horas;
                    }
                  }
                  this.proyectosAbiertosArray[i].porcentajeHPCompletadasDisenioTecnico = Math.round((contadorHPCompletadasTecnico / contadorHPTotalAreaTecnica) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPNoIniciadasDisenioTecnico = Math.round((contadorHPNoIniciadasTecnico/ contadorHPTotalAreaTecnica) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPEnProgresoDisenioTecnico = Math.round((contadorHPEnProgresoTecnico / contadorHPTotalAreaTecnica) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPEnPruebaDisenioTecnico = Math.round((contadorHPEnPruebaTecnico / contadorHPTotalAreaTecnica) * 100);
                  break;
                }
                case "Produccion": {
                  switch (resp.dataset[r].Estado){
                    case "Completed": {
                      contadorHPTotalAreaDesarrollo = contadorHPTotalAreaDesarrollo + resp.dataset[r].Horas;
                      contadorHPCompletadasDesarrollo = contadorHPCompletadasDesarrollo + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Progress": {
                      contadorHPTotalAreaDesarrollo = contadorHPTotalAreaDesarrollo + resp.dataset[r].Horas;
                      contadorHPEnProgresoDesarrollo = contadorHPEnProgresoDesarrollo + resp.dataset[r].Horas;
                      break;
                    }
                    case "Not Started": {
                      contadorHPTotalAreaDesarrollo = contadorHPTotalAreaDesarrollo+ resp.dataset[r].Horas;
                      contadorHPNoIniciadasDesarrollo = contadorHPNoIniciadasDesarrollo + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Testing": {
                      contadorHPTotalAreaDesarrollo = contadorHPTotalAreaDesarrollo + resp.dataset[r].Horas;
                      contadorHPEnPruebaDesarrollo = contadorHPEnPruebaDesarrollo + resp.dataset[r].Horas;
                    }
                  }
                  this.proyectosAbiertosArray[i].porcentajeHPCompletadasDesarrollo = Math.round((contadorHPCompletadasDesarrollo / contadorHPTotalAreaDesarrollo) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPNoIniciadasDesarrollo = Math.round((contadorHPNoIniciadasDesarrollo/ contadorHPTotalAreaDesarrollo) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPEnProgresoDesarrollo = Math.round((contadorHPEnProgresoDesarrollo / contadorHPTotalAreaDesarrollo) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPEnPruebaDesarrollo = Math.round((contadorHPEnPruebaDesarrollo / contadorHPTotalAreaDesarrollo) * 100);
                  break;
                }
                case "Testing": {
                  switch (resp.dataset[r].Estado){
                    case "Completed": {
                      contadorHPTotalAreaTesting = contadorHPTotalAreaTesting + resp.dataset[r].Horas;
                      contadorHPCompletadasTesting = contadorHPCompletadasTesting + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Progress": {
                      contadorHPTotalAreaTesting = contadorHPTotalAreaTesting + resp.dataset[r].Horas;
                      contadorHPEnProgresoTesting = contadorHPEnProgresoTesting + resp.dataset[r].Horas;
                      break;
                    }
                    case "Not Started": {
                      contadorHPTotalAreaTesting = contadorHPTotalAreaTesting + resp.dataset[r].Horas;
                      contadorHPNoIniciadasTesting = contadorHPNoIniciadasTesting + resp.dataset[r].Horas;
                      break;
                    }
                    case "In Testing": {
                      contadorHPTotalAreaTesting = contadorHPTotalAreaTesting + resp.dataset[r].Horas;
                      contadorHPEnPruebaTesting = contadorHPEnPruebaTesting + resp.dataset[r].Horas;
                    }
                  }
                  this.proyectosAbiertosArray[i].porcentajeHPCompletadasTesting = Math.round((contadorHPCompletadasTesting / contadorHPTotalAreaTesting) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPNoIniciadasTesting = Math.round((contadorHPNoIniciadasTesting / contadorHPTotalAreaTesting) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPEnProgresoTesting = Math.round((contadorHPEnProgresoTesting / contadorHPTotalAreaTesting) * 100);
                  this.proyectosAbiertosArray[i].porcentajeHPEnPruebaTesting = Math.round((contadorHPEnPruebaTesting / contadorHPTotalAreaTesting) * 100);
                  break;
                }
              }
              contadorHorasTotalesPlanificadas = 0;
            }
          });
        }
      }
    });
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = this.filterValue.trim().toLowerCase();
    this.nombre = this.filterValue;
    this.verificarCheckBoxs();
    this.prepararFiltro();
  }

  retornarPorcentajeCompletadas(index: number): number{
    return this.proyectos[index].porcentajeHPCompletadas;
  }

  retornarPorcentajeNoIniciadas(index: number){
    return this.proyectos[index].porcentajeHPNoIniciadas;
  }

  retornarPorcentajeEnProgreso(index: number){
    return this.proyectos[index].porcentajeHPEnProgreso;
  }

  retornarPorcentajeEnPrueba(index: number): number{
    return this.proyectos[index].porcentajeHPEnPrueba;
  }

 retornarPorcentajeAvanceFuncionalCompletadas(index: number): number{
    return this.proyectos[index].porcentajeHPCompletadasDisenioFuncional;
  }

  retornarPorcentajeAvanceFuncionalNoIniciadas(index: number): number{
    return this.proyectos[index].porcentajeHPNoIniciadasDisenioFuncional;
  }

  retornarPorcentajeAvanceFuncionalEnProgreso(index: number): number{
    return this.proyectos[index].porcentajeHPEnProgresoDisenioFuncional;
  }

 retornarPorcentajeAvanceFuncionalEnPrueba(index: number): number{
    return this.proyectos[index].porcentajeHPEnPruebaDisenioFuncional;
  } 

  retornarPorcentajeAvanceTecnicoCompletadas(index: number): number{
    return this.proyectos[index].porcentajeHPCompletadasDisenioTecnico;
  }

  retornarPorcentajeAvanceTecnicoNoIniciadas(index: number): number{
    return this.proyectos[index].porcentajeHPNoIniciadasDisenioTecnico;
  }

  retornarPorcentajeAvanceTecnicoEnProgreso(index: number): number{
    return this.proyectos[index].porcentajeHPEnProgresoDisenioTecnico;
  }

 retornarPorcentajeAvanceTecnicoEnPrueba(index: number): number{
    return this.proyectos[index].porcentajeHPEnPruebaDisenioTecnico;
  } 

  retornarPorcentajeAvanceDesarrolloCompletadas(index: number): number{
    return this.proyectos[index].porcentajeHPCompletadasDesarrollo;
  }

  retornarPorcentajeAvanceDesarrolloNoIniciadas(index: number): number{
    return this.proyectos[index].porcentajeHPNoIniciadasDesarrollo;
  }

  retornarPorcentajeAvanceDesarrolloEnProgreso(index: number): number{
    return this.proyectos[index].porcentajeHPEnProgresoDesarrollo;
  }

 retornarPorcentajeAvanceDesarrolloEnPrueba(index: number): number{
    return this.proyectos[index].porcentajeHPEnPruebaDesarrollo;
  } 

  retornarPorcentajeAvanceTestingCompletadas(index: number): number{
    return this.proyectos[index].porcentajeHPCompletadasTesting;
  }

  retornarPorcentajeAvanceTestingNoIniciadas(index: number): number{
    return this.proyectos[index].porcentajeHPNoIniciadasTesting;
  }

  retornarPorcentajeAvanceTestingEnProgreso(index: number): number{
    return this.proyectos[index].porcentajeHPEnProgresoTesting;
  }

 retornarPorcentajeAvanceTestingEnPrueba(index: number): number{
    return this.proyectos[index].porcentajeHPEnPruebaTesting;
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
    let cantidadTareasTotales = 0;
    for(let i = 0; i<this.proyectos.length;i++){
      cantidadTareasTotales+=this.proyectos[i].cantidadTareasTotales
    }
    return cantidadTareasTotales;
  }

  getTooltipTareasAtrasadas(){
    let cantidadTareasAtrasadas = 0;
    for(let i = 0; i<this.proyectos.length;i++){
      cantidadTareasAtrasadas+=this.proyectos[i].cantidadTareasAtrasadas
    }
    return cantidadTareasAtrasadas;
  }

  actualizarDisponibilidadProyecto(){
    this.disponibilidadProyectos = Math.round((this.getTooltipTareasAtrasadas() / this.getTooltipTareasAbiertasTotales()) * 100);
  }

  openFiltro(){
    const dialogRef = this._dialog.open(FiltroProyectosComponent, {
      width: '400px',
      disableClose: true,
      data: { numero: this.numero, nombre: this.nombre, cliente: this.cliente, asignadoA: this.asignadoA, seleccion: this.ordenSeleccion, search_id: this.modal_saved_search_id, misProyectos: this.misProyectos, proyectosAbiertos: this.proyectosAbiertos}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.numero = result.numero;
      this.nombre = result.nombre;
      this.cliente = result.cliente;
      this.asignadoA = result.asignadoA;
      this.misProyectos = result.misProyectos;
      this.proyectosAbiertos = result.proyectosAbiertos;
      this.inputIzq = this.nombre;
      let filtrar = result.filtrar;
      if (result.limpiar) { this.inputIzq = '', filtrar = true }
      if (filtrar) {
        this.verificarCheckBoxs();
        this.prepararFiltro();
      }
    });
  }

  private prepararFiltro(){
    const filtroNombre = this.filtroAvanzado(1, this.nombre);
    const filtroCliente = this.filtroAvanzado(2, this.cliente);
    const filtroAsignado = this.filtroAvanzado(3, this.asignadoA);
    const filtroNumero = this.filtroAvanzado(4, this.numero);
    this.proyectos = this.buscarCoincidencias(filtroNombre, filtroCliente, filtroAsignado, filtroNumero);
    this.proyectosFiltrados = this.proyectos;
    this.aplicarFiltros();
  }

  private verificarCheckBoxs(){
    if(this.proyectosAbiertos == true){
      //Cargamos el array unicamente con los proyectos abiertos.
      this.proyectos = this.proyectosAbiertosArray;
    }
    else{
      this.proyectos = this.proyectosTotalesArray;
    }
    this.verificarCheckMisProyectos();
    this.data = new MatTableDataSource(this.proyectos);
    this.actualizarDisponibilidadProyecto();
  }

  private verificarCheckMisProyectos(){
    if(this.misProyectos){
      for(let i = 0; i<this.proyectos.length;i++){
        if(this.proyectos[i].asignado == localStorage.getItem('usuario')){
          this.proyectosAsignados.push(this.proyectos[i]);
        }
      }
      this.proyectos = this.proyectosAsignados;
    }
    this.proyectosAsignados = [];
  }

  aplicarFiltros() {
    this.data = new MatTableDataSource(this.proyectos);
    if (this.proyectos.length == 0) {
      this.noHayProyectos = true;
      this.disponibilidadProyectos = 0;
    } else if (this.proyectos.length == 1) {
      this.noHayProyectos = false;
      this.actualizarDisponibilidadProyecto();
      this.cambiarOrden();
    } else {
      this.noHayProyectos = false;
      this.actualizarDisponibilidadProyecto();
      this.cambiarOrden();
    }
  }

  private filtroAvanzado(tipo: number, valor: string) {
    let arrayTemp: any = [];
    let arrayTabla: any;
    switch (tipo) {
      case 1:
        this.proyectos.forEach(project => {
          let obj = { numero: project.numero, nombre: project.nombre };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
      
        case 2:
        this.proyectos.forEach(project => {
          let obj = { numero: project.numero, cliente: project.cliente };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;
        
        case 3:
        this.proyectos.forEach(project => {
          let obj = { numero: project.numero, asignado: project.asignado };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;

        case 4:
          this.proyectos.forEach(project => {
            let obj = { numero: project.numero };
            arrayTemp.push(obj);
          });
          arrayTabla = new MatTableDataSource(arrayTemp);
          arrayTabla.filter = valor.trim().toLowerCase();
          arrayTemp = arrayTabla.filteredData;
          return arrayTemp;
    }
  }


  private buscarCoincidencias(arrayNombre: any, arrayCliente: any, arrayAsignado: any, arrayNumero: any) {
    let encontrados: any = [];
    this.proyectos.forEach(project => {
      let encontradoNumero = false;
      let encontradoNombre = false;
      let encontradoCliente = false;
      let encontradoAsignado = false;

      arrayNumero.forEach((element: any) => {
        if (element.numero === project.numero) {
          encontradoNumero = true;
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
    return encontrados;
  }


  contraerProyectos(){
    this.accordion.closeAll();
  }

  mostrarInformacion(){
    if(this.estado == false){
      this.estado = true;
    }
    else{
      this.estado = false
    }
  }

  dispararOrden(e: Event){
    this.ordenSeleccion = (e.target as HTMLElement).innerText;
    const contenido: string = JSON.stringify({ ordenSeleccion : this.ordenSeleccion });
    const encodedData = btoa(contenido);
    if (this.orden_saved_search_id == '') {
      this._filtroService.insertFiltro(
        localStorage.getItem('userId')!,
        'inicio-estado-proyecto',
        'filtro_orden',
        encodedData,
        'Filtra los colaboradores por orden alfabetico, tareas atrasadas o tareas a tiempo').subscribe((rsp: any) => {
          console.log('Filtro guardado: ', rsp);
          this.cambiarOrden();
        });
    } else {
      this._filtroService.updateFiltro(this.orden_saved_search_id, encodedData).subscribe((rsp: any) => {
        console.log('Filtro actualizado: ', rsp);
        this.cambiarOrden();
      });
    }
  }

    cambiarOrden(){
      if(this.ordenSeleccion == 'Alfabetico') {
        this.proyectos.sort(function(a, b) {
          console.log("Ordeno por alfabeto");
          if(a.nombre > b.nombre){
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
      }
      if(this.ordenSeleccion == 'Tareas atrasadas') {
        console.log("Ordeno por tareas atrasadas");
        this.proyectos.sort(function(a, b) {
          if(a.porcentajeTareasAtrasadas < b.porcentajeTareasAtrasadas){
            return 1;
          }
          if(a.porcentajeTareasAtrasadas > b.porcentajeTareasAtrasadas){
            return -1;
       
          }
          return 0;
        });
      }
      if(this.ordenSeleccion == 'Tareas a tiempo') {
        console.log("Ordeno por tareas a tiempo");
        this.proyectos.sort(function(a, b) {
          if(a.porcentajeTareasATiempo < b.porcentajeTareasATiempo){
            return 1;
          }
          if(a.porcentajeTareasATiempo > b.porcentajeTareasATiempo){
            return -1;
          }
          return 0;
        });
      }
      this.data = new MatTableDataSource(this.proyectos);
    }
}
