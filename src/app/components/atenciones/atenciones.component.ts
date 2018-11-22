import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule }    from '@angular/forms';
import 'rxjs/add/operator/filter';
//servicios
import { ServicioVisorService } from '../../services/servicio-visor.service';
import { ServicioFiltros } from '../../services/servicio-filtros';
import { log } from 'util';
import * as moment from 'moment';

declare var JQuery :any;
declare var $:any;

@Component({
  selector: 'app-atenciones',
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.scss']
})
export class AtencionesComponent implements OnInit {

  public token = sessionStorage.getItem("PARAMETRO_FUC");
  public idRyF = sessionStorage.getItem("ID_RYF");
  public run = sessionStorage.getItem("IDENTIFICACION");
  public loading = false;
  public atenciones = [];
  public examenes = [];
  public filtrosGlobales = [];
  public filtroAmbito = [];
  public filtroEspecialidad = [];
  public filtroTipoProfesional = [];
  public filtroEstablecimientos = [];
  public filtroPeriodo = [];
  public antecedentesMorbidos = {};
  public antecedentesFiltrados = [];
  public filtrados = [];
  public paciente = [];
  //atenciones inicial
  public atencionesInicial = [];
  public cantidadAtenciones = 0;
  public atencionesProvicionales = [];

  // variables del front de los filtros
  public userGlobales;
  public userBuscar;
  public userPeriodo;
  //variables del modal de filtro
  public atencionesModal = [];
  public filtradosModal = [];
  public modalAmbito;
  public modalEspecialidad;
  public modalTipoProfesional;
  public modalEstablecimiento;
  
  constructor(
              private router: ActivatedRoute,
              public visor: ServicioVisorService,
              public filtros: ServicioFiltros
  ) { 

  }

  ngOnInit() {
    moment.locale('es');
    this.obtenerResumenPaciente(this.token,this.idRyF,this.run);
  }
  
  //obtener resumen del paciente
  obtenerResumenPaciente(tokenSession, idRyf, run){
    //limpiamos los filtros
    this.filtrosGlobales = [];
    this.loading = true;
    this.visor.getSummary(tokenSession, idRyf, run).subscribe(
      dataSummary => {
        this.filtrosGlobales = [];
        //this.loading = false;
        //aca estoy trabajando con los datos VC
        var listaSummary = dataSummary.json();
        this.atencionesProvicionales = listaSummary.Elementos;
        this.atencionesProvicionales.forEach( elem => {
          elem = this.filtros.agregaCampoElementoOriginal(elem,elem.Nombre);
          this.atenciones.push(elem);
        } );
        console.log(this.atenciones);
        /* this.atenciones = this.atencionesProvicionales; */
        //guardamos esta variable para poder dejar una copia de todas las atenciones
        this.atencionesInicial = this.atenciones;
        //********************************************** */
        var globalsFilter = listaSummary.FiltrosGlobales;
        //procesamos los filtros
        this.filtrosGlobales = this.filtros.entregaFiltrosSeccion(globalsFilter);
        this.filtroPeriodo =  this.filtros.entregaFiltroFechas(this.atenciones);
        this.userGlobales = "--seleccione sección--";
       
        this.paciente = listaSummary.PacienteFlorence;
        console.log(listaSummary); 
        if (listaSummary.PacienteRayen){
          this.antecedentesMorbidos = listaSummary.PacienteRayen.AntecedentesMorbidos;
          this.filtrarAntecedentes(this.antecedentesMorbidos);
        }
        this.cantidadAtenciones = this.atenciones.length;
      },
      err => {
        this.loading = false;
        console.error(err);
      },
      () => {
        this.loading = false;
        console.log('get info summary');
      }
    );
  }

  filtrarAntecedentes(ants){
    const objArreglo = Object.entries(ants);
    objArreglo.forEach( elem => {
      elem.forEach (el => {
        if(el.string){
          if(el.string.length > 0){
            this.antecedentesFiltrados.push(elem);
          }
        }
      })
    })
    console.log(this.antecedentesFiltrados);
  }

