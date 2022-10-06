import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyectos } from 'src/app/interfaces/proyectos';
import { Tareas } from 'src/app/interfaces/tareas';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
// import 'moment/locale/ja';
// import 'moment/locale/fr';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { TareaService } from 'src/app/services/i2t/tarea.service';





interface Cliente {
  value: string;
  viewValue: string;
  id: string
}
interface Programador {
  value: string;
  viewValue: string;
}

interface Prioridad {
  nombre: string,
  valor: string
}

interface Facilitador{
  nombre: string
}

interface Tecnologia{
  nombre: string
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface PropiedadesProyecto{
  id: number,
  nombre: string, 
  planificadas: number
  noIniciadas: number,
  enProgreso: number,
  enPrueba: number, 
  completadas: number, 
  tieneTareasUsuario: boolean, 
  cliente: string, 
  asignadoA: string
}

export interface ResponseService{
  id_projecto: string;
  nombre_cliente: string;
  nombre_projecto: string;
  usuario_asignado: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [
  ]
})

export class DialogComponent implements OnInit {

  buscarProyecto: boolean = false;
  filtrosProyectoDialog: any;
  prioridadProyecto:any
  proyectoSeleccionado: string = '';
  numeroProyecto: string = '';
  nombreProyecto: string = '';
  clienteProyecto: string = '';
  
  asignadoAproyecto: string = '';
  listaProyectos: any[] = [];
  listaProyectosPrueba: any;
  dataSource: MatTableDataSource<PropiedadesProyecto>;
  clientesDeProyectos: String[] = [];
  usuariosDeProyectos: String[] = [];
  dataSourcePrueba!: MatTableDataSource<any>;
  result: PropiedadesProyecto[] = [];
  valoresFiltros =  {
    id: '',
    nombre: '',
    cliente: '',
    asignado: ''
  }

  buscarTareas: boolean = false;
  filtrosTareasDialog: any;
  filtrosTarea: Object[] = [];
  nombreTarea = '';
  prioridadTarea: any;
  
  
  tecnologia: string = '';
  
  facilitadorTarea: any
  asignadoAtarea :any
  tecnologiatarea : any
  
  columnas: string[] = ['nombre'];

