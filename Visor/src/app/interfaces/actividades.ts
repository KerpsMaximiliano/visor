import { DateAdapter } from "@angular/material/core";

export interface Actividad{
    //fecha: {Date:'dd/MM/yy'};
    fecha: Date;
    horas: Number;
    descripcion: any;
    asunto: String;
    tareas: String;
}