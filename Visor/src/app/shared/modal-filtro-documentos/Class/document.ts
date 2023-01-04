/**
 * Esta clase cumplirá el rol de contenedor de información relacionada a los atributos de documentos.
 */
export class Document {
    categorys: string[] = [
    "General", 
    "Diseño", 
    "Desarrollo",
    "Testing", 
    "Implementacion", 
    "Mantenimiento"];
    
    typeOfDocuments: string[] = [
    "Identificacion de Necesidades",
    "Plan de proyecto",
    "Requerimientos",
    "Estimacion de tareas",
    "Product backlog",
    "Sprint backlog",
    "Documento",
    "Propuesta funcional",
    "Arquitectura",
    "Caso de Uso",
    "Despliegue Proceso Produccion",
    "Requerimiento de configuracion",
    "Boceto/Maqueta",
    "Nota de desarrollo",
    "Plan de pruebas",
    "Caso de prueba",
    "Ciclo/corrida",
    "Incidencia",
    "Proceso de despliegue",
    "Requerimientos de Cambios",
    "Estimacion de Cambios"];

    conditions: string[] = [
        "Borrador",
        "Publicado",
        "Eliminado"
    ];
}