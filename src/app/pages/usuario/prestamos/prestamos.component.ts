import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/models/CategoriasLibros.model';
import { Libro, ResponseLibro } from 'src/app/models/libro.model';
import { Prestamo, RequestSolicitarPrestamo, ResponseSolicitarPrestamo } from 'src/app/models/Prestamo.model';
import { GeneralService } from 'src/app/services/api-ser-general.service';
import { BibliotecaService } from 'src/app/services/biblioteca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html'
})
export class PrestamosComponent implements OnInit {

  formularioBusqueda: FormGroup;
  listaPrestamos: Prestamo[] = [];
  cargaCompleta: boolean = false;
  listaLibros: Libro[] = [];
  listaCategorias: Categoria[] = [];

  constructor( private fb: FormBuilder
              ,private bibliotecaService: BibliotecaService
              ,private generalService: GeneralService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.getCategoriasLibros();
  }
  
  crearFormulario() {
    this.formularioBusqueda = this.fb.group({
      id_categoria: ['', ],
      id_usuario: ['', ],
      id_libro: ['', ]
    });
  }

  consultarPrestamo(numeroPagina: number){
    Swal.fire({
      text: 'Cargando Información',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let id_usuario: number = this.formularioBusqueda.get('id_usuario').value;
    let id_libro: number = this.formularioBusqueda.get('id_libro').value;
    this.cargaCompleta = false;
    this.bibliotecaService.consultarPrestamos(id_usuario, id_libro ).subscribe(data => {
      let resp: any = data;
      this.listaPrestamos  = resp;
      this.cargaCompleta = true;
      Swal.close();
    });
  }

  solicitarPrestamo(){
    console.log(this.formularioBusqueda.value);
    if(this.formularioBusqueda.get("id_libro").value == '' && this.formularioBusqueda.get("id_usuario").value == ''){
      this.generalService.mostrarMensaje('INFORMACION INCOMPLETA','Especifique los valores del prestamo','error');
      return;
    }
    Swal.fire({
      text: 'Cargando Información',
      allowOutsideClick: false
    });
    this.cargaCompleta = false;
    Swal.showLoading();

    let request: RequestSolicitarPrestamo = new RequestSolicitarPrestamo();
    request.id_libro = this.formularioBusqueda.get("id_libro").value;
    request.id_usuario = this.formularioBusqueda.get("id_usuario").value;
    this.listaPrestamos = [];
    this.bibliotecaService.solicitarPrestamo(request).subscribe(data => {
      let resp: any = data;
      if(resp.out_codigo == 0){
        this.listaPrestamos  = resp.listaPrestamo;
        this.generalService.mostrarMensaje("TRANSACCION EXITOSA","Prestamo realizado correctamente","success");
      }else{
        this.generalService.mostrarMensaje("TRANSACCION EXITOSA",resp.out_descripcion,"error");
      }
      this.cargaCompleta = true;
    });
  }

  getCategoriasLibros(){
    Swal.fire({
      text: 'Cargando Información',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.bibliotecaService.consultarCategoriasLibros().subscribe(data => {
      let resp: any = data;
      this.listaCategorias  = resp;
      Swal.close();
    });
    
  }

  consultarLibros(numeroPagina: number){
    Swal.fire({
      text: 'Cargando Información',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.listaLibros  = [];
    let libro: Libro = new Libro();
    libro.id_categoria = this.formularioBusqueda.get("id_categoria").value;
    this.bibliotecaService.consultarArticulos(libro, null, null).subscribe(data => {
      let resp: any = data;
      this.listaLibros  = resp.out_cursor_info;
      Swal.close();
    });
  }

}
