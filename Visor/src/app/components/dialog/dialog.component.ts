import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyectos } from 'src/app/interfaces/proyectos';
import { Tareas } from 'src/app/interfaces/tareas';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
// import 'moment/locale/ja';
// import 'moment/locale/fr';
import { FormBuilder } from '@angular/forms';




interface Food {
  value: string;
  viewValue: string;
}
interface Employee {
  value: string;
  viewValue: string;
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
  buscarTareas: boolean = false;
  numeroProyecto: string = '';
  nombreProyecto: string = '';
  nombreTarea = "Tareas";
  proyectoSeleccionado: string = '';
  listaProyectos: any[] = [];
  

  

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public buscarProyectoInterface: Proyectos, @Inject(MAT_DIALOG_DATA) public buscarTareasInterface: Tareas, private _adapter: DateAdapter<any>,
  @Inject(MAT_DATE_LOCALE) private _locale: string, public dialogRef: MatDialogRef<DialogComponent>) {
    
    if(buscarProyectoInterface.buscaProyectos){
      this.buscarProyecto = buscarProyectoInterface.buscaProyectos;
    }
    
    if(buscarTareasInterface.buscaTareas){
      this.buscarTareas = buscarTareasInterface.buscaTareas;
    }

    this._locale = 'es';
    this._adapter.setLocale(this._locale);
    
        
    //this.listaProyectos = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4', 'Proyecto 5'];
    this.listaProyectos = [
      {nombre: 'Proyecto 1'}, 
      {nombre: 'Proyecto 2'}
    ];
  }

  ngOnInit(): void {
  }
  toppings = this._formBuilder.group({
    misProyectos: false,
    extracheese: false,
    mushroom: false,
  });
  

  

  foods: Food[] = [
    {value: 'ninguno', viewValue: 'Ninguno'},
    {value: 'steak-0', viewValue: 'Cliente 1'},
    {value: 'pizza-1', viewValue: 'Cliente 2'},
    {value: 'tacos-2', viewValue: 'Cliente 3'},
  ];

  selectedFood = this.foods[0].value;
  
  employees: Employee[] = [
    {value: 'Federico', viewValue: 'Federico Gauchat'},
    {value: 'steak-0', viewValue: 'Ignacio Girod 1'},
    {value: 'pizza-1', viewValue: 'Luciano Di Giorgio'},
  ];
  selectedEmployee = this.employees[0].value

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
    this.nombreProyecto = valor;
    this.dialogRef.close(this.nombreProyecto);
    console.log(this.nombreProyecto);
    
  }
  

  

}
