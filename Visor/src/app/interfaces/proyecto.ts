import { Tarea } from "./tarea";
import { AvanceDisenioFuncional } from './avance-disenio-funcional';
import { AvanceDisenioTecnico } from './avance-disenio-tecnico';

export interface Proyecto {
    numero: number,
    nombre: string,
    cliente: string,
    tareas: Tarea[],
    porcentajeTareasAtrasadas: number,
    porcentajeTareasATiempo: number,
    porcentajeHPCompletadas: number,
    porcentajeHPEnProgreso: number,
    porcentajeHPEnPrueba: number,
    porcentajeHPNoIniciadas: number,
    avanceDisenioFuncional: AvanceDisenioFuncional,
    avanceDisenioTecnico: AvanceDisenioTecnico
}
