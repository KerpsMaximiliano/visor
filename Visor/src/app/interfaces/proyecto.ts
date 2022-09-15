import { Tarea } from "./tarea";

export interface Proyecto {
    nombre: string,
    tareas: Tarea[],
    porcentajeTareasAtrasadas: number,
    porcentajeTareasATiempo: number,
    porcentajeHPCompletadas: number,
    porcentajeHPEnProgreso: number,
    porcentajeHPEnPrueba: number
    porcentajeHPNoIniciadas: number
}