  filtrarPorContenido() {
    //inicializamos el arreglo
    this.atenciones = this.atencionesInicial;
    //primero obtenemos el valor del filtro global para saber
    //si debemos aplicarlo o no
    var contenido = this.userBuscar;
    var valorGlobal = this.userGlobales;
    if (contenido && contenido.length >= 3){
      //existe el filtro
      if (this.userGlobales != '--seleccione sección--'){
        //ahora si que existe el filtro, hay que filtrarlo y buscar en dichos resultados.
        this.filtrados = [];
        //debemos filtrar por el grupo Principal
        this.filtrados = this.filtros.filtrarGlobal(this.atenciones, this.userGlobales);
        this.filtrados = this.filtros.filtrarPorContenido(this.filtrados, contenido);
        if (this.filtrados){
          this.atenciones = this.filtrados;
          this.cantidadAtenciones = this.atenciones.length;
        }
      }
      else {
        //no hay filtro, hay que buscar en todo el arreglo
        //dejamos la variable vacia
        this.filtrados = [];
        //debemos filtrar por el grupo Principal
        this.filtrados = this.filtros.filtrarPorContenido(this.atenciones,contenido);
        if (this.filtrados && this.filtrados.length > 0) {
          this.atenciones = this.filtrados;
          this.cantidadAtenciones = this.atenciones.length;
        }
        else {
          //no hay resultados
          this.atenciones = [];
          this.cantidadAtenciones = 0;
        }
      }
    }
    else{
      if (this.filtrados && this.filtrados.length > 0 && this.userGlobales != '--seleccione sección--'){
        this.filtrados = [];
        //debemos filtrar por el grupo Principal
        this.filtrados = this.filtros.filtrarGlobal(this.atencionesInicial, this.userGlobales);
        this.atenciones = this.filtrados;
        this.cantidadAtenciones = this.atenciones.length;
      }
      else{
        //aca deberia ser todas
        this.atenciones = this.atencionesInicial;
        this.cantidadAtenciones = this.atenciones.length;
      }
    }
  }

  cambioFiltrosGlobales(e){
    //console.log(e.target.value);
    this.userBuscar = '';
    if (e.target.value == '--seleccione sección--'){
      this.atenciones = this.atencionesInicial;
      this.cantidadAtenciones = this.atenciones.length;
      this.filtrados = [];
      this.filtradosModal = [];
    }
    else {
      //dejamos la variable vacia
      this.filtrados = [];
      this.atenciones = this.atencionesInicial;
      //debemos filtrar por el grupo Principal
      this.filtrados = this.filtros.filtrarGlobal(this.atenciones, e.target.value);
      if (this.filtrados && this.filtrados.length > 0){
        this.atenciones = this.filtrados;
        this.cantidadAtenciones = this.atenciones.length;
      }
    }
  }

  cambioFiltrosPeriodo(e){
    console.log(e.target.value);
    switch (e.target.value){
      case '1 semana':
        console.log('case: 1 semana');
        break;
      case '1 mes':
        console.log('case: 1 mes');
        break;
      case '6 meses':
        console.log('case: 6 meses');
        break;
      case '12 meses':
        console.log('case: 12 meses');
        break;
      case '18 meses':
        console.log('case: 18 meses');
        break;
      case '24 meses':
        console.log('case: 24 meses');
        break;
      case '36 meses':
        console.log('case: 36 meses');
        break;
      case '48 meses':
        console.log('case: 48 meses');
        break;
    }
  }

  abrirFiltros(){
    console.log(this.atenciones);
    this.filtradosModal = [];
    this.filtroEstablecimientos = [];
    this.filtroAmbito = [];
    this.filtroEspecialidad = [];
    this.filtroTipoProfesional = [];
    
    this.modalAmbito = "Sin Filtro";
    this.modalEspecialidad = "Sin Filtro";
    this.modalTipoProfesional = "Sin Filtro";
    this.modalEstablecimiento = "Sin Filtro";

    //entrega filtros de acuerdo al resultado de la busqueda global
    this.filtroAmbito = this.filtros.entregaFiltroAmbito(this.atenciones);
    this.filtroEspecialidad = this.filtros.entregaFiltroEspecialidad(this.atenciones);
    this.filtroEstablecimientos = this.filtros.entregaFiltroEstablecimiento(this.atenciones);
    this.filtroTipoProfesional = this.filtros.entregaFiltroTipoProfesional(this.atenciones);
  }

