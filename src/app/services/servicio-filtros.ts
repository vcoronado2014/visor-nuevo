import { Injectable, OnInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
//moment
import * as moment from 'moment';
//import { appSettings } from '../appSettings';
import { environment } from '../../environments/environment'

import 'rxjs/add/operator/map';

@Injectable()
export class ServicioFiltros implements OnInit{

    filtrosSeccion = [];//estos son los globales, vienen en la llamada
    filtrosAmbito = [];
    filtroEspecialidad = [];
    filtroTipoProfesional = [];
    filtroEstablecimiento = [];
    filtroPeriodo = [];
    fechaMinima;
    fechaMaxima;
    diferenciaAnios;
    diferenciaMeses;
    filtrados = [];
    filtradosModal = [];

    constructor(
        private http: Http
    ) { 

    }
    ngOnInit() {
        moment.locale('es');
    }
    entregaFiltrosSeccion(filtrosGlobales)
    {
        if (filtrosGlobales){
            var i = 0;
            var entidadCero = {
                Nombre: '--seleccione sección--',
                Seleccionado: true,
                Valor: i,
                Activo: true
            };
            this.filtrosSeccion.push(entidadCero);
            const objFiltroGlobal = Object.entries(filtrosGlobales.Items);
            objFiltroGlobal.forEach(
                filtro => {
                    i = i+1;
                    var entidad = {
                        Nombre: filtro[1].toString(),
                        Seleccionado: false,
                        Valor: i,
                        Activo: true
                    };
                    this.filtrosSeccion.push(entidad);
                }
            )
        }
        return this.filtrosSeccion;
    }
    insertarInicial(arreglo) {
        var entidad = {
            Nombre: 'Sin Filtro',
            Seleccionado: true,
            Activo: true
        }
        arreglo.push(entidad);
    }
    insertarPersonalizado(arreglo, nombre, seleccionado, activo) {
        var entidad = {
            Nombre: nombre,
            Seleccionado: seleccionado,
            Activo: activo
        }
        arreglo.push(entidad);
    }
    editarOpcionesFiltros(elem, nombre, seleccionado, activo) {
        /* var entidad = {
            Nombre: nombre,
            Seleccionado: seleccionado,
            Activo: activo
        } */
        elem.Nombre = nombre;
        elem.Seleccionado = seleccionado;
        elem.Activo = activo;

        /* console.log(entidad);
        return entidad; */
    }
    verificaExisteObjeto(arreglo, item){
        var retorno = false;
        if (arreglo){
            arreglo.forEach(element => {
                if (element.Nombre == item.Nombre){
                    //console.log('existe ' + item);
                    retorno = true;
                }
            });
        }
        return retorno;
    }
   
    procesarFiltros(atenciones) {
        //los filtros de las subsecciones
        const objArreglo = Object.entries(atenciones);
        //inserción de los elementos iniciales
        this.insertarInicial(this.filtrosAmbito);
        this.insertarInicial(this.filtroEspecialidad);
        this.insertarInicial(this.filtroTipoProfesional);
        this.insertarInicial(this.filtroEstablecimiento);
        objArreglo.forEach(elem => {
            console.log(elem[1]);
            if (elem[1]){
                //obtenemos el elemento completo
                var obj = elem[1];
                //empezamos con ambito
                if (obj.Tipo){
                    var entidadAmbito = {
                        Nombre: obj.Tipo,
                        Seleccionado: false,
                        Activo: true
                    }
                    if (!this.verificaExisteObjeto(this.filtrosAmbito, entidadAmbito)){
                        this.filtrosAmbito.push(entidadAmbito);
                    }
                }
                //especialidad
                if (obj.Descripcion){
                    var entidadEspecialidad = {
                        Nombre: obj.Descripcion,
                        Seleccionado: false,
                        Activo: true
                    }
                    if (!this.verificaExisteObjeto(this.filtroEspecialidad, entidadEspecialidad)){
                        this.filtroEspecialidad.push(entidadEspecialidad);
                    }
                    
                }
                //tipo profesional
                if (obj.TipoProfesional){
                    var entidadTipoProfesional = {
                        Nombre: obj.TipoProfesional,
                        Seleccionado: false,
                        Activo: true
                    }
                    if (!this.verificaExisteObjeto(this.filtroTipoProfesional, entidadTipoProfesional)){
                        this.filtroTipoProfesional.push(entidadTipoProfesional);
                    }
                    
                }
                //establecimiento
                if (obj.EstablecimientoSalud){
                    var entidadEstablecimientoSaludl = {
                        Nombre: obj.EstablecimientoSalud,
                        Seleccionado: false,
                        Activo: true
                    }
                    if (!this.verificaExisteObjeto(this.filtroEstablecimiento, entidadEstablecimientoSaludl)){
                        this.filtroEstablecimiento.push(entidadEstablecimientoSaludl);
                    }
                    
                }
            }
        })
        //console.log(this.filtrosAmbito);
    }
    entregaFiltroAmbito(atenciones){
        const objArreglo = Object.entries(atenciones);
        //inserción de los elementos iniciales
        this.filtrosAmbito = [];
        this.insertarInicial(this.filtrosAmbito);
        objArreglo.forEach(elem => {
            /* console.log(elem[1]); */
            if (elem[1]){
                //obtenemos el elemento completo
                var obj = elem[1];
                //empezamos con ambito
                if (obj.Tipo){
                    var entidadAmbito = {
                        Nombre: obj.Tipo,
                        Seleccionado: false,
                        Activo: true
                    }
                    if (!this.verificaExisteObjeto(this.filtrosAmbito, entidadAmbito)){
                        this.filtrosAmbito.push(entidadAmbito);
                    }
                    
                }
               
            }
        })
        return this.filtrosAmbito;
    }
    entregaFiltroEspecialidad(atenciones) {
        //los filtros de las subsecciones
        const objArreglo = Object.entries(atenciones);
        //inserción de los elementos iniciales
        this.filtroEspecialidad = [];
        this.insertarInicial(this.filtroEspecialidad);
        /* console.log(objArreglo); */
        objArreglo.forEach(elem => {
            /* console.log(elem[1]); */
            if (elem[1]){
                //obtenemos el elemento completo
                var obj = elem[1];

                //especialidad
                if (obj.Descripcion){
                    var entidadEspecialidad = {
                        Nombre: obj.Descripcion,
                        Seleccionado: false,
                        Activo: true
                    }
                    if (!this.verificaExisteObjeto(this.filtroEspecialidad, entidadEspecialidad)){
                        this.filtroEspecialidad.push(entidadEspecialidad);
                    }
                    
                }
            }
        })
        return this.filtroEspecialidad;
    }
    entregaFiltroTipoProfesional(atenciones) {
        //los filtros de las subsecciones
        const objArreglo = Object.entries(atenciones);
        //inserción de los elementos iniciales
        this.filtroTipoProfesional = [];
        this.insertarInicial(this.filtroTipoProfesional);
        objArreglo.forEach(elem => {
            /* console.log(elem[1]); */
            if (elem[1]){
                //obtenemos el elemento completo
                var obj = elem[1];

                //tipo profesional
                if (obj.TipoProfesional){
                    var entidadTipoProfesional = {
                        Nombre: obj.TipoProfesional,
                        Seleccionado: false,
                        Activo: true
                    }
                    if (!this.verificaExisteObjeto(this.filtroTipoProfesional, entidadTipoProfesional)){
                        this.filtroTipoProfesional.push(entidadTipoProfesional);
                    }
                }
            }
        })
        return this.filtroTipoProfesional;
    }
    entregaFiltroEstablecimiento(atenciones) {
        //los filtros de las subsecciones
        const objArreglo = Object.entries(atenciones);
        //inserción de los elementos iniciales
        this.filtroEstablecimiento = [];
        this.insertarInicial(this.filtroEstablecimiento);
        /* console.log(objArreglo); */
        objArreglo.forEach(elem => {
            /* console.log(elem[1]); */
            if (elem[1]){
                //obtenemos el elemento completo
                var obj = elem[1];
                //establecimiento
                if (obj.EstablecimientoSalud){
                    var entidadEstablecimientoSaludl = {
                        Nombre: obj.EstablecimientoSalud,
                        Seleccionado: false,
                        Activo: true
                    }
                    if (!this.verificaExisteObjeto(this.filtroEstablecimiento, entidadEstablecimientoSaludl)){
                        this.filtroEstablecimiento.push(entidadEstablecimientoSaludl);
                    }
                    
                }
            }
        })
        return this.filtroEstablecimiento;
    }
    entregaFiltroFechas(atenciones) {
        //obtengo arreglo con todas las fechas
        var fechasTodas = atenciones.map( function(elem){
            return moment(elem.Fecha, 'DD/MM/YYYY');
        })
        //con el arreglo de todas las fechas usamos func de moment para extraer la feca max y min
        this.fechaMaxima = moment.max(fechasTodas);
        this.fechaMinima = moment.min(fechasTodas);
        console.log(this.fechaMinima);
        console.log(this.fechaMaxima);
        //obtenemos la diferencia de meses entre ambas fechas
        this.diferenciaMeses = this.fechaMaxima.diff(this.fechaMinima, 'months');
        console.log(this.diferenciaMeses);
        this.procesarFiltrosFecha();
        return this.filtroPeriodo;
    }
    procesarFiltrosFecha(){
        //lo primero, si hay menos de un año de diferencia
        if (this.diferenciaMeses <= 12)
        {
            //agregamos los filtros
            //1 semana, 1 mes, 6 meses, 12 meses
            this.insertarInicial(this.filtroPeriodo);
            this.insertarPersonalizado(this.filtroPeriodo, '1 semana', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '1 mes', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '6 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '12 meses', true, true);
        }
        if (this.diferenciaMeses > 12 && this.diferenciaMeses <= 24)
        {
            //agregamos los filtros
            //1 mes, 6 meses, 12 meses, 18 meses, 24 meses
            this.insertarInicial(this.filtroPeriodo);
            this.insertarPersonalizado(this.filtroPeriodo, '1 mes', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '6 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '12 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '18 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '24 meses', true, true);
        }
        if (this.diferenciaMeses > 24 && this.diferenciaMeses <= 36)
        {
            //agregamos los filtros
            //6 meses, 12 meses, 18 meses, 24 meses, 36 meses
            this.insertarInicial(this.filtroPeriodo);
            this.insertarPersonalizado(this.filtroPeriodo, '6 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '12 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '18 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '24 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '36 meses', true, true);
        }
        if (this.diferenciaMeses > 36)
        {
            //agregamos los filtros
            //12 meses, 18 meses, 24 meses, 36 meses, 48 meses
            this.insertarInicial(this.filtroPeriodo);
            this.insertarPersonalizado(this.filtroPeriodo, '12 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '18 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '24 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '36 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '48 meses', true, true);
        }
    }
    filtrarGlobal(atenciones, nombreFiltro){
      this.filtrados = [];
      atenciones.forEach(element => {
        //aca debemos ir recorriendo los elementos para 
        //determinar cuales son los que calzan con la 
        //búsqueda
        var entidadPrincipal = element;
        if (element.Elemento) {
          element.Elemento.forEach(elem => {
            var entidad = elem[0];
            if (entidad.Nombre == 'Actividad(es)'){
              if (nombreFiltro == 'Actividades/Procedimientos'){
                //para que el item que hace match se muestre como respuesta
                entidad.Elemento.forEach(el => {
                  el.forEach( e => {
                      entidadPrincipal = this.agregaCampoElementoOriginal(entidadPrincipal, e.Nombre);
                  })
                })
                //hacemos push de la coincidencia
                this.filtrados.push(entidadPrincipal);
              }
            }
            if (entidad.Nombre == 'Diagnósticos'){
              if (nombreFiltro == 'Diagnósticos'){
                
                entidad.Elemento.forEach(el => {
                  el.forEach( e => {
                    if(e.Descripcion == 'True'){
                      entidadPrincipal = this.agregaCampoElementoOriginal(entidadPrincipal, e.Nombre);
                    }
                  })
                })
                //hacemos push de la coincidencia
                this.filtrados.push(entidadPrincipal);
              }
            }
            if (entidad.Nombre == 'Receta(s)'){
              if (nombreFiltro == 'Prescripciones'){

                entidad.Elemento.forEach(el => {
                  el[0].Elemento.forEach( e => {
                      entidadPrincipal = this.agregaCampoElementoOriginal(entidadPrincipal, e[0].Nombre);
                  })
                })
                //hacemos push de la coincidencia
                this.filtrados.push(entidadPrincipal);
              }
            }

          });
        }
      });
      return this.filtrados;
    }
    verificaExisteObjetoGlobal(arreglo, item){
      var retorno = false;
      if (arreglo){
        retorno = arreglo.some((e)=>{
          return e.Nombre == item.Nombre;
        })
      }
      return retorno;
    }
    buscarItemEnArreglo(arreglo, item){
      var retorno = false;
      var elemento;
      if (arreglo){
        retorno = arreglo.some((e)=>{
          elemento = e;
          return e.Nombre == item.Nombre;
        })
      }
      return elemento;
    }
    filtrarPorContenido(atenciones, contenido){
        this.filtrados = [];
        atenciones.forEach(element => {
            //aca debemos ir recorriendo los elementos para 
            //determinar cuales son los que calzan con la 
            //búsqueda
            var entidadPrincipal = element;
            if (element.Elemento) {
              element.Elemento.forEach(elem => {
                var entidad = elem[0];
                if (entidad.Nombre.toUpperCase().indexOf(contenido.toUpperCase())>=0){
                    //el elemento existe, debemos agregarlo
                    if (!this.verificaExisteObjetoGlobal(this.filtrados, entidadPrincipal)){
                      entidadPrincipal = this.agregaCampoElementoOriginal(entidadPrincipal, entidad.Nombre);
                      
                      this.filtrados.push(entidadPrincipal);
                      return;
                    }
                }
                else {
                  //no está en el primer elemento, vamos al segundo
                  if (entidad.Elemento && entidad.Elemento.length > 0){
                    entidad.Elemento.forEach(eleUno => {
                      var entidadUno = eleUno[0];
                      if (entidadUno.Nombre.toUpperCase().indexOf(contenido.toUpperCase())>=0){
                        //el elemento existe, debemos agregarlo
                        if (!this.verificaExisteObjetoGlobal(this.filtrados, entidadPrincipal)){
                          entidadPrincipal = this.agregaCampoElementoOriginal(entidadPrincipal, entidadUno.Nombre);
                          
                          this.filtrados.push(entidadPrincipal);
                          return;
                        }
                      }
                      else {
                        //no está en el segundo, vamos al tercero
                        //siempre que exista
                        if (entidadUno.Elemento && entidadUno.Elemento.length > 0){
                          entidadUno.Elemento.forEach(eleDos => {
                            var entidadDos = eleDos[0];
                            if (entidadDos.Nombre.toUpperCase().indexOf(contenido.toUpperCase()) >= 0) {
                              //el elemento existe, debemos agregarlo
                              if (!this.verificaExisteObjetoGlobal(this.filtrados, entidadPrincipal)){
                                entidadPrincipal = this.agregaCampoElementoOriginal(entidadPrincipal, entidadDos.Nombre);
                                
                                this.filtrados.push(entidadPrincipal);
                                return;
                              }
                            }
                          });
                        }
                      }
                    });
                  }
                }
              });
            }
          });

        return this.filtrados;
    }

    agregaCampoElementoOriginal(entidadPrincipal, entidad){
      var elemModificado = {
        Codigo: entidadPrincipal.Codigo,
        Descripcion: entidadPrincipal.Descripcion,
        Elemento: entidadPrincipal.Elemento,
        EstablecimientoSalud: entidadPrincipal.EstablecimientoSalud,
        Estado: entidadPrincipal.Estado,
        Fecha: moment(entidadPrincipal.Fecha).format('L'),
        Nombre: entidadPrincipal.Nombre,
        Servicio: entidadPrincipal.Servicio,
        Tipo: entidadPrincipal.Tipo,
        TipoProfesional: entidadPrincipal.TipoProfesional,
        Titulo: entidadPrincipal.Titulo,
        Respuesta: entidad
      }
      return elemModificado;
    }

    filtrarModal(atenciones, filtro){
      //los filtros de las subsecciones
      const objArreglo = Object.entries(atenciones);
      this.filtradosModal = [];
      objArreglo.forEach(elem => {
        if (elem[1]){
          //obtenemos el elemento completo
          var obj = elem[1];
          if (obj.EstablecimientoSalud){
            if(obj.EstablecimientoSalud == filtro){
              this.filtradosModal.push(obj);
            } 
          } 
          if (obj.TipoProfesional){
            if(obj.TipoProfesional == filtro){
              this.filtradosModal.push(obj);
            }
          }
          if (obj.Tipo){
            if(obj.Tipo == filtro){
              this.filtradosModal.push(obj);
            }
          }
          if (obj.Descripcion){
            if(obj.Descripcion == filtro){
              this.filtradosModal.push(obj);
            }
          }
        }
      })
      console.log(this.filtradosModal);
      return this.filtradosModal;
    }
}