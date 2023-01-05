import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ParametrosEAFResponse } from '../models/serGeneral/propiedades.model';
import { Session } from '../models/session.model';
import { GeneralService } from '../services/api-ser-general.service';
import { BibliotecaService } from '../services/biblioteca.service';
import { StorageService } from '../services/storage.service';
import { Constantes } from '../shared/Constantes';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(private storageService: StorageService
              , private generalService: GeneralService
              , private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    // this. cargarPropiedades();
  }
  // cargarPropiedades() {
  //   Swal.fire({
  //     text: 'Consultando propiedades',
  //     allowOutsideClick: false
  //   });
  //   Swal.showLoading();
  //   this.storageService.logout();
  //   this.generalService.consultarPropiedades(Constantes.NOMBRE_APLICACION, null).subscribe(data => {
  //     let parametrosEAFResponse: any = data;
  //     if (parametrosEAFResponse.cursorparametros.parametros != null && parametrosEAFResponse.cursorparametros.parametros.length > 0) {
  //       let session: Session = {
  //         token: null,
  //         uuid: this.generalService.UUID,
  //         propiedades: parametrosEAFResponse.cursorparametros.parametros
  //       };

  //       this.storageService.setCurrentSession(session);
  //       this.bibliotecaService.cargarInformacionBasica();
  //       Swal.close();
  //     }else{
  //       Swal.close();
  //     }
  //   });//fin cargue de propiedades
  // }


}
