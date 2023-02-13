// * Estructura de la información de la respuesta del servicio proyecto-data.getProjectStatus();
export interface IProjectStatus {
  returnset: Returnset[];
  dataset: Dataset[];
}

export interface Dataset {
  Estado: string;
  Horas: number;
}

export interface Returnset {
  RCode: number;
  RTxt: string;
  RId: string;
  RSQLErrNo: number;
  RSQLErrtxt: string;
}
