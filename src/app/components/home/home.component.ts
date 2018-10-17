import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
declare var JQuery :any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sistema;
  b;
  resumen = [
    {
      "id":  1,
      "nombre": "Influenza debida a virus no identificado",
      "descripcion": "",
      "estado": "",
      "tipo": "",
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
      "id":  2,
      "nombre": "No informado (Confirmada)",
      "descripcion": "",
      "estado": "",
      "tipo": "",
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
    },
    {
      "id":  3,
      "nombre": "Gripe porcina",
      "descripcion": "",
      "estado": "",
      "tipo": "",
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

  constructor(
    private router: ActivatedRoute
  ) {

  }

  ngOnInit() {
    //hay que ver como capturar el query string
    this.router.queryParams
      .filter(params => params.sistema)
      .subscribe(params => {
        console.log(params); // {sistema: "1"}

        this.sistema = params.sistema;
        console.log(this.sistema); // 1
      });
      this.selectorSistema(this.sistema);
      console.log(this.resumen);

  }
  ngAfterViewInit() {
    var li = document.getElementsByTagName('li');
    this.b = true;
    for (let x = 0; x < li.length; x++) {
      const element = li[x];

      this.b = !this.b;
      if (this.b) {
          $(element).css("background-color", "rgb(240, 236, 236)");
      } else {
          $(element).css("background-color", "rgb(241, 213, 213)");
      }
    }
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
    if(p.elemento.length > 0) {
      if(document.getElementById(e.srcElement.firstElementChild.id).classList.contains('fa-plus-square')){
        document.getElementById(e.srcElement.firstElementChild.id).classList.remove('fa-plus-square');
        document.getElementById(e.srcElement.firstElementChild.id).classList.add('fa-minus-square');
      } else {
        document.getElementById(e.srcElement.firstElementChild.id).classList.add('fa-plus-square');
        document.getElementById(e.srcElement.firstElementChild.id).classList.remove('fa-minus-square');
      }
    }
  }

}
