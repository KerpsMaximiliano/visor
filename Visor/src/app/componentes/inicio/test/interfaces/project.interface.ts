export interface IProject {
  Id_Caso: string;
  Caso: string;
  Numero_Caso: number;
  Cliente: string | null;
  Asignado_a: string;
  Tareas_totales: number | null;
  Tareas_atrasadas: number | null;
}

export interface IReturnset {
  RCode: number;
  RTxt: string;
  RId: string;
  RSQLErrNo: number;
  RSQLErrtxt: string;
}
