import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Constantes } from '../shared/Constantes';
import { Observable } from 'rxjs';
import { LogModel } from '../models/serGeneral/log.model';
import { TipoLog } from '../enum/tipo_log.model';
import { CookieService } from 'ngx-cookie-service';
import { ParametrosEAFRequest } from '../models/serGeneral/propiedades.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public UUID: string;
  private url;
  private parametrosEAFRequest: ParametrosEAFRequest = new ParametrosEAFRequest();

  constructor(  private http: HttpClient
              , private router: Router
              , private cookieService: CookieService
              , private storageService: StorageService) {
    this.UUID = this.generateUUID();
    this.url = Constantes.CONST_ENDPOINT_SER_GENERAL;
  }


  /**/
  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0) {//Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }


  mostrarMensaje(titulo: any, text: any, icono: any) {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: text,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#f53201'
    });
  }

  mostrarMensajeAccion(titulo: any, text: any, icono: any, redirect: any) {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: text,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#f53201'
    }).then((result) => {
      if (result.value) {
        this.router.navigate([redirect]).then(() => {
          window.location.reload();
        });
      }
    });
  }
  mostrarMensajeCarga(text: any) {
    Swal.fire({
      text: text,
      allowOutsideClick: false
    });
    Swal.showLoading();
  }

  consultarPropiedades(nombreAplicacion: string, nombre: string) {
    this.parametrosEAFRequest = new ParametrosEAFRequest();
    this.parametrosEAFRequest.accion = Constantes.CONST_ACCION_CONSULTAR;
    this.parametrosEAFRequest.canal = Constantes.CANAL_APLICACION;
    if (nombreAplicacion != null) {
      this.parametrosEAFRequest.codapp = nombreAplicacion;
    }
    if (nombre != null) {
      this.parametrosEAFRequest.nombre = nombre;
    }

    return this.http.post(`${Constantes.CONST_ENDPOINT_SER_GENERAL}/propiedades/admParametrosEAF`, this.parametrosEAFRequest);
  }

  addLOG(logModel: LogModel) {
    let params = new HttpParams();
    params = params.append('Accion', Constantes.CONST_ACCION_INSERTAR);
    return this.http.post(`${Constantes.CONST_ENDPOINT_SER_GENERAL}${Constantes.CONST_RUTA_URL_LOGS}`, logModel, { params: params }).subscribe(resp => {
    });
  }



  LOG_REQ_RESP(request: HttpRequest<any>, response: any, fechaInicial: Date) {
    try {
      let levelLog = null;
      let cod : string = null;
      let desc = null;
      let textReponse: string = null;

      if (response instanceof HttpResponse) {
        levelLog = TipoLog.INFO;
        cod = response.status.toString();
        desc = response.statusText;
        textReponse = response.status + " " + response.statusText + " " + response.url + " " + JSON.stringify(response.body).replace(/"/g, "");
      } else if (response instanceof HttpErrorResponse) {
        levelLog = TipoLog.ERROR;
        cod = response.status.toString();
        desc = response.message;
        textReponse = response.status + " " + response.statusText + " " + response.url;
      }
      let usuario = this.cookieService.get(Constantes.USUARIO);
      let vm_log: LogModel = new LogModel(
        Constantes.CANAL_APLICACION,
        cod,
        desc,
        fechaInicial,
        new Date(),
        levelLog,
        " **Inicio consumo ip** " + window.localStorage.getItem('ip') + " **Fin consumo ip** " + request.urlWithParams + " " + JSON.stringify(request.body).replace(/"/g, "'").replace(/'/g, ""),
        textReponse.replace(/"/g, ""),
        request.url,
        (this.storageService.getCurrentSession().uuid || "" != this.storageService.getCurrentSession().uuid) ? this.storageService.getCurrentSession().uuid : "",
        (usuario != null || usuario == '') ? 'LOGIN' : usuario
      );
      this.addLOG(vm_log);
    } catch (error) {
      console.log(error);
    }
  }

}
