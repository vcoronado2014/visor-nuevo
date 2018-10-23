import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
//servicios
import { ServicioVisorService } from '../../services/servicio-visor.service';
import { log } from 'util';

declare var JQuery :any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sistema;
  resumen = [
    {
      "nombre": "Influenza debida a virus no identificado",
      "descripcion": "",
      "estado": "",
      "tipo": "florence",
      "elemento": [
        {
          "nombre": "Clasificación Diagnóstica",
          "descripcion": "",
          "estado": "",
          "tipo": "",
          "elemento": [{
            "nombre": "Influenza debida a virus no identificado",
            "descripcion": "",
            "estado": "",
            "tipo": "",
            "elemento": []
          }]
        },
        {
          "nombre": "Actividades",
          "descripcion": "",
          "estado": "",
          "tipo": "",
          "elemento": [
            {
              "nombre": "Consulta otras morbilidades",
              "descripcion": "",
              "estado": "",
              "tipo": "",
              "elemento": []
            },
            {
              "nombre": "Holter de presión arterial",
              "descripcion": "",
              "estado": "",
              "tipo": "",
              "elemento": []
            },
            {
              "nombre": "Monitoreo continuo de presión arterial",
              "descripcion": "",
              "estado": "",
              "tipo": "",
              "elemento": []
            }
          ]
        },
        {
          "nombre": "Funcionario Prestador",
          "descripcion": "",
          "estado": "",
          "tipo": "",
          "elemento": [
            {
              "nombre": "Orellana Ibarra Elias, Médico",
              "descripcion": "",
              "estado": "",
              "tipo": "",
              "elemento": []
            }
          ]
        },
        {
          "nombre": "Establecimiento",
          "descripcion": "",
          "estado": "",
          "tipo": "",
          "elemento": [
            {
              "nombre": "RAYENSALUD [CESFAM]",
              "descripcion": "",
              "estado": "",
              "tipo": "",
              "elemento": []
            }
          ]
        }
      ]
    },
    {
      "nombre": "No informado (Confirmada)",
      "descripcion": "",
      "estado": "",
      "tipo": "rayen",
      "elemento": [
        {
          "nombre": "Clasificación Diagnóstica",
          "descripcion": "",
          "estado": "",
          "tipo": "",
          "elemento": [{
            "nombre": "No Informado (Confirmada)",
            "descripcion": "",
            "estado": "",
            "tipo": "",
            "elemento": []
          }]
        },
        {
          "nombre": "Prescripción",
          "descripcion": "",
          "estado": "",
          "tipo": "",
          "elemento": [ {
              "nombre": "Ibuprofeno Compimidos 400 Mg : 1 compimido cada 8 horas...",
              "descripcion": "",
              "estado": "",
              "tipo": "",
              "elemento": []
            },
            {
              "nombre": "Ibuprofeno Compimidos 400 Mg : 1 compimido cada 8 horas...",
              "descripcion": "",
              "estado": "",
              "tipo": "",
              "elemento": []
            }
          ]
        },
        {
          "nombre": "Receta",
          "descripcion": "",
          "estado": "",
          "tipo": "",
          "elemento": [ {
              "nombre": "Receta Nro. 204850565, generada 07-11-2017 ",
              "descripcion": "Tipo Morbilidad, Estado Caducada",
              "estado": "",
              "tipo": "",
              "elemento": [
                {
                  "nombre": "Prescripción",
                  "descripcion": "",
                  "estado": "",
                  "tipo": "",
                  "elemento": [
                    {
                      "nombre": "Ibuprofeno Compimidos 400 Mg : 1 compimido cada 8 horas...",
                      "descripcion": "",
                      "estado": "",
                      "tipo": "",
                      "elemento": []
                    }]
                },
                {
                  "nombre": "Prescripción",
                  "descripcion": "",
                  "estado": "",
                  "tipo": "",
                  "elemento": [
                    {
                      "nombre": "Ibuprofeno Compimidos 400 Mg : 1 compimido cada 8 horas...",
                      "descripcion": "",
                      "estado": "",
                      "tipo": "",
                      "elemento": []
                    }]
                }
              ]
            },
            {
              "nombre": "Receta Nro. 204850565, generada 07-11-2017 ",
              "descripcion": "Tipo Morbilidad, Estado Caducada",
              "estado": "",
              "tipo": "",
              "elemento": [
                {
                  "nombre": "Prescripción",
                  "descripcion": "",
                  "estado": "",
                  "tipo": "",
                  "elemento": [
                    {
                      "nombre": "Ibuprofeno Compimidos 400 Mg : 1 compimido cada 8 horas...",
                      "descripcion": "",
                      "estado": "",
                      "tipo": "",
                      "elemento": []
                    }]
                },
                {
                  "nombre": "Prescripción",
                  "descripcion": "",
                  "estado": "",
                  "tipo": "",
                  "elemento": [
                    {
                      "nombre": "Ibuprofeno Compimidos 400 Mg : 1 compimido cada 8 horas...",
                      "descripcion": "",
                      "estado": "",
                      "tipo": "",
                      "elemento": []
                    }]
                }
              ]
            }
          ]
        },
        {
          "nombre": "Actividad",
          "descripcion": "",
          "estado": "",
          "tipo": "",
          "elemento": [
             {
              "nombre": "Consulta de morbilidad odontológica",
              "descripción": "",
              "estado": "",
              "tipo": "",
              "elemento": []
            }
          ]
        },
        {
          "nombre": "Funcionario Prestador",
          "descripcion": "",
          "estado": "",
          "tipo": "",
          "elemento": [
            {
              "nombre": "RAYEN RAYEN administrador, odontólogo",
              "descripcion": "",
              "estado": "",
              "tipo": "",
              "elemento": []
            }
          ]
        },
        {
          "nombre": "Establecimiento",
          "descripcion": "",
          "estado": "",
          "tipo": "",
          "elemento": [
            {
              "nombre": "RAYENSALUD [CESFAM]",
              "descripcion": "",
              "estado": "",
              "tipo": "",
              "elemento": []
            }
          ]
        }
      ]
    }
  ];
  identificacion;
  tipoIdentificacion;
  idRyf;
  tokenAcceso;
  tokenSession;
  //historial
  cantidadHistorial;
  tieneHistorial;
  listaSummary;

  constructor(
    private router: ActivatedRoute,
    public visor: ServicioVisorService
  ) { 

  }

  ngOnInit() {
    //hay que ver como capturar el query string
    //la url ahora deberia ser la siguiente
    //esta la original al obtener url de mirth
    //http://172.16.0.158:8060/#/NzE5ODAwODE=/MQ==/NzM2MTE5OA==/6C6AB484C66E92F11CFDFDF2FEE6184F
    //ahora debería ser
    //http://localhost:4200/home?Identification=NzE5ODAwODE=&IdentificationType=MQ==&IdRyf=NzM2MTE5OA==&TokenAcceso=6C6AB484C66E92F11CFDFDF2FEE6184F&sistema=2
    
    //lo comentamos por mientras
    /*
    this.router.queryParams
      .filter(params => params.sistema)
      .subscribe(params => {
        console.log(params); // {sistema: "1"}

        this.sistema = params.sistema;
        console.log(this.sistema); // 1
      });
      */
      sessionStorage.clear();
      this.router.queryParams
      .subscribe(params => {
        console.log(params); // {sistema: "1"}
       
        this.sistema = params.sistema;
        this.identificacion =atob(params.Identification);
        this.tipoIdentificacion = atob(params.IdentificationType);
        this.idRyf = atob(params.IdRyf);
        this.tokenAcceso = params.TokenAcceso;
        this.obtenerTokenSesion(this.tokenAcceso);
        //sessionStorage.setItem("IDENTIFICACION", this.identificacion);
        //sessionStorage.setItem("TIPO_IDENTIFICACION", this.tipoIdentificacion);
        //sessionStorage.setItem("ID_RYF", this.idRyf);
        
        console.log(this.sistema); // 1
      });
 
       this.selectorSistema(this.sistema);
       //console.log(this.resumen);
 
  }

  obtenerTokenSesion(tokenAcceso){
    this.visor.getTokenSession(tokenAcceso).subscribe(
      //contenido de la nueva llamada
      dataToken => {
        var listToken = dataToken.json();
        if (listToken) {
          if (listToken.ObtenerTokenSesionResult) {
            if (listToken.ObtenerTokenSesionResult.TokenSesion) {
              this.tokenSession = listToken.ObtenerTokenSesionResult.TokenSesion;
              
              if (this.tokenSession != undefined){
                sessionStorage.setItem("PARAMETRO_FUC", this.tokenSession);
                sessionStorage.setItem("IDENTIFICACION", this.identificacion);
                sessionStorage.setItem("TIPO_IDENTIFICACION", this.tipoIdentificacion);
                sessionStorage.setItem("ID_RYF", this.idRyf);
                this.obtenerResumenPaciente(this.tokenSession, this.idRyf, this.identificacion);
              }
              
            }
          }
        }
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('get info token');
      }

    );
  }


  //obtener resumen del paciente
  obtenerResumenPaciente(tokenSession, idRyf, run){
    this.visor.getSummary(tokenSession, idRyf, run).subscribe(
      dataSummary => {
        //aca estoy trabajando con los datos VC
        this.listaSummary = dataSummary.json();
        console.log(this.listaSummary);
        console.log(dataSummary.json());

      },
      err => {
        console.error(err);

      },
      () => {
        console.log('get info summary');
      }
    );
  }

  selectorSistema(sistema) {
    if(sistema == '1') {  	  
      this.sistema = 'rayen'

    } else if(sistema == '2') {
      this.sistema = 'urgencia'
    }
    return this.sistema;
  }	
 
  evento(e, p) {
    /*  console.log(e.srcElement.firstElementChild.id); */
     /* console.log(p); 
     console.log(e); 
     console.log('padre:  '+e.srcElement.parentNode.id);  */

    /* Evita acciones al hacer click al utlimo elemento */
     p.elemento.forEach((ele, i) => {
      /* console.log(ele.elemento.length + 'index: '+ i); */
      
      if(ele.elemento.length == 0){
        /* console.log( document.getElementById(e.srcElement.firstElementChild.id)); */
          document.getElementById(e.target.nextElementSibling.children[i].id).classList.add('avoid-clicks');
        }
    });
    
    /* Cambia el icono MAS o MENOS al expandir elemento */
     if(p.elemento.length > 0) {   
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
