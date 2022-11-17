/**
 * Esta clase cumplirá el rol de contenedor de información relacionada a los documentos.
 */
export class Document {
    categorys: string[] = [
    "General", 
    "Diseño", 
    "Desarrollo",
    "Testing", 
    "Implementación", 
    "Mantenimiento"];
    
    typeOfDocuments: string[] = [
    "Identificación de necesidades",
    "Plan de proyecto",
    "Requerimientos",
    "Estimación de tareas",
    "Product backlog",
    "Sprint backlog",
    "Documento",
    "Propuesta funcional",
    "Arquitectura",
    "Caso de uso",
    "Requerimiento de configuración",
    "Boceto/Maqueta",
    "Nota de desarrollo",
    "Plan de pruebas",
    "Caso de prueba",
    "Ciclo/corrida",
    "Incidencia",
    "Proceso de despliegue",
    "Requerimientos de cambios",
    "Estimación de cambios"];

    conditions: string[] = [
        "Borrador",
        "Publicado",
        "Eliminado"
    ];
}