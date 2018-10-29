import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
//servicios
import { ServicioVisorService } from '../../services/servicio-visor.service';
//Componentes 
import { AtencionesComponent } from '../atenciones/atenciones.component';

declare var JQuery :any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 

  @ViewChild(AtencionesComponent) atencion: AtencionesComponent;
  
  public loading = false;
  sistema;
  public identificacion;
  public tipoIdentificacion;
  public idRyf;
  public tokenAcceso;
  public tokenSession;
  //historial
  public cantidadHistorial;
  public tieneHistorial;
  

  constructor(
    private router: ActivatedRoute,
    public visor: ServicioVisorService
  ) { 

  }

  ngOnInit() {
    $('#atencion-tab').tab('show');
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
     this.parametrosQuery();
     this.selectorSistema(this.sistema);

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
                this.atencion.obtenerResumenPaciente(this.tokenSession, this.idRyf, this.identificacion);
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
  parametrosQuery(){
    this.loading = true;
    this.router.queryParams.subscribe(params => {
      this.loading = false;
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
  }


  selectorSistema(sistema) {
    if(sistema == '1') {  	  
      this.sistema = 'rayen'

    } else if(sistema == '2') {
      this.sistema = 'urgencia'
    }
    return this.sistema;
  }	
 


}
