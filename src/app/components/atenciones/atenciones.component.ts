import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
//servicios
import { ServicioVisorService } from '../../services/servicio-visor.service';

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
  
  constructor(
              private router: ActivatedRoute,
              public visor: ServicioVisorService
  ) { 

  }

  ngOnInit() {
    this.obtenerResumenPaciente(this.token,this.idRyF,this.run);
  }
  
  //obtener resumen del paciente
  obtenerResumenPaciente(tokenSession, idRyf, run){
    this.loading = true;
    this.visor.getSummary(tokenSession, idRyf, run).subscribe(
      dataSummary => {
        this.loading = false;
        //aca estoy trabajando con los datos VC
        var listaSummary = dataSummary.json();
        this.atenciones = listaSummary.Elementos;
        this.examenes = listaSummary.OrdenesExamenes;
        console.log(this.examenes);
        
        console.log(this.atenciones);
      },
      err => {
        this.loading = false;
        console.error(err);
      },
      () => {
        console.log('get info summary');
      }
    );
  }
  evento(e, p) {
    /* Evita acciones al hacer click al utlimo elemento */
    p.Elemento.forEach((ele, i) => {
      
      ele.forEach((el, u) => {
        console.log(el);
        if(el.Elemento == null){
          console.log(e.target.nextElementSibling.children[u].id);
          document.getElementById(e.target.nextElementSibling.children[u].id).classList.add('avoid-clicks');
        } else{
          console.log("sin elementos");
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