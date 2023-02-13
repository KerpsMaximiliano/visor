// * Estructura de la información de la respuesta del servicio proyecto-data.getProjectAreas();
export interface IProjectAreas {
  returnset: Returnset[];
  dataset: Dataset[];
}

export interface Dataset {
  Area: string;
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
