import { FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/i2t/colaborador.service';

@Component({
  selector: 'app-inicio-disponibilidad-colaboradores',
  templateUrl: './inicio-disponibilidad-colaboradores.component.html',
  styleUrls: ['./inicio-disponibilidad-colaboradores.component.css']
})
export class InicioDisponibilidadColaboradoresComponent implements OnInit {

  dataSource!: any;
  orden: any[] = ['Alfabetico', 'Tiempo disponible'];
  fechaHasta!: string;

  constructor(private _colaboradorService: ColaboradorService) { }

  ngOnInit(): void {
    let fecha = new Date();
    fecha.toLocaleDateString();
    this.fechaHasta = fecha.getMonth()+1 + '-' + fecha.getFullYear();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}