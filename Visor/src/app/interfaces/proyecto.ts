import { Tarea } from "./tarea";

export interface Proyecto {
    nombre: string,
    tareas: Tarea[],
    porcentajeTareasAtrasadas: number,
    porcentajeTareasATiempo: number,
    porcentajeTareasCompletadas: number,
    porcentajeTareasEnProgreso: number,
    porcentajeTareasEnPrueba: number
}
