import { Component, OnInit } from '@angular/core';
import { ProyectoDataService } from 'src/app/services/i2t/proyecto-data.service';
import { Input } from '@angular/core'
@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})

export class BarraComponent implements OnInit {

  @Input() index: string = "prueba";

  ngOnInit(): void {
  }

  constructor(){
    console.log(this.index)
  }
  /*cargarAmarilla(index: number): number{
    let barraAmarilla = document.getElementById('divAmarilla');
    const porc = '%'
    let porcentaje = ((this.dataService.proyectos[index].toString()).concat(porc));
    barraAmarilla?.style.setProperty('width', porcentaje);
    return index;
  }

  cargarVerde(index: number): number{
    let barraVerde = document.getElementById('divVerde');
    const porc = '%'
    let porcentaje = ((this.dataService.proyectos[index].porcentajeHPCompletadas.toString()).concat(porc));
    barraVerde?.style.setProperty('width', porcentaje);
    return this.dataService.proyectos[index].porcentajeHPCompletadas;
  }

  cargarRojo(index: number): number{
    let barraRoja = document.getElementById('divRojo');
    const porc = '%';
    let porcentaje = ((this.dataService.proyectos[index].porcentajeHPNoIniciadas.toString()).concat(porc));
    barraRoja?.style.setProperty('width', porcentaje);
    return this.dataService.proyectos[index].porcentajeHPNoIniciadas;
  }
*/
}
