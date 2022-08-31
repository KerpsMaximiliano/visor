import { Injectable } from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

tareas: Tarea[] = [
    {
        titulo: "124192-H4-ANG-PUBLICAR EXTRACTO (CU-705)",
        proyecto: "Sala de Sorteos - Extractos Digitales",
        prioridad: "Alta",
        asignado: "Franco Friggeri",
        facilitador: "Jose Gerardo Gonzalez Muñoz",
        fechaInicio: "01/09/2022",
        fechaFin: "",
        fechaPlanificacion: "30/09/2022",
        horasPlanificadas: 4,
        horasEjecutadas: 0,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos",
        estado: "No Iniciada",
        sprint: ""  
    },
    {
        titulo: "124192-AA-ANG-PUBLICAR EXTRACTO (CU-705)",
        proyecto: "Sala de Sorteos - Extractos Digitales",
        prioridad: "Baja",
        asignado: "Franco Friggeri",
        facilitador: "Jose Gerardo Gonzalez Muñoz",
        fechaInicio: "01/09/2022",
        fechaFin: "",
        fechaPlanificacion: "30/09/2022",
        horasPlanificadas: 4,
        horasEjecutadas: 0,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos",
        estado: "No Iniciada",
        sprint: ""
    },
    {
        titulo: "124192-H4-ANG-PUBLICAR EXTRACTO (CU-705)",
        proyecto: "Sala de Sorteos - Extractos Digitales",
        prioridad: "Alta",
        asignado: "Franco Friggeri",
        facilitador: "Jose Gerardo Gonzalez Muñoz",
        fechaInicio: "01/09/2022",
        fechaFin: "",
        fechaPlanificacion: "30/09/2022",
        horasPlanificadas: 4,
        horasEjecutadas: 2,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos",
        estado: "En Progreso",
        sprint: ""
    },
    {
        titulo: "124192-H4-AAA-PUBLICAR EXTRACTO (CU-705)",
        proyecto: "Sala de Sorteos - Extractos Digitales",
        prioridad: "Baja",
        asignado: "Franco Friggeri",
        facilitador: "Jose Gerardo Gonzalez Muñoz",
        fechaInicio: "01/09/2022",
        fechaFin: "",
        fechaPlanificacion: "30/09/2022",
        horasPlanificadas: 4,
        horasEjecutadas: 1,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos",
        estado: "En Progreso",
        sprint: ""
    },
    {
        titulo: "124192-H4-ANG-PUBLICAR EXTRACTO (CU-705)",
        proyecto: "Sala de Sorteos - Extractos Digitales",
        prioridad: "Media",
        asignado: "Franco Friggeri",
        facilitador: "Jose Gerardo Gonzalez Muñoz",
        fechaInicio: "01/09/2022",
        fechaFin: "",
        fechaPlanificacion: "30/09/2022",
        horasPlanificadas: 4,
        horasEjecutadas: 3,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos",
        estado: "En Progreso",
        sprint: ""
    },
    {
        titulo: "124192-H4-ANG-PUBLICAR EXTRACTO (CU-705)",
        proyecto: "Sala de Sorteos - Extractos Digitales",
        prioridad: "Media",
        asignado: "Franco Friggeri",
        facilitador: "Jose Gerardo Gonzalez Muñoz",
        fechaInicio: "01/09/2022",
        fechaFin: "",
        fechaPlanificacion: "30/09/2022",
        horasPlanificadas: 4,
        horasEjecutadas: 0,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos",
        estado: "No Iniciada",
        sprint: ""
    },
    {
        titulo: "124192-H4-AAA-PUBLICAR EXTRACTO (CU-705)",
        proyecto: "Sala de Sorteos - Extractos Digitales",
        prioridad: "Alta",
        asignado: "Franco Friggeri",
        facilitador: "Jose Gerardo Gonzalez Muñoz",
        fechaInicio: "01/09/2022",
        fechaFin: "",
        fechaPlanificacion: "30/09/2022",
        horasPlanificadas: 4,
        horasEjecutadas: 0,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos",
        estado: "No Iniciada",
        sprint: ""
    },
    {
        titulo: "124192-H4-ANG-PUBLICAR EXTRACTO WEB (CU-711)",
        proyecto: "Sala de Sorteos - Extractos Digitales",
        prioridad: "Baja",
        asignado: "Franco Friggeri",
        facilitador: "Jose Gerardo Gonzalez Muñoz",
        fechaInicio: "01/08/2022",
        fechaFin: "16/08/2022",
        fechaPlanificacion: "31/08/2022",
        horasPlanificadas: 2,
        horasEjecutadas: 3.5,
        documento: "Documento 2",
        tareasPrecondicion: "Tarea 9",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos",
        estado: "Completada",
        sprint: ""
    },
    {
        titulo: "124192-I+D-ANG-DESZIPEO DE ARCHIVO",
        proyecto: "Sala de Sorteos - Extractos Digitales",
        prioridad: "Media",
        asignado: "Franco Friggeri",
        facilitador: "Adrian Enrico",
        fechaInicio: "01/08/2022",
        fechaFin: "09/08/2022",
        fechaPlanificacion: "30/09/2022",
        horasPlanificadas: 4,
        horasEjecutadas: 2,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos",
        estado: "Completada",
        sprint: ""
    },
    {
        titulo: "124192-HX-ANG-UI ACTA ESCRIBANO",
        proyecto: "Sala de Sorteos - Extractos Digitales",
        prioridad: "Alta",
        asignado: "Franco Friggeri",
        facilitador: "Adrian Enrico",
        fechaInicio: "24/06/2022",
        fechaFin: "27/06/2022",
        fechaPlanificacion: "30/06/2022",
        horasPlanificadas: 4,
        horasEjecutadas: 5.5,
        documento: "Documento 1",
        tareasPrecondicion: "Tarea 1",
        notas: "",
        tipoTarea: "Relevamiento Requerimientos",
        estado: "Completada",
        sprint: "124192-ETAPA 5 ANGULAR"
    }
];

getTareasNoIniciadas() {
    const respuesta: Tarea[] = [];
    this.tareas.forEach(tarea => {
    if(tarea.estado == "No Iniciada" && tarea.tipoTarea == "Relevamiento Requerimientos") {
        respuesta.push(tarea);
    }
});
return respuesta;
}

getTareasEnProgreso() {
const respuesta: Tarea[] = [];
this.tareas.forEach(tarea => {
    if(tarea.estado == "En Progreso" && tarea.tipoTarea == "Relevamiento Requerimientos") {
        respuesta.push(tarea);
    }
});
return respuesta;
}

getTareasCompletadas() {
const respuesta: Tarea[] = [];
this.tareas.forEach(tarea => {
    if(tarea.estado == "Completada" && tarea.tipoTarea == "Relevamiento Requerimientos") {
        respuesta.push(tarea);
    }
});
return respuesta;
}

}