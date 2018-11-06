import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
//moment
import * as moment from 'moment';
//import { appSettings } from '../appSettings';
import { environment } from '../../environments/environment'

import 'rxjs/add/operator/map';

@Injectable()
export class ServicioFiltros {

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
    filtrados=[];

    constructor(
        private http: Http
    ) { 

    }
    entregaFiltrosSeccion(filtrosGlobales)
    {
        if (filtrosGlobales){
            var i = 0;
            var entidadCero = {
                Nombre: '-- seleccione --',
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
        this.insertarInicial(this.filtrosAmbito);
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
               
            }
        })
        return this.filtrosAmbito;
    }
    entregaFiltroEspecialidad(atenciones) {
        //los filtros de las subsecciones
        const objArreglo = Object.entries(atenciones);
        //inserción de los elementos iniciales
        this.insertarInicial(this.filtroEspecialidad);
        objArreglo.forEach(elem => {
            console.log(elem[1]);
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
        this.insertarInicial(this.filtroTipoProfesional);
        objArreglo.forEach(elem => {
            console.log(elem[1]);
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
        this.insertarInicial(this.filtroEstablecimiento);
        objArreglo.forEach(elem => {
            console.log(elem[1]);
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
        //los filtros de las subsecciones
        const objArreglo = Object.entries(atenciones);
        var indice = 0;
        var fechaAuxiliar;
        var fechaAuxiliarMax;
        objArreglo.forEach(elem => {
            
            console.log(elem[1]);
            if (elem[1]){
                //obtenemos el elemento completo
                var obj = elem[1];
                //establecimiento
                if (obj.Fecha) {
                    if (indice == 0){
                        fechaAuxiliar = moment(obj.Fecha);
                        fechaAuxiliarMax = moment(obj.Fecha);
                    }
                    else{
                        if (moment(obj.Fecha) < fechaAuxiliar)
                        {
                            fechaAuxiliar = moment(obj.Fecha);
                        }
                        if (moment(obj.Fecha) > fechaAuxiliarMax)
                        {
                            fechaAuxiliarMax = moment(obj.Fecha);
                        }
                    }

                    //aumentamos el indice
                    indice++;
                }
            }
        })
        this.fechaMinima = fechaAuxiliar;
        this.fechaMaxima = fechaAuxiliarMax;
        //obtenemos la diferencia de años entre ambas fechas
        this.diferenciaMeses = this.fechaMaxima.diff(this.fechaMinima, 'months');
        this.procesarFiltrosFecha();
        return this.filtroPeriodo;
    }
    procesarFiltrosFecha(){
        //lo primero, si hay menos de un año de difrencia
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
            //6 meses, 12 meses, 18 meses, 24 meses, 36 meses
            this.insertarInicial(this.filtroPeriodo);
            this.insertarPersonalizado(this.filtroPeriodo, '6 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '12 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '18 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '24 meses', true, true);
            this.insertarPersonalizado(this.filtroPeriodo, '36 meses', true, true);
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
                    //hacemos push de la coincidencia
                    this.filtrados.push(entidadPrincipal);
                  }
                }
                if (entidad.Nombre == 'Diagnósticos'){
                  if (nombreFiltro == 'Diagnósticos'){
                    //hacemos push de la coincidencia
                    this.filtrados.push(entidadPrincipal);
                  }
                }
                if (entidad.Nombre == 'Receta(s)'){
                  if (nombreFiltro == 'Prescripciones'){
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
            arreglo.forEach(element => {
                if (element.Nombre == item.Nombre){
                    //console.log('existe ' + item);
                    retorno = true;
                }
            });
        }
        return retorno;
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
}