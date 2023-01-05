import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { required } from '@rxweb/reactive-form-validators';
import { Autor } from 'src/app/models/Autor.model';
import { Categoria } from 'src/app/models/CategoriasLibros.model';
import { Libro, ResponseLibro } from 'src/app/models/libro.model';
import { Constantes } from 'src/app/shared/Constantes';
import { BibliotecaService } from 'src/app/services/biblioteca.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { GeneralService } from 'src/app/services/api-ser-general.service';
import { Session } from 'src/app/models/session.model';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html'
})
export class LibrosComponent implements OnInit {

  formularioBusqueda: FormGroup;
  listaAutores: Autor[] = [];
  listaCategorias: Categoria[] = [];
  listaLibros: Libro[] = [];
  cargaCompleta: boolean = false;
  tamanoPagina : number = Constantes.TAMANO_PAGINA;
  totalRegistros : number = 10;
  numPag : number;

  constructor( private storageService: StorageService
              , private generalService: GeneralService
              ,private fb: FormBuilder
              ,private bibliotecaService: BibliotecaService ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarPropiedades();
    
  }

  crearFormulario() {
    this.formularioBusqueda = this.fb.group({
      id_categoria: ['', ],
      id_autor: ['', ],
      estado: ['', ],
      titulo_libro: ['', ],
      fecha_llegada_biblioteca: ['', ],
      max_PERIODO_prestamo: ['', ]
    });


  }
  
  buscar(){
    this.consultarLibros(1);
  }
  getCategoriasLibros(){
    Swal.fire({
      text: 'Cargando Información',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.bibliotecaService.consultarCategoriasLibros().subscribe(data => {
      let resp: any = data;
      this.listaCategorias  =  resp;
      Swal.close();
    });
    
  }
  getAutores(){
    Swal.fire({
      text: 'Cargando Información',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.bibliotecaService.consultarAutores().subscribe(data => {
      let resp: any = data;
      this.listaAutores  = resp;
      Swal.close();
    });
  }
  consultarLibros(numeroPagina: number){
    Swal.fire({
      text: 'Cargando Información',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.cargaCompleta = false;
    let tituloLibro = this.formularioBusqueda.get("titulo_libro").value;
    let idCategoria = this.formularioBusqueda.get("id_categoria").value;
    let idAutor = this.formularioBusqueda.get("id_autor").value;


    let libro: Libro = new Libro();
    libro.autores = idAutor;
    libro.titulo = tituloLibro;
    libro.id_categoria = idCategoria;
    
    this.bibliotecaService.consultarArticulos(libro, this.numPag, this.tamanoPagina).subscribe(data => {
      let resp: any = data;
      this.listaLibros  = resp.out_cursor_info;
      this.totalRegistros = resp.out_total_registros;
      this.cargaCompleta = true;
      Swal.close();
    });
  }

  cargarPropiedades() {
    Swal.fire({
      text: 'Consultando propiedades',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.storageService.logout();
    this.generalService.consultarPropiedades(Constantes.NOMBRE_APLICACION, null).subscribe(data => {
      let parametrosEAFResponse: any = data;
      
      if(parametrosEAFResponse.cursorparametros == null){
        Swal.close();
        return;
      }
      if (parametrosEAFResponse.cursorparametros.parametros != null && parametrosEAFResponse.cursorparametros.parametros.length > 0) {
        let session: Session = {
          token: null,
          uuid: this.generalService.UUID,
          propiedades: parametrosEAFResponse.cursorparametros.parametros
        };

        this.storageService.setCurrentSession(session);
        this.bibliotecaService.cargarInformacionBasica();
        this.getCategoriasLibros();
        this.getAutores();
        this.consultarLibros(1);
        Swal.close();
      }else{
        Swal.close();
      }
    });//fin cargue de propiedades
  }
}