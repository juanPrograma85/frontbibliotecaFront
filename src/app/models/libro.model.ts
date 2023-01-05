import { Autor } from "./Autor.model";

export class ResponseLibro {
    public outout_codigo: number;
    public out_descripcion: string;
    public out_total_registros : number;
    public out_cursor_info : Libro[];
}
export class Libro {
    public tipo : string;
    public fecha_inactivacion :Date;
    public cantidad_ejemplares : number;
    public id_producto : number;
    public max_periodo_prestamo : number;
    public id_categoria : number;
    public nombre_categoria: string;
    public titulo: string;
    public fecha_llegada_biblioteca:Date;
    public cantidad_ejemplares_disponibles: number;
    public estado: string;
    public autores : string;

}
        