  cambioFiltrosModal(e, tipo){
    if (e.target.value == 'Sin Filtro'){
      this.limpiarFiltros();
    } else {
      
      //si ya existe un filtradosModal este es el arreglo de atencionesModal
      if(this.filtradosModal && this.filtradosModal.length > 0){
        console.log(this.filtradosModal);
        console.log("entre filtrados modal");
        this.atencionesModal = this.filtradosModal;
        this.filtradosModal = this.filtros.filtrarModal(this.atencionesModal, e.target.value);
        console.log(this.filtradosModal);
      }
      //se setean las atenciones iniciales desde el global
      else if(this.filtrados && this.filtrados.length > 0){
        this.atencionesModal = this.filtrados;
        this.filtradosModal = this.filtros.filtrarModal(this.atencionesModal, e.target.value);
        console.log("entre filtrados global");
        console.log(this.filtradosModal);
      } else {
        this.atencionesModal = this.atenciones;
        this.filtradosModal = this.filtros.filtrarModal(this.atencionesModal, e.target.value);
        console.log("entre atenciones iniciales");
        console.log(this.filtradosModal);
      }

      //manipular aqui la deshabilitacion de los filtros seleccionados individuales
      this.deshabilitarHabilitarFiltros(e, tipo);
    }
  }

  compararFiltros(original, comparacion){
    var retorno = false;

    //desactivo todas las opciones de los filtros originales
    original.forEach(e => {
      this.filtros.editarOpcionesFiltros(e, e.Nombre, false, false);
    })
    //activo solo las opciones que se encuentran en el arr de comparacion
    comparacion.forEach( elem => {
      var respuestaelem = this.filtros.buscarItemEnArreglo(original, elem);
      if(respuestaelem){
        this.filtros.editarOpcionesFiltros(respuestaelem, respuestaelem.Nombre, false, true);
      }
    })
    return original;
  }

