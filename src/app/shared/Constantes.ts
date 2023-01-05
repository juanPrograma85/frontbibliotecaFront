import { environment } from '../../environments/environment';

export const Constantes = {
   NOMBRE_APLICACION: 'BIBLIOTECA_WEB',
   CONST_ENDPOINT_SER_GENERAL: environment.url_sergeneral,//NECESARIA PARA REGISTRO LOGS
   HTTP_STATUS_CODE_500: 500,
   HTTP_STATUS_MSJ_500: 'Error Interno',
   CONST_RUTA_URL_LOGS: '/logs/guardar',
   CONST_ACCION_CONSULTAR: "c",
   CONST_ACCION_INSERTAR: "i",
   CONST_ACCION_ACTUALIZAR: "a",
   CONST_ACCION_ELIMINAR: "e",
   USUARIO: "usuario",
   CANAL_APLICACION: 'WEB',
   TAMANO_PAGINA: 10, 
   ENDPOINT_BIBLIOTECA : '',

}