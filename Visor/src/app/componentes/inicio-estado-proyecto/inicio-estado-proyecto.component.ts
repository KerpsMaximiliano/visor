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
import { FiltroService } from '../../services/i2t/filtro.service';
import { TipoDeFiltro } from '../../interfaces/tipo-de-filtro';

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
  estado: boolean = false;
  ordenDeFiltrado: string;
  orden_saved_search_id = '';
  

  //Variables del filtro
  numero: string = "";
  cliente: string = "";
  asignadoA: string = "";
  nombre: string = "";
  inputIzq: string = "";

  tipoDeFiltro: TipoDeFiltro[] = [
    {value: 'abecedario', viewValue: 'Abecedario'},
    {value: 'tareasAtrasadas', viewValue: 'Tareas atrasadas'},
    {value: 'tareasATiempo', viewValue: 'Tareas a tiempo'}
  ];


  constructor(private _dataProyecto: ProyectoDataService, private _dialog: MatDialog, private _filtroService: FiltroService) {
    this.ordenDeFiltrado = "";
  }

  ngOnInit(): void {
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
          this.proyectos.push(objetoTemporal);
          this._dataProyecto.getPorcentajeHP(this.proyectos[i].numero).subscribe((resp: any) => {
            contadorHorasTotalesPlanificadas = contadorHorasTotalesPlanificadas + resp.dataset[0].Horas + resp.dataset[1].Horas + resp.dataset[2].Horas;
            this.proyectos[i].porcentajeHPEnProgreso = Math.round((resp.dataset[1].Horas / contadorHorasTotalesPlanificadas) * 100);
            this.proyectos[i].porcentajeHPCompletadas = Math.round((resp.dataset[0].Horas / contadorHorasTotalesPlanificadas) * 100);
            this.proyectos[i].porcentajeHPNoIniciadas = Math.round((resp.dataset[2].Horas / contadorHorasTotalesPlanificadas) * 100);
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

          this._dataProyecto.getPorcentajeHPAreas(this.proyectos[i].numero).subscribe((resp: any) => {
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
                  this.proyectos[i].porcentajeHPCompletadasDisenioFuncional = Math.round((contadorHPCompletadasFuncional / contadorHPTotalAreaFuncional) * 100);
                  this.proyectos[i].porcentajeHPNoIniciadasDisenioFuncional = Math.round((contadorHPNoIniciadasFuncional / contadorHPTotalAreaFuncional) * 100);
                  this.proyectos[i].porcentajeHPEnProgresoDisenioFuncional = Math.round((contadorHPEnProgresoFuncional / contadorHPTotalAreaFuncional) * 100);
                  this.proyectos[i].porcentajeHPEnPruebaDisenioFuncional = Math.round((contadorHPEnPruebaFuncional / contadorHPTotalAreaFuncional) * 100);
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
                  this.proyectos[i].porcentajeHPCompletadasDisenioTecnico = Math.round((contadorHPCompletadasTecnico / contadorHPTotalAreaTecnica) * 100);
                  this.proyectos[i].porcentajeHPNoIniciadasDisenioTecnico = Math.round((contadorHPNoIniciadasTecnico/ contadorHPTotalAreaTecnica) * 100);
                  this.proyectos[i].porcentajeHPEnProgresoDisenioTecnico = Math.round((contadorHPEnProgresoTecnico / contadorHPTotalAreaTecnica) * 100);
                  this.proyectos[i].porcentajeHPEnPruebaDisenioTecnico = Math.round((contadorHPEnPruebaTecnico / contadorHPTotalAreaTecnica) * 100);
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
                  this.proyectos[i].porcentajeHPCompletadasDesarrollo = Math.round((contadorHPCompletadasDesarrollo / contadorHPTotalAreaDesarrollo) * 100);
                  this.proyectos[i].porcentajeHPNoIniciadasDesarrollo = Math.round((contadorHPNoIniciadasDesarrollo/ contadorHPTotalAreaDesarrollo) * 100);
                  this.proyectos[i].porcentajeHPEnProgresoDesarrollo = Math.round((contadorHPEnProgresoDesarrollo / contadorHPTotalAreaDesarrollo) * 100);
                  this.proyectos[i].porcentajeHPEnPruebaDesarrollo = Math.round((contadorHPEnPruebaDesarrollo / contadorHPTotalAreaDesarrollo) * 100);
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
                  this.proyectos[i].porcentajeHPCompletadasTesting = Math.round((contadorHPCompletadasTesting / contadorHPTotalAreaTesting) * 100);
                  this.proyectos[i].porcentajeHPNoIniciadasTesting = Math.round((contadorHPNoIniciadasTesting / contadorHPTotalAreaTesting) * 100);
                  this.proyectos[i].porcentajeHPEnProgresoTesting = Math.round((contadorHPEnProgresoTesting / contadorHPTotalAreaTesting) * 100);
                  this.proyectos[i].porcentajeHPEnPruebaTesting = Math.round((contadorHPEnPruebaTesting / contadorHPTotalAreaTesting) * 100);
                  break;
                }
              }
            }
          });
        }
        this.data = new MatTableDataSource(this.proyectos);
        this.actualizarDisponibilidadProyecto();
        this._filtroService.getUserId(localStorage.getItem('usuario')!).subscribe((response: any) => {
          localStorage.setItem('userId', response.dataset[0].id);
          console.log(response.dataset[0])
        });    
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
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
    //this.proyectos = this.dataProyecto.proyectos;
    const dialogRef = this._dialog.open(FiltroProyectosComponent, {
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

  mostrarInformacion(){
    if(this.estado == false){
      this.estado = true;
    }
    else{
      this.estado = false
    }
  }

  dispararOrden(e: Event){
    this.ordenDeFiltrado = (e.target as HTMLElement).innerText;
    const contenido: string = JSON.stringify({ ordenSeleccion : this.ordenDeFiltrado });
    const encodedData = btoa(contenido);
    for(let i=0;i<this.tipoDeFiltro.length;i++){
      if(this.ordenDeFiltrado == "Abecedario"){
          if (this.orden_saved_search_id == '') {
            this._filtroService.insertFiltro(
              localStorage.getItem('userId')!,
              'inicio-estado-proyecto',
              'filtro_abecedario',
              encodedData,
              'Filtra los proyectos por orden alfabético').subscribe((rsp: any) => {
                console.log('Filtro guardado: ', rsp);
                /* this.cambiarOrden();
                this.contraerColaboradores(); */
                });
          }
          else {
            this._filtroService.updateFiltro(this.orden_saved_search_id, encodedData).subscribe((rsp: any) => {
              console.log('Filtro actualizado: ', rsp);
              /* this.cambiarOrden();
              this.contraerColaboradores(); */
            });
          }
        }
        else if(this.ordenDeFiltrado == "Tareas a tiempo"){
          let contenido: string = JSON.stringify({ ordenSeleccion : this.ordenDeFiltrado });
          let encodedData = btoa(contenido);
          if (this.orden_saved_search_id == '') {
            this._filtroService.insertFiltro(
              localStorage.getItem('userId')!,
              'inicio-estado-proyecto',
              'filtro_tareasATiempo',
              encodedData,
              'Filtra los proyectos por la cantidad de tareas a tiempo').subscribe((rsp: any) => {
                console.log('Filtro guardado: ', rsp);
                /* this.cambiarOrden();
                this.contraerColaboradores(); */
                });
          }
          else {
            this._filtroService.updateFiltro(this.orden_saved_search_id, encodedData).subscribe((rsp: any) => {
              console.log('Filtro actualizado: ', rsp);
              /* this.cambiarOrden();
              this.contraerColaboradores(); */
            });
          } 
        }
        else if(this.ordenDeFiltrado == "Tareas atrasadas"){
          if (this.orden_saved_search_id == '') {
            this._filtroService.insertFiltro(
              localStorage.getItem('userId')!,
              'inicio-estado-proyecto',
              'filtro_tareasAtrasadas',
              encodedData,
              'Filtra los proyectos por la cantidad de tareas atrasadas').subscribe((rsp: any) => {
                console.log('Filtro guardado: ', rsp);
                /* this.cambiarOrden();
                this.contraerColaboradores(); */
                });
          }
          else {
            this._filtroService.updateFiltro(this.orden_saved_search_id, encodedData).subscribe((rsp: any) => {
              console.log('Filtro actualizado: ', rsp);
              /* this.cambiarOrden();
              this.contraerColaboradores(); */
            });
          }
        } 
      }
    }
}
