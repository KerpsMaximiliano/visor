import { Injectable } from '@angular/core';
import { Actividad } from 'src/app/interfaces/actividad';

@Injectable({
    providedIn: 'root'
})
export class ActividadService {

listActividades: Actividad[] = [
    {
        titulo: "124192-H4-ANG-PUBLICAR EXTRACTO (CU-705)",
        prioridad: "",
        asignado: "Franco Friggeri",
        facilitador: "Jose Gerardo Gonzalez Muñoz",
        fechaInicio: "01/09/2022",
        fechaFin: "",
        fechaPlanificacion: "30/09/2022",
        // seguir a partir de aca
        horasPlanificadas: 17,
        horasEjecutadas: 15,
        horasDesvio: 2,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos"
    },
    {
        titulo: "TP 12 - xxx",
        prioridad: "Baja",
        asignado: "Luciano De Giorgio",
        facilitador: "Federico Gauchat",
        fechaInicio: "01/09/2022",
        fechaFin: "",
        fechaPlanificacion: "30/09/2022",
        horasPlanificadas: 4,
        horasEjecutadas: 4,
        horasDesvio: 2,
        documento: "Documento 2",
        tareasPrecondicion: "Tarea 9",
        notas: "",
        tipoTarea: "Diseño"
    },
    {
    titulo: "TP 28 - xxx",
        prioridad: "Alta",
        asignado: "Franco Friggeri",
        facilitador: "Adrian Enrico",
        fechaInicio: "01/09/2022",
        fechaFin: "",
        fechaPlanificacion: "30/09/2022",
        horasPlanificadas: 17,
        horasEjecutadas: 15,
        horasDesvio: 2,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos"
    }
];


constructor() { }

getActividad(){
    return this.listActividades.slice();
    }

}