export class Prestamo {
    id_prestamo : number;
    id_libro: number;
    nombre_libro: string;
    fecha_maxima_entrega :Date;
    fecha_entrega :Date;
    id_usuario: number; 
}
export class RequestSolicitarPrestamo {
    id_libro: number;
    id_usuario: number; 
}

export class ResponseSolicitarPrestamo {
    out_codigo: number;
    out_descripcion: string;
    listaPrestamo: Prestamo[] = [];
}