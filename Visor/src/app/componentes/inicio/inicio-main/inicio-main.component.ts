import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-main',
  templateUrl: './inicio-main.component.html',
  styleUrls: ['./inicio-main.component.css']
})
export class InicioMainComponent implements OnInit {

  fechaHoy?: string;

  constructor() { }

  ngOnInit(): void {
    const fechaHoy = new Date();
    this.fechaHoy = fechaHoy.getDate() + '-' + (fechaHoy.getMonth()+1) + '-' + fechaHoy.getFullYear();
  }

}
