import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule }    from '@angular/forms';
import 'rxjs/add/operator/filter';
//servicios
import { ServicioVisorService } from '../../services/servicio-visor.service';
import { ServicioFiltros } from '../../services/servicio-filtros';

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

  // variables del front de los filtros
  public userGlobales;
  public userBuscar;
  
  constructor(
              private router: ActivatedRoute,
              public visor: ServicioVisorService,
              public filtros: ServicioFiltros
  ) { 

  }

  ngOnInit() {
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
        this.atenciones = listaSummary.Elementos;
        //guardamos esta variable para poder dejar una copia de todas las atenciones
        this.atencionesInicial = this.atenciones;
        //********************************************** */
        var globalsFilter = listaSummary.FiltrosGlobales;
        //procesamos los filtros
        this.filtrosGlobales = this.filtros.entregaFiltrosSeccion(globalsFilter);
        this.filtroAmbito =  this.filtros.entregaFiltroAmbito(this.atenciones);
        this.filtroEspecialidad =  this.filtros.entregaFiltroEspecialidad(this.atenciones);
        this.filtroTipoProfesional =  this.filtros.entregaFiltroTipoProfesional(this.atenciones);
        this.filtroEstablecimientos =  this.filtros.entregaFiltroEstablecimiento(this.atenciones);
        this.filtroPeriodo =  this.filtros.entregaFiltroFechas(this.atenciones);
        this.userGlobales = "-- seleccione --";
        console.log(this.filtrosGlobales);
        console.log(this.filtroAmbito);
        console.log(this.filtroEspecialidad);
        console.log(this.filtroTipoProfesional);
        console.log(this.filtroEstablecimientos);
        console.log(this.filtroPeriodo);
       
        this.paciente = listaSummary.PacienteFlorence;
        console.log(listaSummary); 
        if (listaSummary.PacienteRayen){
          this.antecedentesMorbidos = listaSummary.PacienteRayen.AntecedentesMorbidos;
          this.filtrarAntecedentes(this.antecedentesMorbidos);
        }
        this.cantidadAtenciones = this.atenciones.length;
        //this.loading = false;
        
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
      if (this.userGlobales != '-- seleccione --'){
        //ahora si que existe el filtro, hay que filtrarlo y buscar en dichos resultados.
        this.filtrados = [];
        //debemos filtrar por el grupo Principal
        this.filtrados = this.filtros.filtrarGlobal(this.atenciones, this.userGlobales);
        this.filtrados = this.filtros.filtrarPorContenido(this.filtrados,contenido);
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
      if (this.filtrados && this.filtrados.length > 0 && this.userGlobales != '-- seleccione --'){
        this.filtrados = [];
        //debemos filtrar por el grupo Principal
        this.filtrados = this.filtros.filtrarGlobal(this.atencionesInicial, this.userGlobales);
        this.atenciones = this.filtrados;
        this.cantidadAtenciones = this.atenciones.length;
        /*
        this.atenciones = this.filtrados;
        this.cantidadAtenciones = this.atenciones.length;
        */
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
    if (e.target.value == '-- seleccione --'){
      this.atenciones = this.atencionesInicial;
      this.cantidadAtenciones = this.atenciones.length;
      this.filtrados = [];
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

  evento(e, p) {
    /* Evita acciones al hacer click al utlimo elemento */
    p.Elemento.forEach((ele, i) => {
      
      ele.forEach((el, u) => {
        /* console.log(el); */
        if(el.Elemento == null){
          /* console.log(e.target.nextElementSibling.children[u].id); */
          document.getElementById(e.target.nextElementSibling.children[u].id).classList.add('avoid-clicks');
        } else{
          console.log("con elementos");
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
