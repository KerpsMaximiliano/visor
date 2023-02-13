// * Estructura de la información de la respuesta del servicio proyecto-data.getProjects().
export interface IProjects {
  returnset: Returnset[];
  dataset: Dataset[];
}

export interface Dataset {
  Id_Caso: string;
  Caso: string;
  Numero_Caso: number;
  Cliente: string;
  Asignado_a: string;
  Tareas_totales: number;
  Tareas_atrasadas: number;
}

export interface Returnset {
  RCode: number;
  RTxt: string;
  RId: string;
  RSQLErrNo: number;
  RSQLErrtxt: string;
}
