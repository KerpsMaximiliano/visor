import { DateAdapter } from "@angular/material/core";

export interface Actividad{
    //fecha: {Date:'dd/MM/yy'};
    position: number;
    fecha: Date;
    horas: Number;
    children: [String];
    asunto: String;
    tareas: String;
   
}
