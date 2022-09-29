import { Tarea } from "./tarea";
import { AvanceDisenioFuncional } from './avance-disenio-funcional';
import { AvanceDisenioTecnico } from './avance-disenio-tecnico';

export interface Proyecto {
    numero: string,
    nombre: string,
    cliente: string,
    asignado: string,
    porcentajeTareasAtrasadas: number,
    porcentajeTareasATiempo: number,
    porcentajeHPCompletadas: number,
    porcentajeHPEnProgreso: number,
    porcentajeHPEnPrueba: number,
    porcentajeHPNoIniciadas: number
}
