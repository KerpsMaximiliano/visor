

export interface Proyecto {
    numero: number,
    nombre: string,
    cliente: string,
    asignado: string,
    cantidadTareasTotales: number,
    cantidadTareasAtrasadas: number,
    porcentajeTareasAtrasadas: number,
    porcentajeTareasATiempo: number,
    porcentajeHPCompletadas: number,
    porcentajeHPEnProgreso: number,
    porcentajeHPEnPrueba: number,
    porcentajeHPNoIniciadas: number,
    porcentajeHPEnPruebaDisenioFuncional: number,
    porcentajeHPNoIniciadasDisenioFuncional: number,
    porcentajeHPCompletadasDisenioFuncional: number,
    porcentajeHPEnProgresoDisenioFuncional: number,
    porcentajeHPEnPruebaDisenioTecnico: number,
    porcentajeHPNoIniciadasDisenioTecnico: number,
    porcentajeHPCompletadasDisenioTecnico: number,
    porcentajeHPEnProgresoDisenioTecnico: number,
    porcentajeHPEnPruebaDesarrollo: number,
    porcentajeHPNoIniciadasDesarrollo: number,
    porcentajeHPCompletadasDesarrollo: number,
    porcentajeHPEnProgresoDesarrollo: number,
    porcentajeHPEnPruebaTesting: number,
    porcentajeHPNoIniciadasTesting: number,
    porcentajeHPCompletadasTesting: number,
    porcentajeHPEnProgresoTesting: number
}
