import { DateAdapter } from "@angular/material/core";

export interface ActividadSuite
    {
        "par_modo" : string,
        "titulo": string,
        "id_actividad": string,
        "descripcion": string,
        "estado": string,
        "horas_ejecutadas": number,
        "tipo_actividad" : string,
        "asignado_a" : string,
        "id_tarea": string,
        "fecha": Date,
        "asunto_actividad":string,
        "nombre_tarea":string
    }
   
