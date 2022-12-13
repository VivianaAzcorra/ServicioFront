export interface ExamenInterface {
    idExamen: string, 
    nombre: string, 
    descripcion: string, 
    idAsignatura: string, 
    tiempo: number,
    listOfReactivos: (ListaReactivos)[],
}

export interface ListaReactivos{
    idreactivo: string
}