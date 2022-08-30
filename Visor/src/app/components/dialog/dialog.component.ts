import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyectos } from 'src/app/interfaces/proyectos';
import { Tareas } from 'src/app/interfaces/tareas';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
// import 'moment/locale/ja';
// import 'moment/locale/fr';
import { FormBuilder } from '@angular/forms';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';




interface Cliente {
  value: string;
  viewValue: string;
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

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [
  ]
})

export class DialogComponent implements OnInit {

  buscarProyecto: boolean = false;
  
  numeroProyecto: string = '';
  nombreProyecto: string = '';
  clienteProyecto: string = '';
  asignadoAproyecto: string = '';

  buscarTareas: boolean = false;
  nombreTarea = "Tareas";
  proyectoSeleccionado: string = '';
  listaProyectos: any[] = [];
  tecnologia: string = '';
  

  

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public buscarProyectoInterface: Proyectos, @Inject(MAT_DIALOG_DATA) public buscarTareasInterface: Tareas, private _adapter: DateAdapter<any>,
  @Inject(MAT_DATE_LOCALE) private _locale: string, public dialogRef: MatDialogRef<DialogComponent>) {
    
    if(buscarProyectoInterface.buscaProyectos){
      this.buscarProyecto = buscarProyectoInterface.buscaProyectos;
      buscarProyectoInterface.filtros = [];
    }
    
    if(buscarTareasInterface.buscaTareas){
      this.buscarTareas = buscarTareasInterface.buscaTareas;
    }

    this._locale = 'es';
    this._adapter.setLocale(this._locale);
    
        
    //this.listaProyectos = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4', 'Proyecto 5'];
    this.listaProyectos = [
      {nombre: 'Proyecto 1'}, 
      {nombre: 'Proyecto 2'},
      {nombre: 'Proyecto 3'},
      {nombre: 'Proyecto 4'},
      {nombre: 'Proyecto 5'},
      {nombre: 'Proyecto 6'},
      {nombre: 'Proyecto 7'},
      {nombre: 'Proyecto 8'},
    ];
  }

  ngOnInit(): void {
  }
  toppings = this._formBuilder.group({
    misProyectos: false,
    extracheese: false,
    mushroom: false,
  });
  

  

  clientes: Cliente[] = [
    {value: 'ninguno', viewValue: 'Ninguno'},
    {value: 'steak-0', viewValue: 'Cliente 1'},
    {value: 'pizza-1', viewValue: 'Cliente 2'},
    {value: 'tacos-2', viewValue: 'Cliente 3'},
  ];
  getCliente(cliente: any){
    this.clienteProyecto = cliente.viewValue
  }
  seleccionado = this.clientes[0].value

  prioridades: Prioridad[] = [
    {nombre:'Alta', valor:'Alta'},
    {nombre:'Media', valor:'Media'},
    {nombre:'Baja', valor:'Baja'}
  ]


  facilitadores: Facilitador[] = [
    {nombre:'Franco Friggeri'},
    {nombre:'Maximiliano Reichert'},
    {nombre:'Jeremias García'}
  ]

  
  
  
  programadores: Programador[] = [
    {value: 'Federico', viewValue: 'Federico Gauchat'},
    {value: 'steak-0', viewValue: 'Ignacio Girod'},
    {value: 'pizza-1', viewValue: 'Luciano Di Giorgio'},
  ];
  selectedProgramador = this.programadores[0].value

  getAsignadoA(programador: any){
    this.asignadoAproyecto = programador.viewValue;
    
  }

  tecnologias: Tecnologia[]=[
    {nombre: 'Angular'},
    {nombre: 'Wordpress'}
  ]

  tecnologiaElegida(tecnologia:any){
    this.tecnologia = tecnologia.nombre
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
  getNombreProyecto(valor:string):void{
    this.buscarProyectoInterface.proyectoSeleccionado = valor;
    this.dialogRef.close(this.buscarProyectoInterface);
    console.log(this.nombreProyecto);
    
  }

  guardarValoresDeFiltro(){
    const valoresDeFiltro = [];

    if(this.numeroProyecto != ''){
      this.buscarProyectoInterface.filtros.push({numeroProyecto: this.numeroProyecto} )
      //valoresDeFiltro.push({numeroProyecto: this.numeroProyecto})
      
    }
    if(this.nombreProyecto != ''){
      this.buscarProyectoInterface.filtros.push({nombreProyecto: this.nombreProyecto})
    }
    
    if(this.clienteProyecto != ''){
      this.buscarProyectoInterface.filtros.push({cliente: this.clienteProyecto})
    }

    if(this.asignadoAproyecto != ''){
      console.log(this.asignadoAproyecto)
      this.buscarProyectoInterface.filtros.push({asignado: this.asignadoAproyecto})
    }


    this.dialogRef.close(this.buscarProyectoInterface);
  }
  

  

}
