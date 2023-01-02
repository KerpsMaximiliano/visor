export interface Documento {
    id: string,
    filename: string,
    document_name: string,
    case_name: string,
    type: string,
    assigned: string,
    documentStatus: string,
    date: string
    finishedDate: string,
    category: string //Determina el aspecto de la tarjeta. 
}
