export interface UsuarioRolRefact  {  
    id_usuario: string,
    foto: Blob,
    nombre_usuario: string,
    nombre: string,
    apellido: string,
    nombre_rol: string,
    //Resto de variables que pide el CU 12
    conocimientos: Array<String>,
    preferencias: Array<string>,
    proyectos_actuales: Array<string>,
    tareas_completadas_tec: Array<string>,
    proyectos_anteriores: Array<String>,
    empresas: Array<String>,
    instituciones: Array<string>,
    carreras: Array<String>
}