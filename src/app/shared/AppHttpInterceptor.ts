import { HttpInterceptor, HttpHandler, HttpParams, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Injectable } from "@angular/core"
import { catchError, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Constantes } from './Constantes';
import { PeticionesHTTP } from '../models/serGeneral/ENUM';
import { Console } from 'console';
import { GeneralService } from '../services/api-ser-general.service';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    private mensajes = new Map<number, string>();
    private rutaProperties = '/WSSerGeneral/propiedades';

    constructor(private generalService: GeneralService ) {
        this.mensajes.set(Constantes.HTTP_STATUS_CODE_500, Constantes.HTTP_STATUS_MSJ_500);
    }

    private getMensaje(codigo: number): string {
        if (!this.mensajes.has(codigo)) {
            return `Ocurrió un error, vuelva a intentarlo`;
        }
        return this.mensajes.get(codigo);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let rutaLogs = Constantes.CONST_ENDPOINT_SER_GENERAL + Constantes.CONST_RUTA_URL_LOGS;
        let dateIn = new Date();
        let urlSerGeneral = req.url;
        let isFormData = false

        if (req.body != null) {
            if (req.body[Symbol.toStringTag] == "FormData") {
                isFormData = true;
            }
        }
        const { url, method, headers, body } = req;
        return next.handle(req).pipe(tap((evt: HttpEvent<any>) => {
            if (JSON.stringify(urlSerGeneral).includes(rutaLogs) || JSON.stringify(body).includes(this.rutaProperties)) {
                return;
            }
            if (evt instanceof HttpResponse && evt.status === 200) {
                this.generalService.LOG_REQ_RESP(req, evt, dateIn);
            }


        }),
            catchError(err => {
                if (JSON.stringify(body).includes(urlSerGeneral) || JSON.stringify(body).includes(this.rutaProperties)) {
                    return throwError(err);

                }
                Swal.fire({
                    icon: 'error',
                    text: this.getMensaje(err.status),
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#f53201'
                });
                this.generalService.LOG_REQ_RESP(req, err, dateIn);
                return throwError(err);
            })
        );


    }


}