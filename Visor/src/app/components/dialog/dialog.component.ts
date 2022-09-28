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
  clienteSeleccionado: boolean = false;
  asignadoAproyecto: string = '';
  
  dataSource: MatTableDataSource<PropiedadesProyecto>;
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
  
  listaProyectos: any[] = [];
  tecnologia: string = '';
  
  facilitadorTarea: any
  asignadoAtarea :any
  tecnologiatarea : any
  
  columnas: string[] = ['nombre'];

  

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public buscarProyectoInterface: Proyectos, @Inject(MAT_DIALOG_DATA) public buscarTareasInterface: Tareas, private _adapter: DateAdapter<any>,
  @Inject(MAT_DATE_LOCALE) private _locale: string, public dialogRef: MatDialogRef<DialogComponent>) {
    console.log(buscarProyectoInterface)
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
      
    }
    //Pregunto si el pop up se abrió para buscar TAREAS
    
    if(buscarTareasInterface.buscaTareas){
      this.buscarTareas = buscarTareasInterface.buscaTareas;
      
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
      { id: 128109, nombre: 'Entrenamiento en Drupal y Symfony', planificadas: 448, noIniciadas: 424, enProgreso: 24, enPrueba: 0, completadas: 0, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
      { id: 125039, nombre: 'Restyling y Migración de Portal PAC', planificadas: 3600, noIniciadas: 500, enProgreso: 0, enPrueba: 0, completadas: 2400, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 124132, nombre: 'Sala de Sorteos - Extractos Digitales', planificadas: 2400, noIniciadas: 492, enProgreso: 200, enPrueba: 0, completadas: 1640, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
      { id: 888888, nombre: 'Visorrr - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 144, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' }
    ]
    this.listaProyectos = proyectos;
    // this.listaProyectos = [
      
    // { id: 128109, nombre: 'Entrenamiento en Drupal y Symfony', planificadas: 448, noIniciadas: 424, enProgreso: 24, enPrueba: 0, completadas: 0, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
    // { id: 125029, nombre: 'Restyling y Migración de Portal PAC', planificadas: 3600, noIniciadas: 500, enProgreso: 0, enPrueba: 0, completadas: 2400, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    // { id: 124192, nombre: 'Sala de Sorteos - Extractos Digitales', planificadas: 2400, noIniciadas: 492, enProgreso: 200, enPrueba: 0, completadas: 1640, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
    // { id: 888888, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    // { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 144, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    // { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    // { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    // { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    // { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' }

    // ];
    this.dataSource = new MatTableDataSource(this.listaProyectos);
    //this.result = new MatTableDataSource(this.listaProyectos);
    console.log(this.dataSource)
    

  }
  
  ngOnInit(): void {    
  }
  toppings = this._formBuilder.group({
    misProyectos: false,
    extracheese: false,
    mushroom: false,
  });
  filtrarProyectos(id:string,valor:string){
    const idParametroFiltro = id;
    const valorParametroFiltro = valor;
      // const idParametroFiltro = (event.currentTarget as HTMLInputElement).id;
      // const valorParametroFiltro = (event.currentTarget as HTMLInputElement).value;
      console.log(idParametroFiltro)
      console.log(valorParametroFiltro)
    
    
    switch(idParametroFiltro){
      case 'nroProyecto':
        this.numeroProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[0].numeroProyecto = this.numeroProyecto;//Para permanencia de filtro
        this.valoresFiltros.id = valorParametroFiltro;
        
        this.dataSource.filterPredicate = (data: PropiedadesProyecto, filter: string): boolean => {
          this.valoresFiltros.id = valorParametroFiltro;
          const valores = Object.values(this.valoresFiltros)
          
          
          if(valores[0] != '' && valores[1] == ''){//Filtra solo por id
            console.log("Valores 0: " + valores[0])
            console.log("Valores 1: " + valores[1])
            
            
            return (String(data.id).indexOf(valores[0]) != -1);
          }
          else if(valores[0] != '' && valores[1] != ''){ //Filtra por id y por nombre         
            console.log("Valores 0: " + valores[0])
            console.log("Valores 1: " + valores[1])
            return ((String(data.id).indexOf(valores[0]) != -1) && ((String(data.nombre).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1));
          }
          else{//Filtra por nombre
            return ((String(data.nombre).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1);
          }
          
          
          //filtra solo por una coluimna de la tabla?
        }
        if(this.valoresFiltros.id != ''){

          this.dataSource.filter = this.valoresFiltros.id.trim().toLowerCase();
        }
        else{
          console.log("entra")
          this.dataSource.filter = this.valoresFiltros.nombre.trim().toLowerCase();
        }
        
      break;
      case 'nombreProyecto':
        this.nombreProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[1].nombreProyecto = this.nombreProyecto;
        this.valoresFiltros.nombre = valorParametroFiltro;


        this.dataSource.filterPredicate = (data: PropiedadesProyecto, filter: string): boolean => {
          this.valoresFiltros.nombre = valorParametroFiltro;
          const valores = Object.values(this.valoresFiltros)
          console.log(valores)
          //this.filtrarPorId(data,filter);
          console.log(valores[0] != '')
          console.log(valores[1] == '')
          if (valores[0] == '' && valores[1] != '') {//Filtra solo por nombre
            console.log("FIltra solo por nombre")
            return ((String(data.nombre).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1);
          }
          else if (valores[0] != '' && valores[1] != '') { //Filtra por id y por nombre
            console.log("Filtra por id y nombre")
            console.log(valores[1])

            let nombre = (String(data.nombre).split(' ').join('').toLowerCase())
            console.log("Busca " + valores[0] + " en " + (String(data.id)) + ": " + (String(data.id).indexOf(valores[0]) != -1))
            console.log("Busca " + valores[1] + " en " + (String(data.nombre).split(' ').join('').toLowerCase()) + ": " + ((String(data.nombre).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1))
            console.log("Busca " + valores[1] + " en " + nombre + ": " + (nombre.indexOf(valores[1])))



            return ((String(data.id).indexOf(valores[0]) != -1) && ((String(data.nombre).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1));
          }
          else {
            console.log("Filtra solo por id")
            console.log(valores[0])
            console.log("Busca " + valores[0] + " en " + (String(data.id)) + ": " + (String(data.id).indexOf(valores[0]) != -1))
            console.log((String(data.id).indexOf(valores[0]) != -1))
            //Filtra solo por id
            return (String(data.id).indexOf(valores[0]) != -1);
          }

        }
        console.log(this.valoresFiltros.nombre)
        if (this.valoresFiltros.nombre == '') {

          this.dataSource.filter = this.valoresFiltros.id.trim().toLowerCase();
        }
        else {
          this.dataSource.filter = this.valoresFiltros.nombre.trim().toLowerCase();
        }

      break;
      case 'clienteProyecto':
        this.valoresFiltros.cliente = valorParametroFiltro;
        console.log(this.valoresFiltros.cliente)
        this.clienteProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[2] = this.clienteProyecto;
        console.log(this.filtrosProyectoDialog[2])

    }
  }
  applyFilter(event: Event) {
      
    const idParametroFiltro = (event.target as HTMLInputElement).id; //EL FILTRO ANDA CON ESTOS DOS
    const valorParametroFiltro = (event.target as HTMLInputElement).value;
      // const idParametroFiltro = (event.currentTarget as HTMLInputElement).id;
      // const valorParametroFiltro = (event.currentTarget as HTMLInputElement).value;
      console.log(idParametroFiltro)
      console.log(valorParametroFiltro)
    
    
    switch(idParametroFiltro){
      case 'nroProyecto':
        this.numeroProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[0].numeroProyecto = this.numeroProyecto;//Para permanencia de filtro
        this.valoresFiltros.id = valorParametroFiltro;
        
        this.dataSource.filterPredicate = (data: PropiedadesProyecto, filter: string): boolean => {
          this.valoresFiltros.id = valorParametroFiltro;
          const valores = Object.values(this.valoresFiltros)
          
          
          if(valores[0] != '' && valores[1] == ''){//Filtra solo por id
            console.log("Valores 0: " + valores[0])
            console.log("Valores 1: " + valores[1])
            
            
            return (String(data.id).indexOf(valores[0]) != -1);
          }
          else if(valores[0] != '' && valores[1] != ''){ //Filtra por id y por nombre         
            console.log("Valores 0: " + valores[0])
            console.log("Valores 1: " + valores[1])
            return ((String(data.id).indexOf(valores[0]) != -1) && ((String(data.nombre).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1));
          }
          else{//Filtra por nombre
            return ((String(data.nombre).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1);
          }
          
          
          //filtra solo por una coluimna de la tabla?
        }
        if(this.valoresFiltros.id != ''){

          this.dataSource.filter = this.valoresFiltros.id.trim().toLowerCase();
        }
        else{
          console.log("entra")
          this.dataSource.filter = this.valoresFiltros.nombre.trim().toLowerCase();
        }
        
      break;
      case 'nombreProyecto':
        this.nombreProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[1].nombreProyecto = this.nombreProyecto;
        this.valoresFiltros.nombre = valorParametroFiltro;


        this.dataSource.filterPredicate = (data: PropiedadesProyecto, filter: string): boolean => {
          this.valoresFiltros.nombre = valorParametroFiltro;
          const valores = Object.values(this.valoresFiltros)
          console.log(valores)
          //this.filtrarPorId(data,filter);
          console.log(valores[0] != '')
          console.log(valores[1] == '')
          if (valores[0] == '' && valores[1] != '') {//Filtra solo por nombre
            console.log("FIltra solo por nombre")
            return ((String(data.nombre).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1);
          }
          else if (valores[0] != '' && valores[1] != '') { //Filtra por id y por nombre
            console.log("Filtra por id y nombre")
            console.log(valores[1])

            let nombre = (String(data.nombre).split(' ').join('').toLowerCase())
            console.log("Busca " + valores[0] + " en " + (String(data.id)) + ": " + (String(data.id).indexOf(valores[0]) != -1))
            console.log("Busca " + valores[1] + " en " + (String(data.nombre).split(' ').join('').toLowerCase()) + ": " + ((String(data.nombre).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1))
            console.log("Busca " + valores[1] + " en " + nombre + ": " + (nombre.indexOf(valores[1])))



            return ((String(data.id).indexOf(valores[0]) != -1) && ((String(data.nombre).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1));
          }
          else {
            console.log("Filtra solo por id")
            console.log(valores[0])
            console.log("Busca " + valores[0] + " en " + (String(data.id)) + ": " + (String(data.id).indexOf(valores[0]) != -1))
            console.log((String(data.id).indexOf(valores[0]) != -1))
            //Filtra solo por id
            return (String(data.id).indexOf(valores[0]) != -1);
          }

        }
        console.log(this.valoresFiltros.nombre)
        if (this.valoresFiltros.nombre == '') {

          this.dataSource.filter = this.valoresFiltros.id.trim().toLowerCase();
        }
        else {
          this.dataSource.filter = this.valoresFiltros.nombre.trim().toLowerCase();
        }

      break;
      case 'clienteProyecto':
        this.valoresFiltros.cliente = valorParametroFiltro;
        console.log("hola")
        this.clienteProyecto = valorParametroFiltro;
        console.log(this.filtrosProyectoDialog[2])
        this.filtrosProyectoDialog[2] = this.clienteProyecto;

    }
  }

  clientes: Cliente[] = [
    {value: 'steak-0', viewValue: 'Cliente 1', id: 'clienteProyecto'},
    {value: 'pizza-1', viewValue: 'Cliente 2', id: 'clienteProyecto'},
    {value: 'tacos-2', viewValue: 'Cliente 3', id: 'clienteProyecto'},
  ];
  // getClienteProyecto(cliente: Event){
  //   console.log(cliente)
  //   console.log(cliente.target as HTMLInputElement)
  //   const idParametroFiltro = (cliente.target as HTMLInputElement).id;
  //   const valorParametroFiltro = (cliente.target as HTMLInputElement).value;
  //   console.log("id: " + idParametroFiltro )
  //   console.log("Valor: " +  valorParametroFiltro)
  //   //this.clienteProyecto = cliente.viewValue;
  //   console.log(this.clienteProyecto)
  //   this.filtrosProyectoDialog[2].clienteProyecto = this.clienteProyecto;
  //   //Llamar filtro
  //   this.applyFilter(cliente) 
  // }
  //Capturar valor de id y valor y llamar al filter
  // getIdYvalor(tag:any){
  //   const id = 
  //   const valor = 

  // }
  public changeClient(cliente:MatSelectChange) {
    //this.clienteProyecto = (cliente.target as HTMLInputElement).value
    this.clienteSeleccionado = true;
    const id = cliente.source.id
    const valor = cliente.source.triggerValue
    
    this.filtrarProyectos(id,valor);
    
    //console.log((cliente.currentTarget as HTMLInputElement).id)
    //console.log((cliente.currentTarget as HTMLInputElement))
    //this.applyFilter(cliente) 
  }
  getDatosFiltrosProyecto(){ //Los inputs

  }

  

  //Tarea y proyectos
  programadores: Programador[] = [
    {value: 'Federico', viewValue: 'Federico Gauchat'},
    {value: 'steak-0', viewValue: 'Ignacio Girod'},
    {value: 'pizza-1', viewValue: 'Luciano Di Giorgio'},
  ];
  
  getAsignadoAProyecto(programador: any){
    this.asignadoAproyecto = programador.viewValue;
    this.filtrosProyectoDialog[3].asignadoAproyecto = this.asignadoAproyecto;
  }
  
  getNombreProyecto(valor:string):void{
    this.buscarProyectoInterface.proyectoSeleccionado = valor;
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
