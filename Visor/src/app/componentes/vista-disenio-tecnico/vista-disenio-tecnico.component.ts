import { Component } from '@angular/core';
import { Actividad } from 'src/app/interfaces/actividad';

@Component({
  selector: 'app-vista-disenio-tecnico',
  templateUrl: './vista-disenio-tecnico.component.html',
  styleUrls: ['./vista-disenio-tecnico.component.css']
})
export class VistaDisenioTecnicoComponent {

  actividadesNoIniciadas: Actividad[];
  actividadesEnProgreso: Actividad[];
  actividadesCompletadas: Actividad[];
  poseeTareasEnProgreso  !: boolean;
  poseeTareasCompletadas!: boolean;

  panelOpenState = false;

  constructor() {
    this.cargarActividades()
    this.actividadesNoIniciadas = [];
    this.actividadesEnProgreso = [];
    this.actividadesCompletadas = [];
  }

  cargarActividades(){
    this.poseeTareasEnProgreso = false;
    this.poseeTareasCompletadas = true;
  }
}