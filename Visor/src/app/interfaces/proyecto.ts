export interface Proyecto {
    id: number;
    nombre: string;
    planificadas: number;
    noIniciadas: number;
    enProgreso: number;
    enPrueba: number;
    completadas: number;
    tieneTareasUsuario: boolean;
    cliente: string;
    asignadoA: string;
}