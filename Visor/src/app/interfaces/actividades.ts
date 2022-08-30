import { DateAdapter } from "@angular/material/core";

export interface Actividad{
    [x: string]: any;
    //fecha: {Date:'dd/MM/yy'};
    fecha: Date;
    horas: Number;
    descripcion: any;
    asunto: String;
    tareas: String;
}