  ngOnInit(): void {
    
  }

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public buscarProyectoInterface: Proyectos, @Inject(MAT_DIALOG_DATA) public buscarTareasInterface: Tareas, private _adapter: DateAdapter<any>,
  @Inject(MAT_DATE_LOCALE) private _locale: string, public dialogRef: MatDialogRef<DialogComponent>, private _tareaService: TareaService) {
    
    
    //Pregunto si el pop up se abrió para buscar PROYECTOS
    if(buscarProyectoInterface.buscaProyectos){
      this.buscarProyecto = buscarProyectoInterface.buscaProyectos;
      this.filtrosProyectoDialog = this.buscarProyectoInterface.filtros;
      
      if (buscarProyectoInterface.filtros.length != 0) {
        this.numeroProyecto = JSON.parse(JSON.stringify(buscarProyectoInterface.filtros[0])).numeroProyecto;
        this.nombreProyecto = JSON.parse(JSON.stringify(buscarProyectoInterface.filtros[1])).nombreProyecto;
        this.clienteProyecto = JSON.parse(JSON.stringify(buscarProyectoInterface.filtros[2])).clienteProyecto;
        this.asignadoAproyecto = JSON.parse(JSON.stringify(buscarProyectoInterface.filtros[3])).asignadoAproyecto;
      }

      this._tareaService.getABMproyectoService().subscribe((response: any) => {
        this.listaProyectosPrueba = response.dataset;
        console.log(this.listaProyectosPrueba)
        this.dataSourcePrueba = new MatTableDataSource(this.listaProyectosPrueba);
        
         
        let cantProyectos = this.dataSourcePrueba.filteredData.length;
        for(let i = 0; i < cantProyectos ; i++){
          if(!this.clientesDeProyectos.includes(this.dataSourcePrueba.filteredData[i].nombre_cliente)){
            this.clientesDeProyectos.push( this.dataSourcePrueba.filteredData[i].nombre_cliente);
          }
        }
        for(let i = 0; i < cantProyectos ; i++){
          if(!this.usuariosDeProyectos.includes(this.dataSourcePrueba.filteredData[i].usuario_asignado)){
            this.usuariosDeProyectos.push( this.dataSourcePrueba.filteredData[i].usuario_asignado);
          }
        }
        
        


      });
      
    }
    
    //Pregunto si el pop up se abrió para buscar TAREAS
    
    if(buscarTareasInterface.buscaTareas){
      this.buscarTareas = buscarTareasInterface.buscaTareas;
      
      const id_projecto = this.buscarTareasInterface.idProyectoSeleccionado;
      console.log(id_projecto)
      this._tareaService.getTareasDeProyecto(id_projecto).subscribe((response: any) => {
        this.listaProyectosPrueba = response.dataset;
        this.dataSourcePrueba = new MatTableDataSource(this.listaProyectosPrueba);
        console.log(this.dataSourcePrueba)
        
        console.log(this.dataSourcePrueba.filteredData[0])
        // let cantProyectos = this.dataSourcePrueba.filteredData.length;
        // for(let i = 0; i < cantProyectos ; i++){
        //   if(!this.clientesDeProyectos.includes(this.dataSourcePrueba.filteredData[i].nombre_cliente)){
        //     this.clientesDeProyectos.push( this.dataSourcePrueba.filteredData[i].nombre_cliente);
        //   }
        // }
        // for(let i = 0; i < cantProyectos ; i++){
        //   if(!this.usuariosDeProyectos.includes(this.dataSourcePrueba.filteredData[i].usuario_asignado)){
        //     this.usuariosDeProyectos.push( this.dataSourcePrueba.filteredData[i].usuario_asignado);
        //   }
        // }
        // console.log(this.usuariosDeProyectos)
        


      });
      
      this.filtrosTareasDialog = JSON.parse(JSON.stringify(this.buscarTareasInterface)).filtros
      console.log(this.filtrosTareasDialog)

      this.nombreTarea = JSON.parse(JSON.stringify(this.filtrosTareasDialog[0])).nombreTarea;
      this.prioridadTarea = this.filtrosTareasDialog[1].prioridadTarea;
      this.facilitadorTarea = this.filtrosTareasDialog[2].facilitadorTarea;
      this.asignadoAtarea = this.filtrosTareasDialog[3].asignadoAtarea;
      this.tecnologiatarea = this.filtrosTareasDialog[4].tecnologiatarea;
    }

    this._locale = 'es';
    this._adapter.setLocale(this._locale);
    
        
    const proyectos: PropiedadesProyecto[] = [
      { id: 128109, nombre: 'Entrenamiento en Drupal y Symfony', planificadas: 448, noIniciadas: 424, enProgreso: 24, enPrueba: 0, completadas: 0, tieneTareasUsuario: false, cliente: 'Cliente 1', asignadoA: 'Adrian Enrico' },
      { id: 125039, nombre: 'Restyling y Migración de Portal PAC', planificadas: 3600, noIniciadas: 500, enProgreso: 0, enPrueba: 0, completadas: 2400, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 124132, nombre: 'Sala de Sorteos - Extractos Digitales', planificadas: 2400, noIniciadas: 492, enProgreso: 200, enPrueba: 0, completadas: 1640, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
      { id: 888886, nombre: 'Visorrr - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: true, cliente: 'Federico Gauchat', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 144, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' }
    ]
    this.listaProyectos = proyectos;
    //console.log(this.listaProyectosPrueba)
    
    this.dataSource = new MatTableDataSource(this.listaProyectos);
    
    //this.dataSource = new MatTableDataSource(this.listaProyectosPrueba);
    
    

  }
  
  
  toppings = this._formBuilder.group({
    misProyectos: false,
    extracheese: false,
    mushroom: false,
  });

  //Filtra servicio
  
  
  //Filtra prueba
  // filtrarProyectos(id:string,valor:string){
  //   const idParametroFiltro = id;
  //   var valorParametroFiltro = valor;
  //   console.log(idParametroFiltro)
  //   console.log(valorParametroFiltro)
    
    
  //   switch(idParametroFiltro){
  //     case 'nroProyecto':
  //       this.numeroProyecto = valorParametroFiltro;
  //       this.filtrosProyectoDialog[0].numeroProyecto = this.numeroProyecto;//Para permanencia de filtro
  //       this.valoresFiltros.id = valorParametroFiltro;
  //       const valores = Object.values(this.valoresFiltros)
        
  //       this.armarFilterPredicate(valores);
  //       this.filtrarPor(valores);
        
        
  //     break;
  //     case 'nombreProyecto':
  //       this.nombreProyecto = valorParametroFiltro;
  //       this.filtrosProyectoDialog[1].nombreProyecto = this.nombreProyecto;//Para permanencia de filtro
  //       this.valoresFiltros.nombre = valorParametroFiltro;
  //       const valoresN = Object.values(this.valoresFiltros)

  //       this.armarFilterPredicate(valoresN);
  //       this.filtrarPor(valoresN);
        
  //     break;
  //     case 'clienteProyecto':
  //       this.clienteProyecto = valorParametroFiltro;
  //       this.filtrosProyectoDialog[2] = this.clienteProyecto;
  //       this.valoresFiltros.cliente = valorParametroFiltro;
  //       const valoresC = Object.values(this.valoresFiltros);

  //       this.armarFilterPredicate(valoresC);
  //       this.filtrarPor(valoresC);
        
  //       break;
  //     case 'asignadoAproyecto':
  //       this.asignadoAproyecto = valorParametroFiltro;
  //       this.filtrosProyectoDialog[3] = this.asignadoAproyecto;
  //       this.valoresFiltros.asignado = valorParametroFiltro;
  //       const valoresA = Object.values(this.valoresFiltros)

  //       this.armarFilterPredicate(valoresA);
  //       this.filtrarPor(valoresA);
  //   }
  // }
  filtrarProyectos(id:string,valor:string){
    const idParametroFiltro = id;
    var valorParametroFiltro = valor;
    console.log(idParametroFiltro)
    console.log(valorParametroFiltro)
    
    //Swmitch servicio
    
    switch(idParametroFiltro){
      case 'nroProyecto':
        this.numeroProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[0].numeroProyecto = this.numeroProyecto;//Para permanencia de filtro
        this.valoresFiltros.id = valorParametroFiltro;
        const valores = Object.values(this.valoresFiltros)
        console.log(valores)
        const objeto = JSON.parse(JSON.stringify(this.valoresFiltros))
        
        this.armarFilterPredicate(valores);
        this.filtrarPor(valores);
        
      break;
      case 'nombreProyecto':
        this.nombreProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[1].nombreProyecto = this.nombreProyecto;//Para permanencia de filtro
        this.valoresFiltros.nombre = valorParametroFiltro;
        const valoresN = Object.values(this.valoresFiltros);


        this.armarFilterPredicate(valoresN);
        this.filtrarPor(valoresN);

      break;
      case 'clienteProyecto':
        this.clienteProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[2] = this.clienteProyecto;
        this.valoresFiltros.cliente = valorParametroFiltro;
        const valoresC = Object.values(this.valoresFiltros);

        this.armarFilterPredicate(valoresC);
        this.filtrarPor(valoresC);

        
      break;
      case 'asignadoAproyecto':
        this.asignadoAproyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[3] = this.asignadoAproyecto;
        this.valoresFiltros.asignado = valorParametroFiltro;
        const valoresA = Object.values(this.valoresFiltros);

        this.armarFilterPredicate(valoresA);
        this.filtrarPor(valoresA);

        
      break;
    }
  }
  armarFilterPredicate( valores:string[] ): boolean{                                     
    let respuesta: any;
    respuesta = this.dataSourcePrueba.filterPredicate = (data: any, filter: string): boolean => {
      //Filtra solo por id_projecto
      if(valores[0] != '' && valores[1] == '' && valores[2] == '' && valores[3] == ''){
        console.log("data.id = " + data.id_projecto + " valores[0] = " + valores[0] + " = " + (String(data.id).indexOf(valores[0]) != -1))
        return ( (data.id_projecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1);
      }

      //Filtra solo por nombre_projecto
      else if(valores[0] == '' && valores[1] != '' && valores[2] == '' && valores[3] == ''){
        return ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1);
      }

      //Filtra solo por Cliente
      else if(valores[0] == '' && valores[1] == '' && valores[2] != '' && valores[3] == ''){
        return ( data.nombre_cliente == valores[2] );
      }

      //Filtra solo por Asignado
      else if(valores[0] == '' && valores[1] == '' && valores[2] == '' && valores[3] != ''){
        return ( data.usuario_asignado == valores[3] );
      }

      //Filtra por Cliente y Asignado
      else if(valores[0] == '' && valores[1] == '' && valores[2] != '' && valores[3] != ''){
        return ( (data.nombre_cliente == valores[2]) &&  (data.usuario_asignado == valores[3]) );
      }
      //Filtra por Nombre y Asignado
      else if(valores[0] == '' && valores[1] != '' && valores[2] == '' && valores[3] != ''){
        return ( ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1 ) &&  (data.usuario_asignado == valores[3]) );
      }
      //Filtra por Nombre y Cliente
      else if(valores[0] == '' && valores[1] != '' && valores[2] != '' && valores[3] == ''){
        return ( ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1) &&  (data.nombre_cliente == valores[2]) );
      }
      //Filtra por Nombre, Cliente y Asignado
      else if(valores[0] == '' && valores[1] != '' && valores[2] != '' && valores[3] != ''){
        return ( ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1) && (data.nombre_cliente == valores[2]) && (data.usuario_asignado == valores[3])  );
      }
      //Filtra por id_projecto y Asignado
      else if(valores[0] != '' && valores[1] == '' && valores[2] == '' && valores[3] != ''){
        return ( ((data.id_projecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && (data.usuario_asignado == valores[3])  );
      }
      //Filtra por id_projecto y Cliente
      else if(valores[0] != '' && valores[1] == '' && valores[2] != '' && valores[3] == ''){
        return ( ((data.id_projecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && (data.nombre_cliente == valores[2])  );
      }
      //Filtra por id_projecto, Cliente y Asignado
      else if(valores[0] != '' && valores[1] == '' && valores[2] != '' && valores[3] != ''){
        return ( ((data.id_projecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && (data.nombre_cliente == valores[2]) && (data.usuario_asignado == valores[3])  );
      }
      //id_projecto y Nombre
      else if(valores[0] != '' && valores[1] != '' && valores[2] == '' && valores[3] == ''){
        return ( ((data.id_projecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1])) != -1 );
      }
      //Filtra por id_projecto, Nombre y Asignado
      else if(valores[0] != '' && valores[1] != '' && valores[2] == '' && valores[2] != ''){
        return ( ((data.id_projecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1) && (String(data.usuario_asignado) == (valores[3])) );
      }
      //Filtra id_projecto, Nombre y Cliente
      else if(valores[0] != '' && valores[1] != '' && valores[2] != '' && valores[3] == ''){
        return ( ((data.id_projecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1) && (data.nombre_cliente == valores[2])  );
      }
      //id_projecto, Nombre, Cliente y Asignado
      else{
        return ( ((data.id_projecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1) &&  (data.nombre_cliente == valores[2]) && (data.usuario_asignado) == valores[3]    );                                                                                                ;
      }
      
    }
    return respuesta;
  }

  filtrarPor(valores:string[]){
    if (valores[0] != '' && valores[1] == '' && valores[2] == '' && valores[3] == '') {
      console.log("Esta condicion" )
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
    }

    //Filtra solo por nombre_projecto
    else if (valores[0] == '' && valores[1] != '' && valores[2] == '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
    }

    //Filtra solo por Cliente
    else if (valores[0] == '' && valores[1] == '' && valores[2] != '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
    }

    //Filtra solo por Asignado
    else if (valores[0] == '' && valores[1] == '' && valores[2] == '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }

    //Filtra por Cliente y Asignado
    else if (valores[0] == '' && valores[1] == '' && valores[2] != '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }
    //Filtra por Nombre y Asignado
    else if (valores[0] == '' && valores[1] != '' && valores[2] == '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }
    //Filtra por Nombre y Cliente
    else if (valores[0] == '' && valores[1] != '' && valores[2] != '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
    }
    //Filtra por Nombre, Cliente y Asignado
    else if (valores[0] == '' && valores[1] != '' && valores[2] != '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();

    }
    //Filtra por id_projecto y Asignado
    else if (valores[0] != '' && valores[1] == '' && valores[2] == '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }
    //Filtra por id_projecto y Cliente
    else if (valores[0] != '' && valores[1] == '' && valores[2] != '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
    }
    //Filtra por id_projecto, Cliente y Asignado
    else if (valores[0] != '' && valores[1] == '' && valores[2] != '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();

    }
    //id_projecto y Nombre
    else if (valores[0] != '' && valores[1] != '' && valores[2] == '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
    }
    //Filtra por id_projecto, Nombre y Asignado
    else if (valores[0] != '' && valores[1] != '' && valores[2] == '' && valores[2] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();

    }
    //Filtra id_projecto, Nombre y Cliente
    else if (valores[0] != '' && valores[1] != '' && valores[2] != '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();

    }
    else {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }
  }
  

 
  
  
  getDatosFiltrosProyecto(event: Event){ //Los inputs
    const idParametroFiltro = (event.currentTarget as HTMLInputElement).id;
    const valorParametroFiltro = (event.currentTarget as HTMLInputElement).value;
    this.filtrarProyectos(idParametroFiltro,valorParametroFiltro);
  }
  public selectProyecto(select:MatSelectChange) {
    const id = select.source.id
    const valor = select.source.triggerValue
    console.log(id + valor)
    
    this.filtrarProyectos(id,valor);
  }

  

  //Tarea y proyectos
  programadores: Programador[] = [
    {value: 'Federico', viewValue: 'Federico Gauchat'},
    {value: 'steak-0', viewValue: 'Ignacio Girod'},
    {value: 'pizza-1', viewValue: 'Luciano Di Giorgio'},
  ];
  
  getAsignadoAProyecto(programador: any){
    this.asignadoAproyecto = programador;
    this.filtrosProyectoDialog[3].asignadoAproyecto = this.asignadoAproyecto;
  }
  
  getProyecto(proyecto:any):void{
   
    this.proyectoSeleccionado = proyecto.nombre_projecto;
    this.nombreProyecto = this.proyectoSeleccionado
    console.log(this.proyectoSeleccionado)
    this.buscarProyectoInterface.proyectoSeleccionado = this.proyectoSeleccionado;
    this.buscarTareasInterface.idProyectoSeleccionado = proyecto.id_projecto;
    this.dialogRef.close(this.buscarProyectoInterface);
    console.log(this.nombreProyecto);
    
  }

  prioridades: Prioridad[] = [
    {nombre:'Alta', valor:'Alta'},
    {nombre:'Media', valor:'Media'},
    {nombre:'Baja', valor:'Baja'}
  ]
  getPrioridadTarea(prioridad: any){
    this.prioridadTarea = prioridad;
  }

  facilitadores: Facilitador[] = [
    {nombre:'Franco Friggeri'},
    {nombre:'Maximiliano Reichert'},
    {nombre:'Jeremias García'}
  ]

  getFacilitadorTarea(facilitador:any){
    this.facilitadorTarea = facilitador;
    console.log(this.facilitadorTarea);
  }

  
  getAsignadoAtarea(programador:any){//Programadores

    this.asignadoAtarea = programador.viewValue;
    console.log(this.asignadoAtarea)
  }



  tecnologias: Tecnologia[]=[
    {nombre: 'Angular'},
    {nombre: 'Wordpress'}
  ]

  tecnologiaElegidaTarea(tecnologia:any){
    this.tecnologia = tecnologia.nombre
    console.log(this.tecnologia)
  }

  french() {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);

  }

  getDateFormatString(): string {
    
    if (this._locale === 'ja-JP') {
      return 'YYYY/MM/DD';
      
    } else if (this._locale === 'fr') {
      return 'DD/MM/YYYY';
    }
    return '';
  }
  

  guardarValoresDeFiltro(){
    if(this.buscarProyecto){
      this.filtrosProyectoDialog = JSON.parse(JSON.stringify(this.buscarProyectoInterface.filtros));
      this.filtrosProyectoDialog[0].numeroProyecto = this.numeroProyecto;
      this.filtrosProyectoDialog[1].nombreProyecto = this.nombreProyecto;
      this.filtrosProyectoDialog[2].clienteProyecto = this.clienteProyecto;
      this.filtrosProyectoDialog[3].asignadoAproyecto = this.asignadoAproyecto;
      this.dialogRef.close(this.filtrosProyectoDialog);
    }
    else{
      //this.filtrosTareasDialog = JSON.parse(JSON.stringify(this.filtrosTarea));
      this.filtrosTareasDialog[0].nombreTarea = this.nombreTarea;
      this.filtrosTareasDialog[1].prioridadTarea = this.prioridadTarea;
      this.filtrosTareasDialog[2].facilitadorTarea = this.facilitadorTarea;
      this.filtrosTareasDialog[3].asignadoAtarea = this.asignadoAtarea;
      this.filtrosTareasDialog[4].tecnologiatarea = this.tecnologia;
      this.dialogRef.close(this.filtrosTareasDialog);
    }

  }

  limpiarValoresDeFiltros(){
    
    if(this.buscarProyecto){
      //this.filtrosProyectoDialog = JSON.parse(JSON.stringify(this.buscarProyectoInterface.filtros));
      console.log(this.filtrosProyectoDialog)
      this.filtrosProyectoDialog[0].numeroProyecto = '';
      this.filtrosProyectoDialog[1].nombreProyecto = '';
      this.filtrosProyectoDialog[2].clienteProyecto= '';
      this.filtrosProyectoDialog[3].asignadoAproyecto = '';
      this.dialogRef.close(this.filtrosProyectoDialog);
    }
    else{
      console.log(this.filtrosTareasDialog)
      this.filtrosTareasDialog[0].nombreTarea = '';
      this.filtrosTareasDialog[1].prioridadTarea = '';
      this.filtrosTareasDialog[2].facilitadorTarea = '';
      this.filtrosTareasDialog[3].asignadoAtarea = '';
      this.filtrosTareasDialog[4].tecnologiatarea = '';
      this.dialogRef.close(this.filtrosTareasDialog);
    }
  }

  cerrarDialog(){
    if(this.buscarProyecto){
      this.dialogRef.close(this.filtrosProyectoDialog);
    }
    else{
      this.dialogRef.close(this.filtrosTareasDialog);
    }
  }

}