  deshabilitarHabilitarFiltros(e, tipo){
     //de las atenciones filtradas del modal, extraemos los filtros disponibles para comparar y luego deshabilitar los no disponibles
     var camparacionFiltroAmbito = this.filtros.entregaFiltroAmbito(this.filtradosModal);
     var camparacionFiltroEspecialidad = this.filtros.entregaFiltroEspecialidad(this.filtradosModal); 
     var comparacionFiltroProfesional = this.filtros.entregaFiltroTipoProfesional(this.filtradosModal);
     var comparacionFiltroEstablecimientos = this.filtros.entregaFiltroEstablecimiento(this.filtradosModal);

    if(tipo == 'ambito'){
      this.filtroAmbito.forEach(elem =>{
        if(elem.Nombre == "Sin Filtro"){
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, false, true);
        } else if (elem.Nombre == e.target.value){
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, true, true);
        } else {
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, false, false);
        }
      });
      this.filtroAmbito = this.filtroAmbito;
      // Deshabilitamos los demás filtros
      this.filtroEspecialidad = this.compararFiltros(this.filtroEspecialidad, camparacionFiltroEspecialidad);
      this.filtroTipoProfesional = this.compararFiltros(this.filtroTipoProfesional, comparacionFiltroProfesional);
      this.filtroEstablecimientos = this.compararFiltros(this.filtroEstablecimientos, comparacionFiltroEstablecimientos); 
    }
    if(tipo == 'especialidad'){
      this.filtroEspecialidad.forEach(elem =>{
        if(elem.Nombre == "Sin Filtro"){
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, false, true);
        } else if (elem.Nombre == e.target.value){
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, true, true);
        } else {
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, false, false);
        }
      });
      this.filtroEspecialidad = this.filtroEspecialidad;
      // Deshabilitamos los demás filtros
      this.filtroAmbito = this.compararFiltros(this.filtroAmbito, camparacionFiltroAmbito); 
      this.filtroTipoProfesional = this.compararFiltros(this.filtroTipoProfesional, comparacionFiltroProfesional);
      this.filtroEstablecimientos = this.compararFiltros(this.filtroEstablecimientos, comparacionFiltroEstablecimientos); 
    }
    if(tipo == 'profesional'){
      this.filtroTipoProfesional.forEach(elem =>{
        if(elem.Nombre == "Sin Filtro"){
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, false, true);
        } else if (elem.Nombre == e.target.value){
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, true, true);
        } else {
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, false, false);
        }
      });
      this.filtroTipoProfesional = this.filtroTipoProfesional;
      // Deshabilitamos los demás filtros
      this.filtroAmbito = this.compararFiltros(this.filtroAmbito, camparacionFiltroAmbito); 
      this.filtroEspecialidad = this.compararFiltros(this.filtroEspecialidad, camparacionFiltroEspecialidad);
      this.filtroEstablecimientos = this.compararFiltros(this.filtroEstablecimientos, comparacionFiltroEstablecimientos); 
    }
    if(tipo == 'establecimiento'){
      this.filtroEstablecimientos.forEach(elem =>{
        if(elem.Nombre == "Sin Filtro"){
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, false, true);
        } else if (elem.Nombre == e.target.value){
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, true, true);
        } else {
          this.filtros.editarOpcionesFiltros(elem, elem.Nombre, false, false);
        }
      });
      this.filtroEstablecimientos = this.filtroEstablecimientos;
      // Deshabilitamos los demás filtros
      this.filtroAmbito = this.compararFiltros(this.filtroAmbito, camparacionFiltroAmbito); 
      this.filtroEspecialidad = this.compararFiltros(this.filtroEspecialidad, camparacionFiltroEspecialidad);
      this.filtroTipoProfesional = this.compararFiltros(this.filtroTipoProfesional, comparacionFiltroProfesional);
    }

    //verificar todos los filtros disponibles segun los antecedentes filtrados
  }

  limpiarFiltros(){
    this.filtradosModal = [];
    this.modalAmbito = "Sin Filtro";
    this.modalEspecialidad = "Sin Filtro";
    this.modalTipoProfesional = "Sin Filtro";
    this.modalEstablecimiento = "Sin Filtro";

    if(this.filtrados){
      this.atencionesModal = this.filtrados;
    } else {
      this.atencionesModal = this.atenciones;
    }

    this.filtroAmbito =  this.filtros.entregaFiltroAmbito(this.atenciones);
    this.filtroEspecialidad =  this.filtros.entregaFiltroEspecialidad(this.atenciones);
    this.filtroTipoProfesional =  this.filtros.entregaFiltroTipoProfesional(this.atenciones);
    this.filtroEstablecimientos =  this.filtros.entregaFiltroEstablecimiento(this.atenciones);
  }

  limpiarTodosFiltros(){
    this.atenciones = this.atencionesInicial;
    this.cantidadAtenciones = this.atenciones.length;
  }

  mostrarAntecedentesFiltrados(){
    this.atenciones = this.filtradosModal;
    this.cantidadAtenciones = this.atenciones.length;

    $('#modalFiltro').modal('hide');
  }

  //se encarga de agregar clases para el arbol de atenciones
  evento(e, p) {
    /* Evita acciones al hacer click al utlimo elemento */
    p.Elemento.forEach((ele, i) => {
      
      ele.forEach((el, u) => {
        /* console.log(el); */
        if(el.Elemento == null){
          /* console.log(e.target.nextElementSibling.children[u].id); */
          document.getElementById(e.target.nextElementSibling.children[u].id).classList.add('avoid-clicks');
        } else{
          /* console.log("con elementos"); */
        }
      });
      
    });
    
    /* Cambia el icono MAS o MENOS al expandir elemento */
     if(p.Elemento.length > 0) {   
       if(document.getElementById(e.srcElement.firstElementChild.id).classList.contains('fa-plus-square')){
         document.getElementById(e.srcElement.firstElementChild.id).classList.remove('fa-plus-square'); 
         document.getElementById(e.srcElement.firstElementChild.id).classList.add('fa-minus-square'); 

       } else {
         document.getElementById(e.srcElement.firstElementChild.id).classList.add('fa-plus-square'); 
         document.getElementById(e.srcElement.firstElementChild.id).classList.remove('fa-minus-square');
       } 
     } 

     /* Agrega o elimina la linea en el ultimo elemento */
     if(e.srcElement.parentNode.id){
       /* console.log('conLinea:  '+document.getElementById(e.srcElement.parentNode.id).classList.contains('conLinea')); */
      if (document.getElementById(e.srcElement.parentNode.id).classList.contains('conLinea')){
        document.getElementById(e.srcElement.parentNode.id).classList.remove('conLinea');
        document.getElementById(e.srcElement.parentNode.id).classList.add('sinLinea'); 
      } else if (document.getElementById(e.srcElement.parentNode.id).classList.contains('sinLinea')) {
        document.getElementById(e.srcElement.parentNode.id).classList.remove('sinLinea');
        document.getElementById(e.srcElement.parentNode.id).classList.add('conLinea');    
      }
     }
  }

}
