import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
//import { appSettings } from '../appSettings';
import { environment } from '../../environments/environment'

import 'rxjs/add/operator/map';

@Injectable()
export class ServicioVisorService {

    constructor(
        private http: Http
    ) { }

    postUrl(run){
        let url = environment.API_ENDPOINT + 'Visor';
        let dataGet = {
           Run: run 
          };
    
          let data = this.http.post(url, dataGet, {
            headers: new Headers({'Content-Type': 'application/json'})
          });
          return data;
    
    
       }
       obtenerFechaSinHora(){
        var retorno = "20180510";
         var fecha = new Date();
         var anio = fecha.getFullYear();
         var mes = fecha.getMonth() + 1;
         var dia = fecha.getDate();
   
         var mesS = '';
         var diaS = '';
   
         if (mes < 10){
           mesS = '0' + mes.toString();
         }
         else {
           mesS = mes.toString();
         }
   
         if (dia < 10){
           diaS = '0' + dia.toString();
         }
         else {
           diaS = dia.toString();
         }
   
         retorno = anio.toString() + mesS + diaS;
   
         return retorno;
      }
      obtenerFechaSinHoraRestada(){
        var retorno = "20180510";
         var fecha = new Date();
         var anio = fecha.getFullYear() - 2;
         var mes = fecha.getMonth() + 1;
         var dia = fecha.getDate();
   
         var mesS = '';
         var diaS = '';
   
         if (mes < 10){
           mesS = '0' + mes.toString();
         }
         else {
           mesS = mes.toString();
         }
   
         if (dia < 10){
           diaS = '0' + dia.toString();
         }
         else {
           diaS = dia.toString();
         }
   
         retorno = anio.toString() + mesS + diaS;
   
         return retorno;
      }
       obtenerFecha(){
         var retorno = "20180510 16:00";
          var fecha = new Date();
          var anio = fecha.getFullYear();
          var mes = fecha.getMonth() + 1;
          var dia = fecha.getDate();
          var hora = fecha.getHours();
          var minuto = fecha.getMinutes();
    
          var mesS = '';
          var diaS = '';
          var horaS = '';
          var minutoS = '';
    
          if (mes < 10){
            mesS = '0' + mes.toString();
          }
          else {
            mesS = mes.toString();
          }
    
          if (dia < 10){
            diaS = '0' + dia.toString();
          }
          else {
            diaS = dia.toString();
          }
          
          if (hora < 10){
            horaS = '0' + hora.toString();
          }
          else {
            horaS = hora.toString();
          }
          if (minuto < 10){
            minutoS = '0' + minuto.toString();
          }
          else {
            minutoS = minuto.toString();
          }
    
          retorno = anio.toString() + mesS + diaS + ' ' + horaS + ':' + minutoS;
    
          return retorno;
       }
       getSummary(parametroFUC, idRyf, run){
         let url = environment.API_ENDPOINT + 'ObtenerResumen';
         var fechita = this.obtenerFecha();
    
         var header = new Headers(
           {
             Authorization: 'VHCC-TICKET ' + parametroFUC
           }
         );
         let data = this.http.get(url,  { 
          method: "GET", 
          headers : header,
          params:{ 
            ParametroFuc: "{" +
            '"FechaInicio":"' + this.obtenerFechaSinHoraRestada() + '",' + 
            //'"FechaTermino":"20180109",' +
            '"FechaTermino":"' + this.obtenerFechaSinHora() + '",' +
            '"IdRyF":"' + idRyf + '",' +
            '"IdentificacionPaciente" :{"OtraIdentificacion":"1", "Run":"' + run + '",'+
             '"TipoIdentificacion":"1"},"ParametroBase":{"CodigoEstablecimientoConsulta":"99-991",' +
              '"FechaHoraMensaje":"' + fechita +'","IdSitioSoftware":"1","IdSoftwareInforma":"1",' +
              '"TipoMensaje":"1","VersionSoftwareInforma":"1"}}'
          }
         });
    
         return data;
    
      }
       getTokenSession(parametro){
         //antes obtenemos la url donde viene el token
          let url = environment.API_ENDPOINT + 'ObtenerToken';
    
          let data = this.http.get(url, { 
            params: {
              Parametro: '{"TokenAcceso":"' + parametro + '"}' 
            }
          });
    
          return data;
    
       }
       //metodo para consultar los usuarios RYF
       postBusquedaRyf(run, nombres, apellidoPaterno, apellidoMaterno, sexoId){
            let url = environment.API_ENDPOINT + 'BusquedaRyf';
            let dataGet = {
                Run: run,
                Nombres: nombres,
                ApellidoPaterno: apellidoPaterno,
                ApellidoMaterno: apellidoMaterno,
                SexoId: sexoId
              };
    
            let data = this.http.post(url, dataGet, {
              headers: new Headers({'Content-Type': 'application/json'})
            });
    
            return data;
    
       }

}