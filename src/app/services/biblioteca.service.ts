import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Categoria } from '../models/CategoriasLibros.model';
import { Libro } from '../models/libro.model';
import { RequestSolicitarPrestamo } from '../models/Prestamo.model';
import { Constantes } from '../shared/Constantes';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  // private url = 'http://localhost:8090';
  private url:string;

  constructor( private http: HttpClient
              , private cookieService: CookieService
              , private storageService: StorageService) { }
  
  cargarInformacionBasica() {
    this.url = this.storageService.getValuePropiedad(Constantes.ENDPOINT_BIBLIOTECA);
    //this.url = 'http://localhost:8090';
  }

  consultarCategoriasLibros(): Observable<Object> {
    return this.http.get(`${this.url}/categorias/consultar`);
  }
  consultarAutores(){
    return this.http.get(`${this.url}/autor/consultar`);
  }

  consultarArticulos(libro: Libro, numPag : number , tamanoPagina: number){
    let params = new HttpParams();
    params = (libro && libro.id_categoria) ? params.set('id_categoria', `${libro.id_categoria.toString()}`) : params;
    params = (libro && libro.estado) ? params.set('estado', `${libro.estado.toString()}`) : params;
    params = (libro && libro.titulo) ? params.set('titulo_libro', `${libro.titulo.toString()}`) : params;
    params = (libro && libro.max_periodo_prestamo) ? params.set('max_periodo_prestamo', `${libro.max_periodo_prestamo.toString()}`) : params;
    return this.http.get(`${this.url}/libro/consultar`, { params: params});
  }

  consultarPrestamos(id_usuario: number, id_libro: number){
    let params = new HttpParams();
    params = params.append('id_usuario', id_usuario.toString());
    params = params.append('id_libro', id_libro.toString());
    return this.http.get(`${this.url}/prestamo/consultar`, { params: params});
  }
  solicitarPrestamo(request: RequestSolicitarPrestamo){
    return this.http.post(`${this.url}/prestamo/solicitar`, request);
  }
}
